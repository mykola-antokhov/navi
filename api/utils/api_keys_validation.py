from utils.ai_clients import openai, anthropic_client
from anthropic import HUMAN_PROMPT, AI_PROMPT

def anthropic_key_validation():
    try:
        response = anthropic_client.completions.create(
            model="claude-2.1",
            prompt=f"{HUMAN_PROMPT} API key validation \n is valid{AI_PROMPT}",
            max_tokens_to_sample=1
        )
        print("Anthropic key validation success")
    except Exception as e:
        raise Exception(f"Anthropic key validation error: {e}")

def openai_key_validation():
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "API key validation"}],
            max_tokens=1
        )
        print("OpenAI key validation success")
    except Exception as e:
        raise Exception(f"OpenAI key validation error: {e}")
