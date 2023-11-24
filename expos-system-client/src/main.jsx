import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';

import axios from 'axios';
import { ConfigContextProvider } from './context/ConfigContext.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

import './index.css'; 
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx';

axios.defaults.baseURL = import.meta.env.VITE_API || "/api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigContextProvider>
      <UserContextProvider>
        <App />
        <LoadingSpinner />
      </UserContextProvider>
    </ConfigContextProvider>
    <ToastContainer 
        theme='dark' 
        position='bottom-right'/>
  </React.StrictMode>,
)
