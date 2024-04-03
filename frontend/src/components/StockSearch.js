import React, { useState, useEffect } from 'react';

const StockSearch = ({ stockDataFilePath }) => {
    const [stockData, setStockData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');

    useEffect(() => {
        fetch(stockDataFilePath)
            .then(response => response.text())
            .then(data => setStockData(data.split('\n').map(stock => stock.trim())));
    }, [stockDataFilePath]);

    const handleSearch = () => {
        if (stockData.includes(searchQuery)) {
            setSearchResult(`${searchQuery} exists in the stock data.`);
        } else {
            setSearchResult(`${searchQuery} does not exist in the stock data.`);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter stock name"
            />
            <button onClick={handleSearch}>Search</button>
            <p>{searchResult}</p>
        </div>
    );
};

export default StockSearch;
