import os
import pymongo
from dotenv import load_dotenv
from getPrice import getPrice

load_dotenv()

MONGO_STRING = os.getenv("MONGO_STRING")

client = pymongo.MongoClient(MONGO_STRING)
db = client["Stocks"]

collection = db["stocks"]

allDocs = collection.find()
invested_total = 0
current_total = 0

for doc in allDocs:
    stock_id = doc['_id']
    stock_name = doc['name']
    invested_total += doc['quantity'] * doc['price']
    current_price = getPrice(stock_name)
    current_total += doc['quantity'] * current_price
    collection.update_one({"_id": stock_id}, {"$set": {"LTP": current_price}})
    print(stock_name, " ✔️")

print("Invested: ", invested_total)
print("Current Total: ", current_total)