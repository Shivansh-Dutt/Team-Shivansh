import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Import the CSS file that contains Tailwin
import App from './App.jsx'
import {Toaster} from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster/>
  </StrictMode>,
)
