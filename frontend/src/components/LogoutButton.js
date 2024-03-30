import React from 'react';
import { useLogout } from '../hooks/useLogout';

const LogoutButton = () => {
    const { logout } = useLogout(); // Initialize the logout function from the custom hook

    const handleLogoutClick = () => {
        logout(); // Call the logout function when the button is clicked
    };

    return (
        <div className='ml-4'>
            <a href="#_" className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden  font-medium tracking-tighter text-white bg-gray-800 rounded-lg group" onClick={handleLogoutClick}>
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-700 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative font-bold">Logout</span>
            </a>
        </div>
    );
};

export default LogoutButton;
