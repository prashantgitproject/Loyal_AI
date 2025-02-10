import { TypeAnimation } from "react-type-animation"

const Loader = () => {
    return (
        <div className='h-[90vh] flex flex-col justify-center items-center z-10'>
        <img className='w-[15rem] h-[15rem]' src="/robot.gif" alt="AI" />
        <TypeAnimation
          sequence={['Processing your query...',
            4000,
            'AI is thinking...',
            6000,
            'Generating results from our AI...',
            5000,
            'AI is thinking...',
            6000,
            'Generating results from our AI...',
            5000,
            'AI is thinking...',
            6000,
            'Generating results from our AI...',
            5000,
            'AI is thinking...',
            6000,
          ]}
            speed={40}
            wrapper='span'
            repeat={Infinity}
            style={{ textAlign: 'center', marginTop: '10px' }}
          />
      </div>
    )
  }

export default Loader