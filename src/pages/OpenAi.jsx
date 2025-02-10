import React, { useEffect, useState } from 'react'
import { useFileHandler, useInputValidation } from "6pp"
import { useOpenai4oMutation, useOpenaiminiMutation, useQueDividerMutation } from '../redux/api/api'
import { useAsyncMutation } from '../hooks/hooks'

const OpenAi = () => {

  const text = useInputValidation(``)

  const [sendToDivider, isLoading, data] = useAsyncMutation(useQueDividerMutation)
  const [base64String, setBase64String] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {

      const base64 = reader.result.split(',')[1];
      
      if(base64){
        setBase64String(base64);
      }else{
        setBase64String(" ");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('text', text.value)
    formData.append('subject', 'Mathematics')
    formData.append('base64String', base64String)

    await sendToDivider('Sending text to OpenAI...', formData)
  }

  useEffect(() => {
    console.log(data)
  }, [data]);

  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <input className='p-2 border' value={text.value} onChange={text.changeHandler} placeholder="Enter your text here" />
        <label htmlFor='filer' className="border p-2 cursor-pointer my-2">
          Upload
          <input id='filer' className="hidden absolute" type="file" onChange={handleFileChange}/>
        </label>
        <button className='border m-2' type="submit">Submit</button>
      </form>

      <div className='mt-2'>
        {isLoading && <p>Loading...</p>}
        {/* {data && <p>{JSON.parse(data.result)}</p>} */}
      </div>
    </div>
  )
}

export default OpenAi