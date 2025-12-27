from datetime import timedelta

JWT_SETTINGS = {
    "JWT_ACCESS_TOKEN_EXPIRES": timedelta(days=1),
    "JWT_TOKEN_LOCATION": ["headers"],
    "JWT_HEADER_NAME": "Authorization",
    "JWT_HEADER_TYPE": "Bearer"
}
