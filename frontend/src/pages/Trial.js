import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Trial = () => {
  return (
    <div className='center justify-center ml-52 mt-52 '>
        <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-between">Noteworthy </h5>
        <p className="font-extrabold text-zinc-300 text-6xl">₹2450</p>
        <div className='flex-row-reverse flex'>
            <Link to={`/stocks/delete/${12}`}>
                <MdOutlineDelete className='text-2xl text-red-600 mt-3 hover:text-red-800 ml-5' />
            </Link>
            <Link to={`/stocks/edit/${12}`}>
                <AiOutlineEdit className='text-2xl text-yellow-600 mt-3 hover:text-yellow-800' />
            </Link>
        </div>
        </a>
    </div>
  )
}

export default Trial