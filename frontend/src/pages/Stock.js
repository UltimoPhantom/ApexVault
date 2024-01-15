import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const stockDetail = ({ name, price, id, quantity }) => {
  return (
    <div className='center justify-center mx-4'>
      <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-3xl shadow-xl drop-shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:rounded-xl transition-all duration-300 hover:shadow-none">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-between">{name}</h5>
        <p className="font-extrabold text-zinc-300 text-6xl">{`₹${price}`}</p>
        <div className='flex items-center justify-between'>
        <div className='flex items-center  mt-6'>
          <h2 className='text-cyan-300 mr-1'>Q: {`₹${quantity}`}</h2>
        </div>
        <div className='flex items-center mt-6'>
          <Link to={`/stocks/delete/${id}`}>
            <MdOutlineDelete className='text-2xl text-red-600 mr-2 hover:text-red-800' />
          </Link>
          <Link to={`/stocks/edit/${id}`}>
            <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-800' />
          </Link>
        </div>
      </div>
      </a>
    </div>
  );
}

export default stockDetail