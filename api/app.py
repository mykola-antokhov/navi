from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.messages import messages_bp
from routes.models import models_bp
from utils.api_keys_validation import anthropic_key_validation, openai_key_validation
from llm_providers import AnthropicProvider, OpenAIProvider

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "expose_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

app.register_blueprint(messages_bp, url_prefix="/")
app.register_blueprint(models_bp, url_prefix="/")

try:
    AnthropicProvider.key_validation()
    OpenAIProvider.key_validation()
except Exception as e:
    print(f"AI client key validation error: {e}")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
