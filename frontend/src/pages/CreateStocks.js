import React from 'react'

const CreateStocks = () => {
    return (
        <div className='border border-orange-700 w-1/2 h-1/2 m-auto mt-48 max-w-96 min-h-96 rounded-3xl bg-gradient-to-r from-blue-400 to-fuchsia-500 hover:shadow-2xl'>
            <div className='center justify-center text-center rounded'>

                <h2 className='bold text-orange-700 text-4xl underline decoration-4 mb-8 mt-6'>Stock symbol: </h2>
            </div>
            <select
                className="bg-gray-50 border border-gray-300 text-cyan-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-w-40 ml-auto mr-auto mt-4 mb-6">
                <option selected>SYMBOLS</option>
                <option value="US">SYZLON</option>
                <option value="CA">IREDA</option>
                <option value="FR">RELIANCE</option>
                <option value="DE">LICL</option>
            </select>
            <div className='center justify-center text-center '>
                <h2 className='bold text-orange-700 text-4xl underline decoration-4 mb-8'>Quantity: </h2>
                <input
                    type="number"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-w-40 ml-auto mr-auto mt-4 mb-6"
                    required
                />
                <a href="#_" class="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                    <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span class="relative">Add!</span>
                </a>
            </div>
        </div>
    );
};


export default CreateStocks