from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from app.services.request_service import (
    create_request,
    get_requests_for_user,
    assign_request,
    get_calendar_requests
)
from app.services.workflow_service import update_request_status
from app.utils.decorators import jwt_required_with_role
from app.extensions import mongo

request_bp = Blueprint("requests", __name__)

@request_bp.route("/calendar", methods=["GET"])
@jwt_required()
def calendar_requests():
    data = get_calendar_requests(mongo.db)
    return jsonify(data), 200

@request_bp.route("/", methods=["POST"])
@jwt_required_with_role("create")
def create_maintenance_request():
    data = request.get_json()
    user_id = get_jwt_identity()
    try:
        request_id = create_request(data, user_id)
        return jsonify({"request_id": request_id}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@request_bp.route("/", methods=["GET"])
@jwt_required_with_role("view")
def list_requests():
    claims = get_jwt()
    role = claims.get("role")
    team_id = claims.get("team_id")
    requests = get_requests_for_user(role, team_id)
    return jsonify(requests), 200

@request_bp.route("/<request_id>/assign", methods=["PATCH"])
@jwt_required_with_role("assign")
def assign_maintenance_request(request_id):
    user_id = get_jwt_identity()
    try:
        assign_request(request_id, user_id)
        return jsonify({"message": "Request assigned"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@request_bp.route("/<request_id>/status", methods=["PATCH"])
@jwt_required_with_role("update")
def update_status(request_id):
    data = request.get_json()
    try:
        update_request_status(
            request_id=request_id,
            new_status=data["status"],
            duration_hours=data.get("duration_hours")
        )
        return jsonify({"message": "Status updated"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
