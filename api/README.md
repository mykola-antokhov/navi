# AI Chat Backend

This is a Flask-based backend service that provides an API for interacting with various AI models from OpenAI and Anthropic.

## Project Structure
```
.
├── app.py              # Main application entry point
├── constants/          # Constants and configurations
│   └── models.py       # Available AI models configuration
├── routes/             # API route handlers
│   ├── chat_routes.py  # Chat endpoint routes
│   └── model_routes.py # Model endpoint routes
├── utils/             # Utility functions and helpers
│   ├── ai_clients.py   # AI client initializations
│   └── stream_handlers.py # Streaming response handlers
├── requirements.txt    # Project dependencies
└── .env               # Environment variables (create from .env.example)
```

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create a `.env` file:
   - Copy `.env.example` to `.env`
   - Add your API keys for OpenAI and Anthropic

3. Run the server:
   ```bash
   python app.py
   ```

## API Endpoints

### GET /api/models
Returns a list of all available AI models.

### POST /api/chat
Streams a chat response from the selected AI model.

Request body:
```json
{
    "model": "gpt-4",
    "system_prompt": "You are a helpful assistant.",
    "user_message": "Hello, how are you?"
}
```

Response: Server-Sent Events (SSE) stream with the AI model's response.