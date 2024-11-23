from flask import Blueprint, jsonify
from constants.models import AVAILABLE_MODELS

models_bp = Blueprint("models", __name__)

@models_bp.route("/models", methods=["GET"])
def models():
    return jsonify(AVAILABLE_MODELS)
