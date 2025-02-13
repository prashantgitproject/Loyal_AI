import React from 'react'

const Switch = ({details, setDetails}) => {
  return (
    <div className='mt-4'>
        <div className='w-[90vw] md:w-[60vw] mx-auto flex justify-evenly items-center text-gray-500 font-semibold'>
            <button onClick={() => setDetails(false)} className={`p-2 border rounded-lg shadow-md ${details? '' : 'shadow-yellow-500'}`}>Full Ans</button>
            <button onClick={() => setDetails(true)} className={`p-2 border rounded-lg shadow-md ${details? 'shadow-yellow-500' : ''}`}>More</button>
        </div>
    </div>
  )
}

export default Switch