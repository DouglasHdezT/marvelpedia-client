import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import ContextWrapper from './contexts/ContextWrapper.jsx'

import axios from 'axios'
import LoadingSpinner from './layouts/LoadingSpinner/LoadingSpinner.jsx'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "https://marvelpedia-webservice-production.up.railway.app/marvelpedia/api/"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextWrapper>
      <App />
      <LoadingSpinner/>
    </ContextWrapper>
  </StrictMode>,
)