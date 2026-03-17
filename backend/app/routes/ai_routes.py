# app/routes/ai_routes.py

import os
import json
from fastapi import APIRouter, Depends
from collections import defaultdict
from app.database.mongodb import users_collection, expenses_collection
from app.utils.helpers import get_current_user, require_admin
from groq import Groq

router = APIRouter(tags=["AI Insights"])

# -----------------------------
# Groq Client Setup
# -----------------------------
groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# -----------------------------
# AI Suggestion Generator
# -----------------------------
def generate_ai_suggestions(category_spent: dict) -> list:
    if not category_spent:
        return []

    prompt = f"""
A company has the following spending per category or department:
{category_spent}

Give 2-3 short, actionable suggestions to reduce spending.
Return ONLY a JSON array of strings. No extra text or formatting.
"""

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a financial insights assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )

        text = response.choices[0].message.content.strip()

        # Clean formatting if model returns markdown
        text = text.replace("```json", "").replace("```", "").strip()

        try:
            suggestions = json.loads(text)
            suggestions = [s.strip() for s in suggestions if s.strip()]
            return suggestions
        except json.JSONDecodeError:
            return [text]

    except Exception as e:
        return [f"Error generating suggestions: {str(e)}"]


# -----------------------------
# User Summary Endpoint
# -----------------------------
@router.get("/user-summary")
def user_summary(current_user=Depends(get_current_user)):
    """
    Returns AI insights for the logged-in user.
    """
    expenses = list(expenses_collection.find({"user_email": current_user["email"]}))

    if not expenses:
        return {"message": "No expenses yet."}

    total_spent = sum(exp.get("amount", 0) for exp in expenses)

    category_spent = defaultdict(float)
    for exp in expenses:
        category_spent[exp.get("category", "Other")] += exp.get("amount", 0)

    highest_category = max(category_spent, key=category_spent.get)

    suggestions = generate_ai_suggestions(dict(category_spent))

    return {
        "total_spent": total_spent,
        "highest_category": highest_category,
        "category_spent": dict(category_spent),
        "suggestions": suggestions
    }


# -----------------------------
# Admin Summary Endpoint
# -----------------------------
@router.get("/admin-summary")
def admin_summary(admin_user=Depends(require_admin)):
    """
    Returns AI insights for admin across all employees.
    """

    expenses = list(expenses_collection.find())

    if not expenses:
        return {"message": "No expenses yet."}

    # Total spent per user
    user_spent = defaultdict(float)

    for exp in expenses:
        user_spent[exp["user_email"]] += exp.get("amount", 0)

    # Find highest spender
    highest_spender = max(user_spent, key=user_spent.get)

    # Users over allowance
    over_limit = []
    for user_email, spent in user_spent.items():
        user = users_collection.find_one({"email": user_email})
        allowance = user.get("allowance", 0) if user else 0

        if spent > allowance:
            over_limit.append(user_email)

    # AI suggestions based on user spending
    suggestions = generate_ai_suggestions(dict(user_spent))

    return {
        "user_spent": dict(user_spent),
        "highest_spender": highest_spender,
        "over_limit": over_limit,
        "suggestions": suggestions
    }