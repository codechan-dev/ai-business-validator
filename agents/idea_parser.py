import json
from typing import Dict, Any

from llm.groq_client import get_default_groq_client
from schemas.state import BusinessIdeaState


SYSTEM_PROMPT = (
    "You are a senior startup analyst. "
    "Extract structured information from business ideas and respond ONLY with valid JSON."
)


def idea_parser_node(state: BusinessIdeaState) -> Dict[str, Any]:
    """Parse the raw idea into a structured representation."""
    client = get_default_groq_client()

    user_prompt = f"""
Business idea:

{state.idea}

Return a JSON object with the following keys:
  "product": short product description,
  "target_users": primary user segment,
  "industry": high-level industry category,
  "business_model": brief monetization model.

Example:
{{
  "product": "AI job application automation",
  "target_users": "job seekers",
  "industry": "recruitment technology",
  "business_model": "SaaS"
}}

Now respond for the given idea.
"""

    raw = client.chat(system_prompt=SYSTEM_PROMPT, user_prompt=user_prompt)

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        # Best-effort fallback to keep the graph running.
        parsed = {
            "product": state.idea[:120],
            "target_users": "unknown",
            "industry": "unknown",
            "business_model": "unknown",
            "raw_response": raw,
        }

    return {"parsed_idea": parsed}


__all__ = ["idea_parser_node"]


