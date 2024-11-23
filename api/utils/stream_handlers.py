import json
from typing import Generator
import openai
from utils.ai_clients import openai, anthropic_client
from anthropic import HUMAN_PROMPT, AI_PROMPT

def format_sse_message(data: dict) -> str:
    return f"data: {json.dumps(data)}\n\n"

def stream_openai_response(model: str, system_prompt: str, user_message: str) -> Generator:
    try:
        response = openai.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            stream=True
        )

        for chunk in response:
            if chunk.choices[0].delta.content:
                yield format_sse_message({'content': chunk.choices[0].delta.content})
    except Exception as e:
        yield format_sse_message({'error': str(e)})

def stream_anthropic_response(model: str, system_prompt: str, user_message: str) -> Generator:
    try:
        response = anthropic_client.completions.create(
            model=model,
            prompt=f"{HUMAN_PROMPT} {system_prompt}\n{user_message}{AI_PROMPT}",
            max_tokens_to_sample=1024,
            stream=True
        )

        for chunk in response:
            if hasattr(chunk, "completion") and chunk.completion:
                yield format_sse_message({"content": chunk.completion})
    except Exception as e:
        yield format_sse_message({'error': str(e)})
