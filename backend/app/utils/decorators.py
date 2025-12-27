from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask import jsonify
from app.utils.permissions import has_permission

def jwt_required_with_role(action):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                claims = get_jwt()
                role = claims.get("role")

                if not has_permission(role, action):
                    return jsonify({"error": "Forbidden"}), 403

            except Exception:
                return jsonify({"error": "Unauthorized"}), 401

            return fn(*args, **kwargs)
        return wrapper
    return decorator
