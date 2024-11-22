// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ChatProvider from './Context/ChatProvider';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <Provider store={store}>
          <ChakraProvider value={defaultSystem}> 
            <App />
          </ChakraProvider>
        </Provider>
       </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
