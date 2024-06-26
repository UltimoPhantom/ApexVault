import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import ErrorMessage from './ErrorMessage';
import StockChart from './StockChart';
import ReactDOM from 'react-dom'; // Import ReactDOM

const CustomDialog = () => {
    const { user } = useAuthContext()
    const email = user.email

    const [isOpen, setIsOpen] = useState(false);
    const [symbol, setSymbol] = useState("");
    const [buyDate, setBuyDate] = useState("");
    const [price, setPrice] = useState(0);
    const [error, setError] = useState(null);
    const [stocksData, setStocksData] = useState(null); // State to hold stock data for drawing chart

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const stock = { stockName: symbol, start_date: buyDate, end_date: "20240416"};
    
        try {
            const response = await fetch('http://localhost:5555/stocks/histdata', {
                method: 'POST',
                body: JSON.stringify(stock),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
    
            // const jsonData = await response.json();
            // setStocksData(jsonData); 
            // const apiData = JSON.parse(jsonData);
            // const stocks = apiData.map(item => ({
            //     DATE: item.DATE,
            //     CLOSE: item.CLOSE
            // }));
            
            // const newWindow = window.open("", "_blank");
            // newWindow.document.title = "Stock Chart";
            // newWindow.document.body.innerHTML = "<div id='stock-chart-container'></div>";
            // ReactDOM.render(<StockChart stocks={stocks} />, newWindow.document.getElementById('stock-chart-container'));
        } 
        catch(error) {
            console.log('Error ', error);
            setError(error.message); // Set error state for displaying error messages
        }
    };

    return (
        <div>
            <a href="#_" className="relative inline-flex items-center justify-start px-8 py-4 overflow-hidden font-medium transition-all bg-green-500 rounded-xl group ml-4" onClick={handleClickOpen}>
                <span className="absolute top-0 right-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-5 group-hover:-mt-5">
                    <span className="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-green-600 rounded-2xl group-hover:mb-16 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left font-bold text-white transition-colors duration-200 ease-in-out group-hover:text-white ">Get Chart!</span>
            </a>
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
                        <h2 className="text-2xl font-bold mb-4">Buy Date (YYYYMMDD)</h2>
                        <input
                            type="text"
                            onChange={(e) => setBuyDate(e.target.value)}
                            aria-describedby="helper-text-explanation"
                            className="block w-full p-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg mb-4"
                            required
                        />
                        
                        <div className="flex justify-end">
                            <a href="#_" onClick={handleSubmit} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-700 group-hover:translate-x-0 ease">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Get Chart!</span>
                                <span className="relative invisible">Add Stock</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {stocksData && <StockChart stocks={stocksData} />}
        </div>
    );
};

export default CustomDialog;
