import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useState, useEffect } from 'react';

const Home = () => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)

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
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'> Stocks List </h1>
        <Link to='/stocks/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md md:max-w-hidden'>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks && stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <tr key={stock._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {stock.name}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {stock.price}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/stocks/details/${stock._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/stocks/edit/${stock._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                      <Link to={`/stocks/delete/${stock._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className='text-center'>
                  No stocks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default Home;