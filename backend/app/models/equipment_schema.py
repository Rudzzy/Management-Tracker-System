def validate_equipment(data):
    required_fields = [
        "equipment_name",
        "serial_number",
        "maintenance_team_id",
        "department"
    ]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing field: {field}")
