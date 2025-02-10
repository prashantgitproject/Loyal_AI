import React from 'react'

const Examples = ({setPreview, setText, setBase64String}) => {

    const convertImageToBase64 = async (imagePath) => {
        try {
          const response = await fetch(imagePath);
          const blob = await response.blob();
      
          const reader = new FileReader();
          reader.readAsDataURL(blob);
      
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result); // Base64 string
            };
          });
        } catch (error) {
          console.error("Error converting image to Base64:", error);
        }
      };


      const handleSubmit = async (imagePath, question) => {
        const base64String = await convertImageToBase64(imagePath);
        setBase64String(base64String.split(',')[1]);
        setPreview(imagePath);
        setText(question);
      };

  return (
    <div className='w-[60vw] mx-auto mt-8'>
        <h2 className='font-semibold text-lg mb-2'>Try Examples</h2>
        <div className='flex flex-col md:flex-row justify-around items-center'>
            <div onClick={() => handleSubmit("/gauss_law.png", "Explain Gauss Law and Solve This Question.")} className='border border-gray-800 shadow-md hover:bg-gray-100 transition-all duration-300 cursor-pointer p-4 rounded-lg'>
                <h4 className='font-semibold text-md'>Explain Gauss Law and Solve This Question.</h4>
                <div className='flex justify-center items-center'>
                    <img className='rounded-lg shadow-md h-[5rem]' src="/gauss_law.png" alt="que" />
                </div>
            </div>

            <div onClick={() => handleSubmit("/integration.png", "Solve this Calculus Question.")} className='border border-gray-800 shadow-md hover:bg-gray-100 transition-all duration-300 cursor-pointer p-4 rounded-lg'>
                <h4 className='font-semibold text-md'>Solve this Calculus Question.</h4>
                <div className='flex justify-center items-center'>
                    <img className='rounded-lg shadow-md h-[5rem]' src="/integration.png" alt="que" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Examples