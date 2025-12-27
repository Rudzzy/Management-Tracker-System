from flask import Flask
from flask_cors import CORS
from app.config.config import Config
from app.extensions.mongo import mongo
from app.extensions.jwt import jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)
    app.url_map.strict_slashes = False 
    # Initialize extensions
    mongo.init_app(app)
    from app.extensions.jwt import init_jwt
    jwt.init_app(app)
    init_jwt(app)

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.equipment_routes import equipment_bp
    from app.routes.request_routes import request_bp
    from app.routes.team_routes import team_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(equipment_bp, url_prefix="/api/equipment")
    app.register_blueprint(request_bp, url_prefix="/api/requests")
    app.register_blueprint(team_bp, url_prefix="/api/teams")
   
    return app