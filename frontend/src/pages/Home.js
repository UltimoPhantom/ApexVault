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

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/stocks')
      .then((response) => {
        console.log(response.data); // Log the response data
        setStocks(response.data);
        console.log(stocks)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center flex-col'>
        <h1 className='text-3xl my-6 font-black center'> My Portfolio </h1>
        <Link to='/stocks/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl hover:text-sky-900' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='w-full grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 my-8'>
          {stocks && stocks.length > 0 ? (
            stocks.map((stock, index) => (
              <Trial key={index} name={stock.name} price={stock.price} id={stock.id} quantity={stock.quantity} />
            ))
          ) : (
            <p className='text-center'>No stocks available</p>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Home;