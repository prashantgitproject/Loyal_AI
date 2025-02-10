import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FcCamera } from "react-icons/fc";
import { IoAttach } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import ResultModal from '../components/ai/ResultModal';
import { useOpenai4oMutation } from '../redux/api/api';
import { useAsyncMutation } from '../hooks/hooks';
import Camera from '../components/ai/Camera';
import Examples from '../components/ai/Examples';
import { GrClear } from "react-icons/gr";
import Video from '../components/ai/Video';

const AI = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isCamOpen, onOpen: onCamOpen, onClose: onCamClose } = useDisclosure()
  const [sendTo4o, isLoading, data] = useAsyncMutation(useOpenai4oMutation)
  
  const [text, setText] = useState('');
  const [base64String, setBase64String] = useState('');
  const [camUrl, setCamUrl] = useState('');
  const [preview, setPreview] = useState(null);


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
    PreviewImage();
  };


  
  const handleCam = () => {
    if(camUrl){
      const base64 = camUrl.split(',')[1];
      if(base64){
        setBase64String(base64);
      }
      setPreview(camUrl);
      onCamClose();
    }
  }


  const PreviewImage = () => {
    let file = document.getElementById("filer");
    if (file) {
      setPreview(URL.createObjectURL(file.files[0]));
    }
    setCamUrl(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    onOpen();
    const formData = new FormData()
    formData.append('text', text)
    formData.append('base64String', base64String)
    await sendTo4o('Sending text to OpenAI...', formData)
  }

  const handleClose = () => {
    onClose();
    setPreview(null);
    setCamUrl(null);
    setBase64String('');
    setText('');
  }


  return (
    <>
    <div className=''>
      <div className='flex justify-center items-center gap-2 mt-32'>
        <img className='w-[4.5rem] h-[3.5rem]' src="/favicon.ico" alt="icon" />
        <div>
          <TypeAnimation
          sequence={['Welcome to LoyalAI',

          ]}
            speed={3}
            wrapper='h1'
            repeat={1}
            style={{ fontSize: '2rem', textAlign: 'center', fontWeight: '500' }}
          />
        </div>
      </div>

      <div className='mt-16'>
        <form className='border border-1 border-gray-500 rounded-lg w-[60vw] mx-auto p-1'>
          
          <div className='flex justify-between items-start'>
            <textarea className='p-4 outline-none w-full h-[5rem]' placeholder='Type text..' value={text} onChange={e => setText(e.target.value)} type="text" />
            {preview && <img src={preview} alt="preview" className='shadow-md rounded-lg h-[4rem]'/>}
          </div>
          
          <div className='flex justify-between items-center mt-16'>
            <div className='flex gap-2 ms-2'>
              <label htmlFor='filer' className="p-1 border rounded-lg cursor-pointer">
                <abbr title="Upload"><IoAttach size={25} className='text-blue-500'/></abbr>
                <input id='filer' className="hidden absolute" type="file" onChange={handleFileChange}/>
              </label>
              <button type="button" onClick={onCamOpen} className='p-1 border rounded-lg'><abbr title="Snap"><FcCamera size={25}/></abbr></button>
            </div>
            <div className='me-2 flex justify-center items-center gap-1'>
              <button type="button" onClick={handleClose} className='p-1 rounded-lg border px-2 text-sm font-semibold flex gap-1 items-center'>Clear<GrClear size={20} className='text-red-500'/></button>
              <button type="submit" onClick={handleSubmit} className='p-1 rounded-lg border px-2 flex gap-1 items-center text-sm font-semibold'>Send <IoSend size={20} className='text-blue-500'/></button>
            </div>
          </div>
        </form>
      </div>

      <Examples setPreview={setPreview} setText={setText} setBase64String={setBase64String}/>
      <Video/>

      <div className='w-[60vw] mx-auto mt-32 mb-4'>
        <h2 className='text-center text-xl font-bold mb-2'>Why LoyalAI?</h2>
        <div className='flex justify-around items-center gap-4'>
          <div className='rounded-lg shadow-md p-8 border'>
            <h3 className='text-center text-lg font-semibold mb-2'>Get the Most Accurate Solution</h3>
            <p className='text-sm text-gray-500'>Mathos AI offers the most accurate math solutions across every level and topic—whether you’re solving algebra, calculus, quadratic equation, scientific notation, or anything in between. Our advanced AI model is 20% more accurate than ChatGPT and any other tool out there, giving you answers you can trust. No other math solver can match this level of precision!</p>
          </div>

          <div className='rounded-lg shadow-md p-8 border'>
            <h3 className='text-center text-lg font-semibold mb-2'>Learn from Your Personalized AI Tutor</h3>
            <p className='text-sm text-gray-500'>With Mathos AI is your own AI math tutor that really understands how you learn. Mathos AI can recognize your drawings and voice inputs, so whether you prefer to speak your problems or sketch them out, we’re here to help. Our tutor follows your pace and provides the most tailored guidance and explanations for each step of your work. This way, you can easily learn, digest, and understand complex math concepts without the struggle.</p>
          </div>
        </div>
      </div>

    </div>

    <ResultModal preview={preview} isOpen={isOpen} onClose={handleClose} loading={isLoading} data={data}/>
    <Camera isOpen={isCamOpen} onClose={onCamClose} camUrl={camUrl} setCamUrl={setCamUrl} handler={handleCam}/>
    </>
  )
}

export default AI