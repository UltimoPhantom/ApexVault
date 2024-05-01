from datetime import date
from jugaad_data.nse import stock_csv, stock_df
import pandas

# Download as pandas dataframe
df = stock_df(symbol="LICI", from_date=date(2024,3,17),
            to_date=date(2024,4,15), series="EQ")

print(df.head())
df = df[['DATE','CLOSE']]
print(df)