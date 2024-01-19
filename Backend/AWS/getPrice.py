'''
    This script is designed to run on AWS Lambda.
    It may include Lambda-specific configurations or features.
'''
import datetime
from datetime import date as dt_date  
from jugaad_data.nse import stock_df

    
def getPrice(stockName):
    x = datetime.datetime.now()
    hour = x.strftime("%H")

    current_date_str = x.strftime("%Y-%m-%d")  

    # If fetched before market opens(before 9am), day is set to yesterday
    current_date_obj = dt_date.fromisoformat(current_date_str)
    current_date_obj -= datetime.timedelta(days=1)
    current_date_str = current_date_obj.strftime("%Y-%m-%d")

    #Fetching..
    try:
        df = stock_df(symbol=stockName, from_date=current_date_obj, to_date=current_date_obj, series="EQ")
        price = df.at[0, 'PREV. CLOSE']
        return price
    except:
        print("ERROR 404 INVALID STOCK NAME !!! ", stockName)
        return -1