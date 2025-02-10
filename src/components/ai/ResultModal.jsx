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

const ResultModal = ({preview, isOpen, onClose, loading, data}) => {

  useEffect(() => {
    if(data === 'error'){
      onClose();
      toast.error('Something went wrong. Please try again.');
    }
  }, [data])

  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose} size={'full'} scrollBehavior='outside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>AI Answer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {loading ? (<Loader/>) : (
                    <>
                    {preview && <img src={preview} alt='preview' className='h-28 rounded-lg shadow-lg mb-8'/>}
                      <MathJaxContext>
                        <MathJax>
                          {data?.result}
                          {/* {"\\(\\frac{10}{4x} \\approx 2^{12}\\)"} */}
                        </MathJax>
                      </MathJaxContext>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        I got it.
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}



export default ResultModal