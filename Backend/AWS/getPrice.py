import datetime
from datetime import date as dt_date  
from jugaad_data.nse import stock_df

x = datetime.datetime.now()
hour = x.strftime("%H")

current_date_str = x.strftime("%Y-%m-%d")  

if int(hour) < 9:
    current_date_obj = dt_date.fromisoformat(current_date_str)
    current_date_obj -= datetime.timedelta(days=1)
    current_date_str = current_date_obj.strftime("%Y-%m-%d")

name = "SUZLON"
df = stock_df(symbol=name, from_date=current_date_obj, to_date=current_date_obj, series="EQ")
price = df.at[0, 'PREV. CLOSE']
print(price)