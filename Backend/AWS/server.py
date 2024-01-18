import os
import pymongo
from dotenv import load_dotenv

load_dotenv()

MONGO_STRING = os.getenv("MONGO_STRING")

client = pymongo.MongoClient(MONGO_STRING)
db = client["Stocks"]

collection = db["stocks"]

newDoc = {
    "name": "HDFCBANK",
    "price": 1550,
    "quantity": 10,
    "LTP": 1450
}

collection.insert_one(newDoc)


