import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import Stock from '../components/Stock';
import { useAuthContext } from '../hooks/useAuthContext';
import LogoutButton from '../components/LogoutButton';
import AddStockButton from '../components/AddStockButton';
import Navbar from '../components/Navbar';

const AWS = require('aws-sdk')
const aws_api_url = 'https://ddwtmrp2ib.execute-api.ap-southeast-2.amazonaws.com/default/apexValue_9'

const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([]);
    const [invested_val, setInvested_val] = useState(100);
    const [current_val, setcurrent_val] = useState(120);

    const { user } = useAuthContext()

    const fetchStocks = () => {
        return axios.get('http://localhost:5555/stocks', {
            params: {
                email: user.email
            },
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
            const response = await axios.get(aws_api_url);
            setInvested_val(response.data.currentVal)
            setcurrent_val(response.data.investedVal)
            return
        } catch (error) {
            console.log(error.message);
            return []; // Return an empty array if there's an error
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (user) {

                    // await callLambda();
                    
                    const fetchedStocks = await fetchStocks();
                    setStocks(fetchedStocks);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData(); 
    }, [user]); 
    


    return (
        <div className='p-4'>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <Navbar investedVal={invested_val} currentVal={current_val}/>

                    <div className='w-full grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 my-8'>
                        {stocks && stocks.length > 0 ? (
                            stocks.map((stock, index) => (
                                <Stock key={index} name={stock.name} price={stock.price} id={stock.id} quantity={stock.quantity} LTP={stock.LTP} />
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