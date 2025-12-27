from app.constants.roles import ALL_ROLES

def validate_user(data):
    required_fields = ["name", "email", "password_hash", "role"]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing field: {field}")

    if data["role"] not in ALL_ROLES:
        raise ValueError("Invalid role")
