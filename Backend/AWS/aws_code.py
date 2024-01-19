import json
import datetime
from datetime import date as dt_date  
from jugaad_data.nse import stock_df
import pymongo
import pandas

def getPrice(stockName):
    x = datetime.datetime.now()
    hour = x.strftime("%H")

    current_date_str = x.strftime("%Y-%m-%d")  
    print("Date1: ", current_date_str)

    # If fetched before market opens(before 9am), day is set to yesterday
    current_date_obj = dt_date.fromisoformat(current_date_str)
    current_date_obj -= datetime.timedelta(days=1)
    current_date_str = current_date_obj.strftime("%Y-%m-%d")
    print("Updated: ", current_date_obj)
    print("UpdatedStr: ",current_date_str)

    #Fetching..
    try:
        df = stock_df(symbol=stockName, from_date=current_date_obj, to_date=current_date_obj, series="EQ")
        price = df.at[0, 'PREV. CLOSE']
        return price
    except Exception as e:
        print(f"Error fetching data: {str(e)}")
        return -1
        


def lambda_handler(event, context):
    # TODO implement
    client = pymongo.MongoClient('mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority')
    db = client["Stocks"]

    collection = db["stocks"]

    allDocs = collection.find()
    invested_total = 0
    current_total = 10000

    for doc in allDocs:
        stock_id = doc['_id']
        stock_name = doc['name']
        invested_total += doc['quantity'] * doc['price']
        current_price = getPrice(stock_name)
        current_total += doc['quantity'] * current_price
        collection.update_one({"_id": stock_id}, {"$set": {"LTP": current_price}})
        print(stock_name, " ✔️")

        # print("Invested: ", invested_total)
        # print("Current Total: ", current_total)
        
    currentPrices = {
        "totalValue": invested_total,
        "currentValue": current_total
    }
    
    
    response =  {
        'statusCode': 200,
        'body': json.dumps(currentPrices),
        'headers': {'Content-Type': 'application/json'}
    }
    
    return response
