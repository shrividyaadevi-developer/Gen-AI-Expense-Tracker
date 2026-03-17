from jose import jwt, JWTError
import os

# Your token from the curl
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjliMjU3YTQwNTNlOTAyNjRmMjI0YTAxIiwicm9sZSI6InVzZXIifQ.2SH8nZG2MR8tXogAjU4dL15jJk2MBIQHoy6tMFYTZws"

# The secret your FastAPI backend is using
SECRET_KEY = os.getenv("JWT_SECRET", "supersecret")
ALGORITHM = "HS256"

try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    print("Token is valid!")
    print("Payload:", payload)
except JWTError as e:
    print("Token is INVALID!")
    print("Reason:", str(e))