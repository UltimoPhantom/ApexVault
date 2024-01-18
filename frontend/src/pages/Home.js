import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import Trial from '../components/Stock';

const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStocks = () => {
        return axios.get('http://localhost:5555/stocks')
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error fetching stocks:", error);
                throw error; // Propagate the error to the calling function if needed
            });
    };

    const fetchStockPrices = async (stocks) => {
        const pricePromises = stocks.map(async (stock) => {
            try {
                const symbol = encodeURIComponent(stock.name);
                const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}.BSE&outputsize=compact&apikey=6SEW4476O3T6NK83`;
    
                const response = await axios.get(apiUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                    },
                });
    
                const timeSeries = response.data["Time Series (Daily)"];
                console.log(timeSeries)
    
                if (timeSeries) {
                    const firstDay = Object.keys(timeSeries)[0];
                    const val = timeSeries[firstDay]["4. close"];
    
                    console.log(`Stock: ${stock.name}, Price: ${val}`);
                    return { name: stock.name, price: val };
                } else {
                    console.error(`Time Series (Daily) not found for ${stock.name} in the response.`);
                    return null; // Return null to handle the error without throwing
                }
            } catch (error) {
                console.error(`Error fetching stock price for ${stock.name}:`, error);
                return null; // Return null to handle the error without throwing
            }
        });
    
        return Promise.all(pricePromises);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedStocks = await fetchStocks();
                setStocks(fetchedStocks);

                const stockPrices = await fetchStockPrices(fetchedStocks);
                // Do something with the stock prices if needed
                console.log('Stock Prices:', stockPrices);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // <- Ensure that the dependency array is empty to run only once on mount


    return (
        <div className='p-4'>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-3xl my-6 font-black center'> My Portfolio </h1>
                        <h1 className='text-3xl bold text-green-600'>+12300</h1>
                        <h1 className='text-3xl bold text-green-600'>+12%</h1>
                        <Link to='/stocks/create'>
                            <MdOutlineAddBox className='text-sky-800 text-4xl hover:text-sky-900' />
                        </Link>
                    </div>
                    <div className='w-full grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 my-8'>
                        {stocks && stocks.length > 0 ? (
                            stocks.map((stock, index) => (
                                <Trial key={index} name={stock.name} price={stock.price} id={stock.id} quantity={stock.quantity} />
                            ))
                        ) : (
                            <p className='text-center'>No stocks available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};

export default Home;