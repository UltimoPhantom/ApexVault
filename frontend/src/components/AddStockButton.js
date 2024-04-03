import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import ErrorMessage from './ErrorMessage';
import StockSearch from './StockSearch';

const CustomDialog = () => {
    const { user } = useAuthContext()
    const email = user.email

    const [isOpen, setIsOpen] = useState(false);
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState(null);


    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stock = { name: symbol, price: price, quantity: quantity, email };
        console.log(stock);
        try {
            const response = await fetch('http://localhost:5555/stocks', {
                method: 'POST',
                body: JSON.stringify(stock),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(!response.ok) {
                setError(json.error)
                console.log(error)
                alert(json.error)
                // handleClickOpen()
            }

            if(response.ok) {
                handleClose()
                // window.location.reload();
                
            }
        } 
        catch(error) {
            console.log('Eror ', error);
        }
    }

    return (
        <div>
        <a href="#_" className="relative inline-flex items-center justify-start px-8 py-4 overflow-hidden font-medium transition-all bg-green-500 rounded-xl group" onClick={handleClickOpen}>
            <span className="absolute top-0 right-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-5 group-hover:-mt-5">
                <span className="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-green-600 rounded-2xl group-hover:mb-16 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left font-bold text-white transition-colors duration-200 ease-in-out group-hover:text-white">Add Stocks!</span>
        </a>
            {/* <button onClick={handleClickOpen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-16">
                Add Stocks
            </button> */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={handleClose}></div>
                    
                    <div className="bg-white rounded-lg p-8 max-w-lg z-50 w-96">
                        <h2 className="text-2xl font-bold mb-4">Stock symbol:</h2>
                        <input
                            type="text"
                            onChange={(e) => setSymbol(e.target.value)}
                            aria-describedby="helper-text-explanation"
                            className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg mb-4"
                            required
                        />
                        <StockSearch />
                        <h2 className="text-2xl font-bold mb-4">Quantity:</h2>
                        <input
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            aria-describedby="helper-text-explanation"
                            className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg mb-4"
                            required
                        />
                        <h2 className="text-2xl font-bold mb-4">Average Price:</h2>
                        <input
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            aria-describedby="helper-text-explanation"
                            className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg mb-4"
                            required
                        />
                        <div className="flex justify-end">
                            <a href="#_" onClick={handleSubmit} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-700 group-hover:translate-x-0 ease">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Add Stock</span>
                                <span className="relative invisible">Add Stock</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDialog;