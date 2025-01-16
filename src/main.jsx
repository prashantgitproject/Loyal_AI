import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript, theme} from '@chakra-ui/react'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
            <main>
              <App /> 
            </main>
        </ChakraProvider> 
    </Provider>
  </React.StrictMode>,
)
