import json
from datetime import date
from tempfile import NamedTemporaryFile
from jugaad_data.nse import NSELive
import pymongo

n = NSELive()

def getPrice(stockName):
    q = n.stock_quote(stockName)
    return q['priceInfo']['lastPrice']

print(getPrice("SUZLON"))
print(getPrice("LICI"))