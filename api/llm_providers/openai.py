from .base import LLMProvideBase
import openai
import os


class OpenAIProvider(LLMProvideBase):
    _provider = openai.api_key = os.getenv("OPENAI_API_KEY")

    @staticmethod
    def key_validation():
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "system", "content": "API key validation"}],
                max_tokens=1
            )
            print("OpenAI key validation success")
        except Exception as e:
            raise Exception(f"OpenAI key validation error: {e}")

    @staticmethod
    def stream_response(model, system_prompt, user_message):
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
                    yield OpenAIProvider.format_sse_message({'content': chunk.choices[0].delta.content})
        except Exception as e:
            yield OpenAIProvider.format_sse_message({'error': str(e)})
