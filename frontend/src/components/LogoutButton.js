import React from 'react';
import { useLogout } from '../hooks/useLogout';

const LogoutButton = () => {
    const { logout } = useLogout(); // Initialize the logout function from the custom hook

    const handleLogoutClick = () => {
        logout(); // Call the logout function when the button is clicked
    };

    return (
        <button
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mr-4"
            onClick={handleLogoutClick} // Attach onClick event handler
        >
            Logout
        </button>
    );
};

export default LogoutButton;
