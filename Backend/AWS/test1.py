import json
from datetime import date
from tempfile import NamedTemporaryFile
from jugaad_data.nse import NSELive
import pymongo

current_indi_price = []  # Removed 'current_total' as it's not needed here
MONGO_STRING = "mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority"
client = pymongo.MongoClient(MONGO_STRING)
db = client["Stocks"]
collection = db["stocks"]

# Create an instance of NSELive outside the function
n = NSELive()

def getPrice(stockName):
    try: 
        q = n.stock_quote(stockName)
        return q['priceInfo']['lastPrice']
    except:
        return -1

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
        print(stock_name," => ", current_price)
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
print(lambda_handler(1,1))