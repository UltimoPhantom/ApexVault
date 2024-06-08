import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { MdOutlineDelete } from 'react-icons/md';

const DeleteStock = ({ name, LTP, price, quantity }) => {
    const { user } = useAuthContext();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [profit, setProfit] = useState(0);
    const [showProfit, setShowProfit] = useState(false);
    const [fadeClass, setFadeClass] = useState('');

    useEffect(() => {
        if (isOpen) {
            setFadeClass('zoom-in');
        }
    }, [isOpen]);

    const handleClickOpen = () => {
        setIsOpen(true);
        setTimeout(() => {
            setFadeClass('fade-out');
            setTimeout(() => {
                setIsOpen(false);
            }, 3000); 
        }, 3000); 
    };

    const handleClose = () => {
        setFadeClass('fade-out');
        setTimeout(() => {
            setIsOpen(false);
            setShowProfit(false);
        }, 300); // Duration of the fade-out animation
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);

        try {
            const response = await axios.delete(`/stocks/delete/${encodeURIComponent(name)}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            setIsLoading(false);

            if (response.status !== 200) {
                setErrorMessage(response.data.message);
            } else {
                const profitValue = (LTP - price) * quantity;
                setProfit(profitValue);
                setShowProfit(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log('Error: ', error);
            if (error.response && error.response.data && error.response.data.message) {
                console.log("Error Message: ", error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
        } finally {
            setFadeClass('fade-out');
            setTimeout(() => {
                setIsOpen(false);
            }, 300); // Duration of the fade-out animation
        }
    };

    return (
        <div>
            <style>
                {`
                    @keyframes zoomIn {
                        from {
                            opacity: 0;
                            transform: scale(0.5);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }

                    @keyframes fadeOut {
                        from {
                            opacity: 1;
                        }
                        to {
                            opacity: 0;
                        }
                    }

                    .zoom-in {
                        animation: zoomIn 0.3s forwards;
                    }

                    .fade-out {
                        animation: fadeOut 0.3s forwards;
                    }
                `}
            </style>
            <MdOutlineDelete className='text-2xl text-red-600 mr-2 hover:cursor-pointer' onClick={handleClickOpen} />

            {isOpen && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center ${fadeClass}`}>
                    <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={handleClose}></div>
                    
                    <div className="bg-white rounded-lg p-8 max-w-lg z-50 w-96 relative">
                        <p>Are you sure you want to sell?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleConfirmDelete}>Yes</button>
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handleClose}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {showProfit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={handleClose}></div>
                    
                    <div className="bg-white rounded-lg p-8 max-w-lg z-50 w-96 relative">
                        <p>You made a profit of ₹{profit.toFixed(2)} from selling {name}!</p>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteStock;