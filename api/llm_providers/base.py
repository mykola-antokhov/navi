import json


class LLMProvideBase:
    _provider = None

    def key_validation():
        pass

    def stream_response():
        pass

    def format_sse_message(data: dict) -> str:
        return f"data: {json.dumps(data)}\n\n"
