import React from 'react';
import LogoutButton from './LogoutButton';
import AddStockButton from './AddStockButton';

const Navbar = ({ investedVal, currentVal }) => {
    const percentage = investedVal / (currentVal + investedVal ) * 100;
    const sign = percentage >= 0 ? '+' : '-';
    const color = sign === '+' ? 'text-green-500' : 'text-red-500';

    return (
        <div className='flex flex-row items-center justify-between'>
            <h1 className='text-3xl my-6 font-black'>My Portfolio</h1>
            <div className='flex justify-center'>
                <h1 className='text-3xl bold text-black mx-16'>Invested: {investedVal}</h1>
                <h1 className='text-3xl bold text-black '>Current : {currentVal}</h1>
            </div>
            <div className='flex justify-center'>
                <AddStockButton />
                <LogoutButton />
            </div>
        </div>

    );
}

export default Navbar;
