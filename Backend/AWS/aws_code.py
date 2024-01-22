###########
'''
    This script is designed to run on AWS Lambda.
    It may include Lambda-specific configurations or features.
'''


import json
from datetime import date
from tempfile import NamedTemporaryFile
from jugaad_data.nse import NSELive
import pymongo

current_indi_price = []  # Removed 'current_total' as it's not needed here
MONGO_STRING = "MONGO_URL_STRING_NO_LEAK_NO_SUS"
client = pymongo.MongoClient(MONGO_STRING)
db = client["Stocks"]
collection = db["stocks"]

# Create an instance of NSELive outside the function
n = NSELive()

def getPrice(stockName):
    q = n.stock_quote(stockName)
    return q['priceInfo']['close']

def getNames():
    allDocs = collection.find()
    invested_total = 0
    current_total = 0

    for doc in allDocs:
        stock_id = doc['_id']
        stock_name = doc['name']
        quantity = doc['quantity']
        price = doc['price']

        invested_total += quantity * price
        current_price = getPrice(stock_name)
        current_total += quantity * current_price
        collection.update_one({"_id": stock_id}, {"$set": {"LTP": current_price}})

    return [invested_total, current_total]

def lambda_handler(event, context):
    invested_total, current_total = getNames()

    pri = {
        "investedVal": invested_total,
        "currentVal": current_total
    }

    return {
        'statusCode': 200,
        'body': json.dumps(pri),
    }
