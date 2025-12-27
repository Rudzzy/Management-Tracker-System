from flask import Blueprint, request, jsonify
from app.extensions.mongo import mongo
from app.utils.decorators import jwt_required_with_role
from app.utils.validators import run_validation

team_bp = Blueprint("teams", __name__)

@team_bp.route("/", methods=["POST"])
@jwt_required_with_role("create")
def create_team():
    data = request.get_json()
    try:
        run_validation("team", data)
        mongo.db.maintenance_teams.insert_one(data)
        return jsonify({"message": "Team created"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@team_bp.route("/", methods=["GET"])
@jwt_required_with_role("view")
def list_teams():
    teams = list(mongo.db.maintenance_teams.find())
    for team in teams:
        team["_id"] = str(team["_id"])
    return jsonify(teams), 200
