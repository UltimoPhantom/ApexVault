import React from 'react';
import LogoutButton from './LogoutButton';
import AddStockButton from './AddStockButton';
import GetHistChart from './GetHistChart';

const Navbar = ({ investedVal, currentVal, name }) => {

    const percentage = investedVal / (currentVal + investedVal) * 100;
    const sign = percentage >= 0 ? '+' : '-';
    const color = sign === '+' ? 'text-green-500' : 'text-red-500';
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <div className='flex flex-row items-center justify-between px-5 py-3'>
            <h1 className='text-3xl font-black'>
                <span className='text-5xl animate-rgb-breathing'>{capitalizedName}</span>'s

            </h1>
            <div className='flex flex-row items-center space-x-10'>
                <h1 className='text-3xl font-extrabold text-black'>Invested: ₹{investedVal}</h1>
                <h1 className='text-3xl font-extrabold text-black'>Current: ₹{currentVal}</h1>
                <h1 className={`text-4xl font-extrabold ${color}`}>{sign}{percentage.toFixed(2)}%</h1>
            </div>
            <div className='flex flex-row items-center space-x-4'>
                <AddStockButton />
                <GetHistChart />
                <LogoutButton />
            </div>
        </div>
    );
}

export default Navbar;
