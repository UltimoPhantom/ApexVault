import React from 'react';
import LogoutButton from './LogoutButton';
import AddStockButton from './AddStockButton';

const Navbar = ({ investedVal, currentVal }) => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl my-6 font-black'>My Portfolio</h1>
            <div className='flex items-center justify-center'>
                <h1 className='text-3xl bold text-green-600'>{investedVal}</h1>
                <h1 className='text-3xl bold text-green-600'>{currentVal}</h1>
            </div>
            <div className='flex items-center justify-center'>
                <AddStockButton />
                <LogoutButton />
            </div>
        </div>
    );
}

export default Navbar;
