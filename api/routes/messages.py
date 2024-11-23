from flask import Blueprint, request, Response, jsonify
from constants.models import AVAILABLE_MODELS
from utils.stream_handlers import stream_openai_response, stream_anthropic_response

messages_bp = Blueprint("messages", __name__)

@messages_bp.route("/messages", methods=["POST"])
def messages():
    try:
        data = request.json
        model = data.get("model")
        system_prompt = data.get("system_prompt", "You are a helpful assistant.")
        user_message = data.get("question")

        if not model or not user_message:
            return jsonify({"error": "Missing required parameters"}), 400

        if model in AVAILABLE_MODELS["openai"]:
            return Response(
                stream_openai_response(model, system_prompt, user_message),
                mimetype="text/event-stream"
            )
        elif model in AVAILABLE_MODELS["anthropic"]:
            return Response(
                stream_anthropic_response(model, system_prompt, user_message),
                mimetype="text/event-stream"
            )
        else:
            return jsonify({"error": "Invalid model specified"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
