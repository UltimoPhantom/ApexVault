import json
from datetime import date
from tempfile import NamedTemporaryFile
from jugaad_data.nse import NSELive
import pymongo

n = NSELive()

def lambda_handler(event, context):
    stockName = event['stockName']
    q = n.stock_quote(stockName)
    price = q['priceInfo']['lastPrice']
    p = {
        "LTP": price
    }
    return {
        'statusCode': 200,
        'body': json.dumps(p),
    }
    
    
e = {
    "stockName":"506532"
}
print(lambda_handler(e,1))