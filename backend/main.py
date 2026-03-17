# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.routes import auth_routes, admin_routes, user_routes, expense_routes, ai_routes

app = FastAPI(title="Work Expense Management API")

# Allow CORS for frontend (React, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(expense_routes.router, prefix="/expenses", tags=["Expenses"])
app.include_router(ai_routes.router, prefix="/ai", tags=["AI Insights"])

# Optional root route
@app.get("/")
def root():
    return {"message": "Work Expense Management API is running"}