import React from 'react'

const Video = () => {
  return (
    <div className='md:w-[60vw] w-[90vw] mx-auto mt-32 mb-8'>
        <div className='rounded-lg shadow-xl border p-2 md:p-8 flex flex-col md:flex-row gap-2 justify-around items-center'>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <h2 className='text-xl font-semibold'>How to use LoyalAI</h2>
                <div className='text-gray-500 flex flex-col gap-1'>
                    <p>Step 1: Type your math problem, or capture it by taking a screenshot or photo. Alternatively, use the 'formula' or 'voice' feature to input the problem.</p>
                    <p>Step 2: Drag, paste, or upload your photo into the solver area in the middle of the interface.</p>
                    <p>Step 3: Press the 'Solve' button to instantly get an accurate answer along with a step-by-step solution to your math problem.</p>
                </div>
            </div>
            <div className='border rounded-lg'>
                <img className='w-full md:w-[100vw] rounded-lg' src="/sample.gif" alt="video" />
            </div>
        </div>
    </div>
  )
}

export default Video