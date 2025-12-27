def validate_log(data):
    required_fields = ["request_id", "action", "performed_by"]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing field: {field}")
