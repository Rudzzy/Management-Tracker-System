from app.models.user_schema import validate_user
from app.models.team_schema import validate_team
from app.models.equipment_schema import validate_equipment
from app.models.request_schema import validate_request
from app.models.log_schema import validate_log

def run_validation(schema_type, data):
    validators = {
        "user": validate_user,
        "team": validate_team,
        "equipment": validate_equipment,
        "request": validate_request,
        "log": validate_log
    }

    if schema_type not in validators:
        raise ValueError("Invalid schema type")

    validators[schema_type](data)
