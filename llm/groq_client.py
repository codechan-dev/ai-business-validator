import os
from typing import List, Optional

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


DEFAULT_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")


class GroqLLMClient:
    """Thin wrapper around the Groq client for chat completions."""

    def __init__(self, model: str = DEFAULT_MODEL, temperature: float = 0.2):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GROQ_API_KEY is not set. Please configure it in your environment or .env file."
            )
        self.client = Groq(api_key=api_key)
        self.model = model
        self.temperature = temperature

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        *,
        temperature: Optional[float] = None,
    ) -> str:
        """Execute a chat completion and return the assistant content as plain text."""
        messages: List[dict] = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]

        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=temperature if temperature is not None else self.temperature,
        )

        content = response.choices[0].message.content
        return content or ""


def get_default_groq_client() -> GroqLLMClient:
    """Factory used across the project for a reusable client."""
    return GroqLLMClient()


__all__ = ["GroqLLMClient", "get_default_groq_client"]

