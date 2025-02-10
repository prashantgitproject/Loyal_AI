import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { MdOutlineCamera } from "react-icons/md";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';


const videoConstraints = {
    width: 1070,
    facingMode: "environment"
}

const Camera = ({camUrl, setCamUrl, isOpen, onClose, handler}) => {

    const webCamRef = useRef(null)
    const [isCaptured, setIsCaptured] = useState(false)

    const capture = useCallback(async () => {
        const imageSrc = webCamRef.current.getScreenshot()
        setCamUrl(imageSrc)
        setIsCaptured(true)
    }, [webCamRef])

    const onUserMedia = (e) => {
        console.log('onUserMedia', e);
    }

    const Submit = () => {
      setIsCaptured(false)
        handler()
    }

    console.log(camUrl);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay/>
        <ModalContent>
          {!isCaptured ? (
            <>
            <ModalHeader>Upload</ModalHeader>
            <ModalCloseButton className='border-2 border-gray-400 rounded-lg'/>
            <ModalBody>
            <div className='flex justify-center items-center'>
              <Webcam className='rounded-lg' ref={webCamRef} audio={false} screenshotFormat={'image/jpeg' || 'image/png'} videoConstraints={videoConstraints} onUserMedia={onUserMedia} mirrored={false} screenshotQuality={1}/>
            </div>
            <div className='flex flex-col justify-center items-center mt-5'>
              <p className='text-gray-400 font-semibold text-[0.75rem] mb-1'>Click</p>
              <button className='' onClick={capture}><MdOutlineCamera size={50} className='bg-gray-950 text-gray-300 rounded-full p-1 hover:bg-gray-800 '/></button>
            </div>
              
            </ModalBody>
            </>
          ) : (
            <>
            <ModalHeader>Check</ModalHeader>
            <ModalBody>
              <div className='flex justify-center items-center'>
                <img src={camUrl} alt='captured' className='rounded-lg'/>
              </div>
              <div className='flex justify-between md:justify-center md:gap-8 items-center mt-4'>
                <button onClick={() => {setIsCaptured(false), setCamUrl(null)}} className='p-2 font-semibold bg-gray-300 text-gray-950 rounded-lg'>Retake</button>
                <button onClick={Submit} className='p-2 font-semibold bg-gray-950 text-gray-300 rounded-lg'>Proceed</button>
              </div>
            </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Camera