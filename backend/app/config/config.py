import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")

    # MongoDB
    MONGO_URI = os.getenv(
        "MONGO_URI",
        "mongodb://localhost:27017/gearguard"
    )

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24  # 1 day

    # General
    DEBUG = True