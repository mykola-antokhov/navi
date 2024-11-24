from .base import LLMProvideBase
from anthropic import HUMAN_PROMPT, AI_PROMPT
from utils.ai_clients import anthropic_client
import anthropic
import os


class AnthropicProvider(LLMProvideBase):
    _provider = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    @staticmethod
    def key_validation():
        try:
            response = anthropic_client.completions.create(
                model="claude-2.1",
                prompt=f"{HUMAN_PROMPT} API key validation \n is valid{AI_PROMPT}",
                max_tokens_to_sample=1
            )
            print("Anthropic key validation success")
        except Exception as e:
            raise Exception(f"Anthropic key validation error: {e}")

    @staticmethod
    def stream_response(model, system_prompt, user_message):
        try:
            response = anthropic_client.completions.create(
                model=model,
                prompt=f"{HUMAN_PROMPT} {system_prompt}\n{user_message}{AI_PROMPT}",
                max_tokens_to_sample=1024,
                stream=True
            )

            for chunk in response:
                if hasattr(chunk, "completion") and chunk.completion:
                    yield AnthropicProvider.format_sse_message({"content": chunk.completion})
        except Exception as e:
            yield AnthropicProvider.format_sse_message({'error': str(e)})
