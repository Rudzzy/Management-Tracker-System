from bson import ObjectId
from datetime import datetime
from app.extensions.mongo import mongo
from app.utils.validators import run_validation
from app.constants.request_status import NEW
from app.constants.request_types import PREVENTIVE

def create_request(data, created_by):
    run_validation("request", data)

    equipment = mongo.db.equipment.find_one(
        {"_id": ObjectId(data["equipment_id"])}
    )
    if not equipment:
        raise ValueError("Equipment not found")

    request_doc = {
        "subject": data["subject"],
        "description": data.get("description", ""),
        "equipment_id": data["equipment_id"],
        "team_id": str(equipment["maintenance_team_id"]),
        "request_type": data["request_type"],
        "status": NEW,
        "assigned_to": None,
        "scheduled_date": data.get("scheduled_date"),
        "created_by": created_by,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    result = mongo.db.maintenance_requests.insert_one(request_doc)
    return str(result.inserted_id)

def get_calendar_requests(db):
    """
    Fetch all maintenance requests that have a scheduled date.
    Used for calendar view.
    """
    requests = list(
        db.maintenance_requests.find(
            {"scheduled_date": {"$ne": None}},
            {
                "subject": 1,
                "equipment_id": 1,
                "scheduled_date": 1
            }
        )
    )

    # Resolve equipment name (simple join)
    for req in requests:
        equipment = db.equipment.find_one(
            {"_id": ObjectId(req["equipment_id"])}
        )
        req["equipment_name"] = (
            equipment["equipment_name"] if equipment else None
        )
        req["_id"] = str(req["_id"])

    return requests

def get_requests_for_user(role, team_id=None):
    query = {}

    if role == "Technician" and team_id:
        query["team_id"] = team_id

    requests = list(mongo.db.maintenance_requests.find(query))
    for r in requests:
        r["_id"] = str(r["_id"])
    return requests

def assign_request(request_id, user_id):
    result = mongo.db.maintenance_requests.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {
            "assigned_to": user_id,
            "updated_at": datetime.utcnow()
        }}
    )
    if result.matched_count == 0:
        raise ValueError("Request not found")
