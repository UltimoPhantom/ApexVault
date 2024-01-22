import React from 'react'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='animate-ping w-20 h-20 mx-auto rounded-full bg-sky-700'></div>
      <p className='mt-8 text-gray-600 animate-fadeInOut'>Fetching live data...</p>
    </div>
  )
}

export default Spinner