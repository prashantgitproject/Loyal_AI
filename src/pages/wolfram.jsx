import { useInputValidation } from '6pp'
import React, { useEffect, useState } from 'react'
import { useAsyncMutation } from '../hooks/hooks'
import { useWolframMutation } from '../redux/api/api'

const wolfram = () => {

  const text = useInputValidation(``)

  const [sendToWolfram, isLoading, data] = useAsyncMutation(useWolframMutation)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const encodedText = encodeURIComponent(text.value)
        console.log(encodedText);

        const formData = new FormData()
        formData.append('text', encodedText)

        await sendToWolfram('Sending text to Wolfram...', formData)
    }

    useEffect(() => {
        console.log(data)
    }, [data]);

  return (
    <div className='h-screen flex justify-center items-center gap-8 text-lg'>
        <div className=''>
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input placeholder='enter text' value={text.value} onChange={text.changeHandler} className='p-2 rounded-lg border-2 border-black' type="text" />
                <button type="submit" className='p-2 rounded-lg bg-blue-500 text-white'>Submit</button>
            </form>

            <div className='mt-4 p-2'>
                {isLoading && <p>Loading...</p>}
                {/* {data && <p>{JSON.stringify(data.result)}</p>} */}
            </div>
        </div>
    </div>
  )
}

export default wolfram