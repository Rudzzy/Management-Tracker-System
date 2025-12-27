from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from app.extensions.mongo import mongo

def login_user(email, password):
    user = mongo.db.users.find_one({"email": email})

    if not user:
        raise ValueError("Invalid credentials")

    if not check_password_hash(user["password_hash"], password):
        raise ValueError("Invalid credentials")

    additional_claims = {
        "role": user["role"],
        "team_id": str(user.get("team_id")) if user.get("team_id") else None
    }

    access_token = create_access_token(
        identity=str(user["_id"]),
        additional_claims=additional_claims
    )
    print(access_token)
    return {
        "access_token": access_token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "role": user["role"],
            "team_id": additional_claims["team_id"]
        }
    }
