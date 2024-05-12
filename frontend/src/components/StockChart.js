import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockChart = ({ stocks }) => {
    // Function to convert timestamp to dd/mm/yy format
    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp);
        // Get the day, month, and year
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        // Return the formatted date string
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year % 100}`;
    };

    // Convert timestamps to date strings
    const stocksWithDateString = stocks.map(stock => {
		console.log("TYPE: ", stocks)
		console.log("TYPE: ", stock)
        return { ...stock, DATE: convertTimestampToDate(stock.DATE) };
    });

    return (
        <div>
            <h2>Stock Price Over Time</h2>
            <div style={{ height: 400, width: '80%', margin: '0 auto' }}>
                <LineChart
                    width={800}
                    height={400}
                    data={stocksWithDateString} // Using the converted data here
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="DATE" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="CLOSE" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default StockChart;
