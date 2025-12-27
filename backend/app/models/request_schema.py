from app.constants.request_status import ALL_STATUSES
from app.constants.request_types import ALL_TYPES

def validate_request(data):
    required_fields = ["subject", "equipment_id", "request_type"]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing field: {field}")

    if data["request_type"] not in ALL_TYPES:
        raise ValueError("Invalid request type")

    if "status" in data and data["status"] not in ALL_STATUSES:
        raise ValueError("Invalid request status")
