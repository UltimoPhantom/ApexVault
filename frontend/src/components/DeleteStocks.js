import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { MdOutlineDelete } from 'react-icons/md';
import ConfettiPortal from './ConfettiPortal';

const DeleteStock = ({ name, LTP, price, quantity }) => {
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [profitDetails, setProfitDetails] = useState(null);
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
            }, 300);
        }, 1500);
    };

    const handleClose = () => {
        setFadeClass('fade-out');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const handleConfirmDelete = async () => {

        const profitValue = 109;
        const investedAmt = quantity * price;
        const currAmt = quantity * LTP;

        setProfitDetails({investedAmt, currAmt})


        console.log("🚀🚀 " , investedAmt , currAmt)
        setProfitDetails({ name, profit: profitValue });
        setFadeClass('fade-out');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const handleConfettiClose = () => {
        setProfitDetails(null);
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
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur" onClick={handleClose}></div>

                    <div className="bg-white rounded-lg p-8 max-w-lg z-50 w-96 relative shadow-lg">
                        <p>Are you sure you want to delete {name}?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleConfirmDelete}>Yes</button>
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handleClose}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {profitDetails && (
                <ConfettiPortal
                    isVisible={!!profitDetails}
                    profitDetails={profitDetails}
                    onClose={handleConfettiClose}
                />
            )}
        </div>
    );
};

export default DeleteStock;
