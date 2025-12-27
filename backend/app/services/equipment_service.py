from bson import ObjectId
from app.extensions.mongo import mongo
from app.utils.validators import run_validation
from app.constants.request_status import NEW, IN_PROGRESS
from flask import Blueprint
equipment_bp = Blueprint("equipment", __name__)

def create_equipment(data):
    run_validation("equipment", data)
    data["is_scrapped"] = False
    result = mongo.db.equipment.insert_one(data)
    return str(result.inserted_id)

def get_all_equipment():
    equipment_list = list(mongo.db.equipment.find())
    for eq in equipment_list:
        eq["_id"] = str(eq["_id"])
    return equipment_list

def get_equipment_by_id(equipment_id):
    equipment = mongo.db.equipment.find_one({"_id": ObjectId(equipment_id)})
    if not equipment:
        raise ValueError("Equipment not found")
    equipment["_id"] = str(equipment["_id"])
    return equipment

def get_open_request_count(equipment_id):
    count = mongo.db.maintenance_requests.count_documents({
        "equipment_id": equipment_id,
        "status": {"$in": [NEW, IN_PROGRESS]}
    })
    return count

def mark_equipment_scrapped(equipment_id):
    result = mongo.db.equipment.update_one(
        {"_id": ObjectId(equipment_id)},
        {"$set": {"is_scrapped": True}}
    )
    if result.matched_count == 0:
        raise ValueError("Equipment not found")
