from flask_jwt_extended import JWTManager
from app.config.jwt_config import JWT_SETTINGS

jwt = JWTManager()

def init_jwt(app):
    for key, value in JWT_SETTINGS.items():
        app.config[key] = value
