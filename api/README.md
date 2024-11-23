# API

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

### GET /models
Returns a list of all available AI models.

### POST /messages
Streams a chat response from the selected AI model.

Request body:
```json
{
    "model": "gpt-4",
    "system_prompt": "You are a helpful assistant.",
    "question": "Hello, how are you?"
}
```

Response: Server-Sent Events (SSE) stream with the AI model's response.
