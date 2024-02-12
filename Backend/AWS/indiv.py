import json
from datetime import date
from os import name
from jugaad_data.nse import NSELive
from numpy import quantile
import pymongo

current_indi_price = []  # Removed 'current_total' as it's not needed here
MONGO_STRING = "mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority"
client = pymongo.MongoClient(MONGO_STRING)
db = client["Stocks"]
collection = db["stocks"]
print("CONNECTED!! ")

n = NSELive()
print("NSE CONNECTED ! !")

def getPrice(stockName):
    q = n.stock_quote(stockName)
    print("*&*& ",q['priceInfo']['lastPrice'])
    return q['priceInfo']['lastPrice']

# def getNames():
#     allDocs = collection.find()
#     invested_total = 0
#     current_total = 0

#     for doc in allDocs:
#         stock_id = doc['_id']
#         stock_name = doc['name']
#         quantity = doc['quantity']
#         price = doc['price']

#         invested_total += quantity * price
#         current_price = getPrice(stock_name)
#         current_total += quantity * current_price
#         collection.update_one({"_id": stock_id}, {"$set": {"LTP": current_price}})

#     return [invested_total, current_total]

def putStock(email, Stock):
    stock = {
        "name": Stock['name'],
        "price": Stock['price'],
        "quantity": Stock['quantity'],
        "LTP": getPrice(stockName=Stock['name']),
        "email": email
    }
    
    collection.insert_one(stock)
    print("DONE! ")
    

def lambda_handler(event, context):
    email, Stock = event['email'], event['Stock']
    print(Stock)
    putStock(email, Stock)
        

    return {
        'statusCode': 200, 
        'body': json.dumps({'message': 'Stock added successfully'}) 
    }


h = 1

event = {
    "email": "tej@tej123123.com",
    "Stock": {
        "name": "ITC",
        "price": 234,
        "quantity": 5,
        "LTP": -1,
    }
}


print(lambda_handler(event, h))