from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URL)

db = client["expense_app"]

users_collection = db["users"]
expenses_collection = db["expenses"]