from flask import Flask, request, jsonify
import pymongo
from jugaad_data.nse import stock_df
import datetime
from jugaad_data.nse import NSELive

app = Flask(__name__)
n = NSELive()

def getStocks(email):
    client = pymongo.MongoClient("mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority")
    db = client["Stocks"]
    collection = db["stocks"].find({"email":email})
    ll = []
    for i in collection:
        ll.append(i)
    return ll


def getPrice(stockName):
    q = n.stock_quote(stockName)
    return q['priceInfo']['lastPrice']

def updatePrice(email, stockName, stockPrie):
    client = pymongo.MongoClient("mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority")
    db = client["Stocks"]
    collection = db["stocks"]
    query = {"email":email, "name":stockName}
    new_value = {"$set":{"price":stockPrie}}
    res = collection.update_one(query, new_value)
    if res.modified_count == 1:
        print("Updated!")
    else:
        print("No stocks to update")
    

@app.route('/hello', methods=['POST'])
def hello_world():
    data = request.json  
    email = data.get('email', 'z@z.com')
    stocks = getStocks(email)
    stocks = list(stocks)
    print("* * * * * * * * * * * * * * * *")
    for stock in stocks:
        print(stock['name'])
        print(getPrice(stock['name']))
        print("^ ^ ^ ^ ^")
    return jsonify({'stocks': 'Hello World'})


if __name__ == '__main__':
    app.run(debug=True)
