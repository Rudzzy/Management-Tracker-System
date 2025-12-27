from bson import ObjectId
from datetime import datetime
from app.extensions.mongo import mongo
from app.constants.request_status import NEW, IN_PROGRESS, REPAIRED, SCRAP

ALLOWED_TRANSITIONS = {
    NEW: [IN_PROGRESS, SCRAP],
    IN_PROGRESS: [REPAIRED, SCRAP]
}

def update_request_status(request_id, new_status, duration_hours=None):
    request = mongo.db.maintenance_requests.find_one(
        {"_id": ObjectId(request_id)}
    )

    if not request:
        raise ValueError("Request not found")

    current_status = request["status"]

    if current_status not in ALLOWED_TRANSITIONS or \
       new_status not in ALLOWED_TRANSITIONS[current_status]:
        raise ValueError("Invalid status transition")

    update_data = {
        "status": new_status,
        "updated_at": datetime.utcnow()
    }

    if new_status == REPAIRED:
        if duration_hours is None:
            raise ValueError("Duration required to complete request")
        update_data["duration_hours"] = duration_hours

    mongo.db.maintenance_requests.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": update_data}
    )

    # Scrap logic: mark equipment unusable
    if new_status == SCRAP:
        mongo.db.equipment.update_one(
            {"_id": ObjectId(request["equipment_id"])},
            {"$set": {"is_scrapped": True}}
        )
