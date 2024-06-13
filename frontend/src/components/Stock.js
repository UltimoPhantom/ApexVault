import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DeleteStock from './DeleteStocks';

const StockDetail = ({ name, price, id, quantity, LTP }) => {
  const percentage = ((LTP - price) / price * 100).toFixed(2);
  const sign = percentage >= 0 ? '+' : '-';
  const color = sign === '+' ? 'text-green-500' : 'text-red-500';

  return (
    <div className='center justify-center mx-3 group mb-3'>
      <div className="block max-w-2xl p-5 bg-white border border-gray-200 rounded-3xl shadow-xl drop-shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:rounded-xl transition-all duration-300 hover:shadow-none min-w-fit mb-3">
        <div className='flex flex-row justify-between'>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
          <PercentChange price={price} LTP={LTP} />
        </div>
        <p className="font-extrabold text-zinc-300 text-5xl">{`₹${LTP}`}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center mt-5'>
            <h2 className='text-cyan-300 mr-2'>Q: {`${quantity}`}</h2>
            <h2 className='text-cyan-300 mr-1'>Avg: {`${price}`}</h2>
          </div>
          <div className='flex items-center mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'>
            <DeleteStock name={name} LTP={LTP} price={price} quantity={quantity} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PercentChange = ({ price, LTP }) => {
  const percentage = ((LTP - price) / price * 100).toFixed(2);
  const sign = percentage >= 0 ? '+' : '-';
  const color = sign === '+' ? 'text-green-500' : 'text-red-500';

  return (
    <p className={`justify-center center text-xl ${color}`}>{sign}{Math.abs(percentage)}%</p>
  );
};

export default StockDetail;
