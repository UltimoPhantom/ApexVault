from cv2 import rotate
from flask import Flask, request, jsonify
from datetime import datetime
import pandas as pd
from jugaad_data.nse import stock_df
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route('/histdata', methods=['POST'])
def get_stock_data():
    data = request.json  
    stock_name = data.get('stockName')
    start_date = datetime.strptime(data.get('start_date'), "%Y%m%d").date()
    end_date = datetime.strptime("20240418", "%Y%m%d").date()
    
    df = stock_df(symbol=stock_name, from_date=start_date, to_date=end_date, series="EQ")
    print("&&&&&",  df)
    df_json = df[['DATE', 'CLOSE']].to_json(orient='records')
    
    df2 = pd.read_json(df_json)
    
    df2['DATE'] = pd.to_datetime(df2['DATE'], unit='ms')
    df2['DATE'] = df2['DATE'].dt.strftime('%d/%m/%y')

    plt.figure(figsize=(24, 16))  # Set the figure size to maximize the plot
    plt.plot(df2['DATE'], df2['CLOSE'], color='blue', linewidth=2, linestyle='-')
    plt.xlabel('Date', fontsize=12, fontweight='bold', color='gray')
    plt.ylabel('Closing Price', fontsize=12, fontweight='bold', color='gray')
    plt.xticks(rotation=90, fontsize=10, color='black')  # Rotate x-labels by 45 degrees
    plt.yticks(fontsize=10, color='black')
    plt.title('Stock Price Over Time', fontsize=14, fontweight='bold', color='black')
    plt.grid(True, linestyle='--', linewidth=0.5, color='lightgray')  # Add grid with dashed lines
    plt.tight_layout()  # Adjust layout to prevent clipping of labels
    plt.show()

    return jsonify({'stocks': df_json})

if __name__ == '__main__':
    app.run(debug=True)
