import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Confetti from 'react-confetti';

const ConfettiPortal = ({ isVisible, profitDetails, onClose, id }) => {
    const [isConfettiVisible, setIsConfettiVisible] = useState(isVisible);
    const [statement, setStatement] = useState("")
    
    useEffect(() => {
        if (isVisible) {
            console.log(profitDetails.investedAmt, profitDetails.currAmt);
            const investedAmt = profitDetails?.investedAmt?.toFixed(2)
            const currAmt = profitDetails?.currAmt?.toFixed(2)
            const percentage = profitDetails?.percentage?.toFixed(2)

            setStatement("You made a " + (investedAmt < currAmt ? "profit of ₹" : "loss of ₹") + (Math.abs(currAmt - investedAmt)) + " \n " + (percentage) + "%")

            const timer = setTimeout(() => {
                setIsConfettiVisible(false);
                onClose();
            }, 5000); 

            return () => clearTimeout(timer); 
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {isConfettiVisible && <Confetti />}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur"></div>
            <div className="bg-white rounded-lg p-8 max-w-lg z-50 w-96 relative shadow-lg">
                <p>{statement}</p>
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
