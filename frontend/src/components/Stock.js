import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';


const StockDetail = ({ name, price, id, quantity, LTP }) => {
  const percentage = ((LTP - price) / price * 100).toFixed(2);
  const sign = percentage >= 0 ? '+' : '-';
  const color = sign === '+' ? 'text-green-500' : 'text-red-500';

  const deleteStock = async () => {
    console.log(")()()()()()(")
    try {
      alert(name + "deleted!!")
        const response = await fetch(`/stocks/delete/${encodeURIComponent(name)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || 'Failed to delete stock');
        }

        const data = await response.json();
        console.log(data.message); // Log success message
        // Optionally, you can perform any additional actions after successful deletion
    } catch (error) {
        console.error('Error deleting stock:', error.message);
        // Handle error gracefully, e.g., display an error message to the user
    }
}


  return (
    <div className='center justify-center mx-4 group mb-4'>
      <a className="block max-w-2xl p-6 bg-white border border-gray-200 rounded-3xl shadow-xl drop-shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:rounded-xl transition-all duration-300 hover:shadow-none min-w-fit mb-4 ">
        <div className='flex flex-row justify-between'>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-between">{name}</h5>
          <PercentChange price={price} LTP={LTP} />
        </div>
        <p className="font-extrabold text-zinc-300 text-6xl ">{`₹${LTP}`}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center  mt-6'>
            <h2 className='text-cyan-300 mr-3'>Q: {`${quantity}`}</h2>
            <h2 className='text-cyan-300 mr-1 '>Avg: {`${price}`}</h2>
          </div>
          <div className='flex items-center mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'>
            <Link to={deleteStock}>
              <MdOutlineDelete className='text-2xl text-red-600 mr-2' />
            </Link>
            {/* <Link to={`/stocks/edit/${id}`}>
              <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-800' />
            </Link> */}
          </div>
        </div>
      </a>
    </div>
  );
}

const PercentChange = ({ price, LTP }) => {
  const percentage = ((LTP - price) / price * 100).toFixed(2);
  const sign = percentage >= 0 ? '+' : '-';
  const color = sign === '+' ? 'text-green-500' : 'text-red-500';

  return (
    <p className={`justify-center center text-xl ${color}`}>{sign}{Math.abs(percentage)}%</p>
  );
}

export default StockDetail;



// alternatice design
/*
    <div className='center justify-center mx-4 group mb-4'>
      <a className="block w-full max-w-xl p-6 bg-white border border-gray-200 rounded-3xl shadow-xl drop-shadow-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:rounded-xl transition-all duration-300 hover:shadow-none min-w-fit mb-4 ">
        <div className='flex flex-col justify-between'>
          <div className="mb-2">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h5>
            <PercentChange price={price} LTP={LTP} />
          </div>
          <p className="font-bold text-3xl text-gray-900 dark:text-white">{`₹${LTP}`}</p>
          <div className='flex items-center justify-between mt-4'>
            <div className='flex items-center'>
              <h2 className='text-cyan-300 mr-3'>Q: {`${quantity}`}</h2>
              <h2 className='text-cyan-300'>Avg: {`${price}`}</h2>
            </div>
            <div className='flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'>
              <Link to={`/stocks/delete/${id}`}>
                <MdOutlineDelete className='text-2xl text-red-600 mr-2' />
              </Link>
              <Link to={`/stocks/edit/${id}`}>
                <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-800' />
              </Link>
            </div>
          </div>
        </div>
      </a>
    </div>
*/