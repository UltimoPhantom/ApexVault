import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';
import Trial from '../components/Stock';

const Home = () => {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState(0)
    const [percent, setPercent] = useState(0)
    const [sign, setSign] = useState(true)

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/stocks')
            .then((response) => {
                setStocks(response.data);


                axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SUZLON.BSE&outputsize=compact&apikey=C2JK8QJK59J7I616')
                    .then((response) => {
                        console.log(response.data);

                        // Assuming the response structure is similar to the previous example
                        const timeSeries = response.data["Time Series (Daily)"];
                        if (timeSeries) {
                            const firstDay = Object.keys(timeSeries)[0];
                            const val = timeSeries[firstDay]["4. close"];
                            console.log(val);
                        } else {
                            console.error("Time Series (Daily) not found in the response.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);


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