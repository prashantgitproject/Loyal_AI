import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";

const Questions = ({questions}) => {

  return (
    <div className='flex flex-col gap-4 w-[85vw] md:w-[50vw] mx-auto mt-8'>
        {questions && Object.entries(questions).map(([key, value]) => (
            <Question key={key} que={{doubt: key, solution: value}}/>
        ))}
    </div>
  )
}

const Question = ({que}) => {

    const [show, setShow] = useState(false)

    return (
        <div onClick={() => setShow(!show)} className={`cursor-pointer shadow-md border ${show? 'border-yellow-500': ''} rounded-lg p-8 transition-all duration-300`}>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-semibold'>
                    <MathJaxContext>
                        <MathJax>
                            {que?.doubt}
                        </MathJax>
                    </MathJaxContext>
                </p>
                <button  className={`transition-all duration-700 ${show? 'rotate-180 text-yellow-500' : ''}`}><FaChevronDown/></button>
            </div>
            <p className='text-gray-600 pt-2'>
                <MathJaxContext>
                    <MathJax>
                        {show && que?.solution}
                    </MathJax>
                </MathJaxContext>
            </p>
        </div>
    )
}

export default Questions