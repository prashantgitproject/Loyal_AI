import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './components/shared/Loader';
import { Toaster } from 'react-hot-toast';


const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const OpenAi = lazy(() => import('./pages/OpenAi'));
const Wolfram = lazy(() => import('./pages/wolfram'));
const AI = lazy(() => import('./pages/AI'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/openai" element={<OpenAi/>} />
          <Route path="/wolfram" element={<Wolfram/>} />
          <Route path="/ai" element={<AI/>} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
      <Toaster position=' bottom-center'/>
    </BrowserRouter>
  )
}

export default App