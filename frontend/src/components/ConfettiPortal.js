import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';

const ConfettiPortal = ({ isVisible, profitDetails, onClose }) => {
    const [isConfettiVisible, setIsConfettiVisible] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            console.log("🚀*🚀", profitDetails)
            console.log(profitDetails.investedAmt, profitDetails.currAmt);

            const timer = setTimeout(() => {
                setIsConfettiVisible(false);
                onClose();
            }, 15000); // Confetti will be visible for 15 seconds

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {isConfettiVisible && <Confetti />}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur"></div>
            <div className="bg-white rounded-lg p-8 max-w-lg z-50 w-96 relative shadow-lg">
                <p>You made a profit of ₹1000 from selling 100!</p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfettiPortal;
