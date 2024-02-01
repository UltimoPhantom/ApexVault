import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import Trial from '../components/Stock';
import { useAuthContext } from '../hooks/useAuthContext'
import AlertDialog from '../components/Create';
const AWS = require('aws-sdk')
const aws_api_url = 'https://ddwtmrp2ib.execute-api.ap-southeast-2.amazonaws.com/default/apexValue_9'


const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([]);
    const { user } = useAuthContext()

    const fetchStocks = () => {
        return axios.get('http://localhost:5555/stocks', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching stocks:", error);
            throw error;
        });
    };


    const callLambda = async () => {
        try {
            const response = await axios.get(aws_api_url)
            return response.data
        } catch (error) {
            console.log(error.message)
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedStocks = await fetchStocks();
                setStocks(fetchedStocks);


                // const calLamb = await callLambda();
                // console.log(calLamb)

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if(user) {
           fetchData();
        }
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
                            <AlertDialog />
                        </Link>
                    </div>
                    <div className='w-full grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 my-8'>
                        {stocks && stocks.length > 0 ? (
                            stocks.map((stock, index) => (
                                <Trial key={index} name={stock.name} price={stock.price} id={stock.id} quantity={stock.quantity} LTP={stock.LTP} />
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