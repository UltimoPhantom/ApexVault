import os
import pymongo
from dotenv import load_dotenv
from datetime import date
from jugaad_data.nse import stock_df
from getPrice import getPrice

load_dotenv()

MONGO_STRING = os.getenv("MONGO_STRING")

client = pymongo.MongoClient(MONGO_STRING)
db = client["Stocks"]

collection = db["stocks"]

###  Adding new Docs ###
# newDoc = {
#     "name": "HDFCBANK",
#     "price": 1550,
#     "quantity": 10,
#     "LTP": 1450
# }

# collection.insert_one(newDoc)

### Finding all Docs ###
allDocs = collection.find()
for doc in allDocs:
    stock_name = doc['name']
    print(stock_name, getPrice(stock_name))
    