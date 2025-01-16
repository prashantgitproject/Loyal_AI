import React, { useEffect, useState } from 'react'
import { useTestQuery } from '../redux/api/api'

const Home = () => {

  const {data, isLoading} = useTestQuery()

  const text = data?.message || 'Loading...'

  return (
    <div className='h-screen flex justify-center items-center'>
      Here's the AI text: <br />
      {text}
    </div>
  )
}

export default Home