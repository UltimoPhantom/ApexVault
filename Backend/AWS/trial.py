import json
from datetime import date
from tempfile import NamedTemporaryFile
from jugaad_data.nse import NSELive
import pymongo

current_total = 0.0
current_indi_price = []

def getPrice(stockNames):
    n = NSELive()
    for stockName in stockNames:
        q = n.stock_quote(stockName)
        tempp = q['priceInfo']['close']
        current_total += tempp
        current_indi_price.append(tempp)

def getNames():
    MONGO_STRING = "mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority"
    client = pymongo.MongoClient(MONGO_STRING)
    db = client["Stocks"]
    collection = db["stocks"]
    allDocs = list(collection.find())  # Convert Cursor to list
    return allDocs

def lambda_handler(event, context):
    ans = getNames()

    # Convert the MongoDB cursor to a list before serializing to JSON
    serialized_ans = []
    for doc in ans:
        serialized_ans.append(json.loads(json.dumps(doc, default=str)))

    return {
        'statusCode': 200,
        'body': json.dumps(serialized_ans),
    }


print(lambda_handler(1,1))