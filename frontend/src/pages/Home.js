import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

import Stock from '../components/Stock';
import { useAuthContext } from '../hooks/useAuthContext';
import LogoutButton from '../components/LogoutButton';
import AddStockButton from '../components/AddStockButton';
import Navbar from '../components/Navbar';

const aws_api_url = 'https://ddwtmrp2ib.execute-api.ap-southeast-2.amazonaws.com/default/apexValue_9'


const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [invested_val, setInvested_val] = useState();
    const [current_val, setcurrent_val] = useState();

    const [ccc, setCoins] = useState(0);
    const [lastUpdated, setLastUpdated] = useState("");

    const { user } = useAuthContext()

    const fetchStocks = async () => {
        try {
            const response = await axios.get('http://localhost:5555/stocks', {
                params: {
                    email: user.email
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            return response.data; 
        } catch (error) {
            console.error("Error fetching stocks:", error);
            throw error;
        }

    };

    const callLambda = async () => {
        try {
            const now = new Date();
            const datee = now.getDate();
            const month = now.getDate();
            const year = now.getDate();
            const today = datee + " " + month + " " + year;
                const response = await axios.get(aws_api_url);
                // setInvested_val(response.data.currentVal)
                // setcurrent_val(response.data.investedVal)
                return
        
        } catch (error) {
            console.log(error.message);
            return []; 
        }
    };

    //not updating the price if its less than 12hrs
    const isUpdateRequired = (email) => {
        const storedData = localStorage.getItem(email);
        if (!storedData) {
            // No stored data, update is required
            return true;
        }

    
        const lastUpdateTime = new Date(JSON.parse(storedData).lastUpdatedTime);
        const currentTime = new Date();
        const timeDiffMs = Math.abs(currentTime - lastUpdateTime);
        const timeDiffHrs = timeDiffMs / (1000 * 60 * 60);
    
        // Check if update is required based on the time difference
        return timeDiffHrs >= 12;
    };
    
    const perUserFetch = async (email) => {
        if(isUpdateRequired(email)) {
            try {
                const res = await axios.post('http://localhost:5555/user/getStocks', {
                    email: email
                }, {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                });
                
                //storing the data in local storage
                const dataToStore = {
                    lastUpdatedTime: new Date().toISOString(),
                    currentVal: res.data.currentVal,
                    totalVal: res.data.investedVal
                };
                localStorage.setItem(email, JSON.stringify(dataToStore));

                return res.data;
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                return [];
            }
        }
        else {
            let prices = {
                "investedVal" : localStorage.getItem("currentVal"),
                "currentVal" : localStorage.getItem("totalVal")
            }
            return prices
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (user) {
                    const r = await perUserFetch(user.email)
                    setInvested_val(r['investedVal'])
                    setcurrent_val(r['currentVal'])
                    const fetchedData = await fetchStocks();
                    setStocks(fetchedData.stock);
                    setInvested_val(fetchedData.coins)
                    setcurrent_val(fetchedData.totalCoins)
                    setLastUpdated(fetchedData.last_updated);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
  // No need to check for 'user' here, just call the FetchData function directly

        fetchData();
    }, [user, setStocks, setCoins, setLastUpdated]);

    return (
        <div className='p-4 h-screen w-screen' style={{ backgroundImage: 'url("https://i.postimg.cc/xdLxBnDH/IMG-BG-001.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>

            {loading ? (
                <Spinner />
            ) : (
                <div>

                    <Navbar 
                        investedVal={invested_val} 
                        currentVal={current_val} 
                        updateInvestedValAndCurrentVal={(investedVal, currentVal) => {
                            setInvested_val(investedVal);
                            setcurrent_val(currentVal);
                        }}
                        name = {user.email.split('@')[0]}
                    />


            <div className='w-full grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 my-6'> {/* Changed gap-2 to gap-3 and my-4 to my-6 */}
            {stocks && stocks.length > 0 ? (
                stocks.map((stock, index) => (
                <Stock key={index} name={stock.name} price={stock.price} id={stock.id} quantity={stock.quantity} LTP={stock.LTP} />
                ))
            ) : (
                <p className='text-center col-span-full'>No stocks available</p>
            )}
            </div>
                </div>
            )}
        </div>
    );

};

export default Home;