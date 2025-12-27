from flask import Blueprint, request, jsonify
from app.services.equipment_service import (
    create_equipment,
    get_all_equipment,
    get_equipment_by_id,
    get_open_request_count,
    mark_equipment_scrapped
)
from app.utils.decorators import jwt_required_with_role

equipment_bp = Blueprint("equipment", __name__)

@equipment_bp.route("", methods=["GET"])
@jwt_required_with_role("view")
def list_equipment():
    return jsonify(get_all_equipment()), 200

@equipment_bp.route("", methods=["POST"])
@jwt_required_with_role("create")
def add_equipment():
    data = request.get_json()
    try:
        equipment_id = create_equipment(data)
        return jsonify({"equipment_id": equipment_id}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@equipment_bp.route("/<equipment_id>", methods=["GET"])
@jwt_required_with_role("view")
def get_equipment(equipment_id):
    try:
        return jsonify(get_equipment_by_id(equipment_id)), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@equipment_bp.route("/<equipment_id>/maintenance-count", methods=["GET"])
@jwt_required_with_role("view")
def maintenance_count(equipment_id):
    count = get_open_request_count(equipment_id)
    return jsonify({"open_requests": count}), 200

@equipment_bp.route("/<equipment_id>/scrap", methods=["PATCH"])
@jwt_required_with_role("update")
def scrap_equipment(equipment_id):
    try:
        mark_equipment_scrapped(equipment_id)
        return jsonify({"message": "Equipment scrapped"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
