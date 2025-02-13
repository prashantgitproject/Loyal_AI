import React, { useEffect, useRef, useState } from 'react'
import {
    Box,
    Button,
    FormLabel,
    Grid,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
    Tooltip,
    VStack,
    useDisclosure,
  } from '@chakra-ui/react';
import Loader from '../shared/AiLoader';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import toast from 'react-hot-toast';
import Switch from './Switch';
import { GrClear } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { useAsyncMutation } from '../../hooks/hooks';
import { useOpenai4oMutation } from '../../redux/api/api';
import Questions from './Questions';

const ResultModal = ({preview, isOpen, onClose, loading, data1}) => {

  const [details, setDetails] = useState(false);
  const [doubt, setDoubt] = useState('');

  const [sendTo4o, isLoading, data] = useAsyncMutation(useOpenai4oMutation)

  useEffect(() => {
    if(data1 === 'error'){
      onClose();
      toast.error('Something went wrong. Please try again.');
    }
    if(data1){
      console.log(data1);
    }
  }, [data1])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(doubt){
      const formData = new FormData();
      formData.append('text', doubt);
      sendTo4o('Sending doubt...', formData);
    }else{
      toast.error('Please type something to send.');
    }
  }

  const OpenAIResponse = ({ response }) => {
    return (
      <div className='text-lg text-gray-600 my-8'>
        <h2 className='text-lg font-semibold underline pb-1'>Solution:</h2>
          {response.split("\n\n").map((step, index) => (
          <MathJaxContext key={index}>
              <MathJax>
                {step}
              </MathJax>
          </MathJaxContext>
          ))}
      </div>
    );
  };

  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose} size={'full'} scrollBehavior='outside'>
            <ModalOverlay />
            <ModalContent>
              {data1 && (
                <Switch details={details} setDetails={setDetails}/>
              )}
              <ModalCloseButton />
              {!details ? (
                <>
                <ModalBody className=''>
                  {loading ? (<Loader/>) : (
                    <>
                    {preview && <img src={preview} alt='preview' className='h-20 md:h-28 rounded-lg shadow-lg mb-8'/>}
                      <OpenAIResponse response={data1?.result?.mainResult}/>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="yellow" mr={3} onClick={() => setDetails(true)}>
                        Still not clear?
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        I got it.
                    </Button>
                </ModalFooter>
                </>
              ) : (
                <>
                <ModalBody className='flex flex-col items-center justify-center mt-8'>
                  {isLoading ? (<Loader/>) : (
                    <>
                    {data?.result && (
                      <OpenAIResponse response={data?.result}/>
                    )}
                    </>
                  )}
                  <h2 className='font-semibold text-lg mt-4 flex justify-start w-[90vw] md:w-[60vw]'>Any other related doubts?</h2>
                  <form onSubmit={handleSubmit} className='w-[90vw] md:w-[60vw] mx-auto'>
                    <textarea placeholder='type text..' value={doubt} onChange={e => setDoubt(e.target.value)} className='w-full h-52 md:h-30 p-4 pb-10 border mx-auto rounded-lg shadow-md md:text-lg outline-none' />
                    <div className='flex justify-end gap-2 -mt-10 pe-2 w-full '>
                      <button onClick={() => setDoubt('')} type="button" className='p-1 rounded-lg border px-2 text-sm font-semibold flex gap-1 items-center'>Clear<GrClear size={20} className='text-red-500'/></button>
                      <button type="submit" className='p-1 rounded-lg border px-2 flex gap-1 items-center text-sm font-semibold'>Send <IoSend size={20} className='text-blue-500'/></button>
                    </div>
                  </form>
                  <Questions questions={data1?.result?.doubts} setDoubt={setDoubt}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="yellow" mr={3} onClick={() => setDetails(false)}>
                        Full Solution
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        I got it.
                    </Button>
                </ModalFooter>
                </>
              )}
            </ModalContent>
        </Modal>
    </div>
  )
}



export default ResultModal