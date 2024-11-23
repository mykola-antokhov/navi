from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.messages import messages_bp
from routes.models import models_bp

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
