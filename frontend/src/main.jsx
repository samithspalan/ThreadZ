import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Spline from '@splinetool/react-spline';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <div className="spline-bg">
    <Spline scene="https://prod.spline.design/RuO17nBz2EIFAfjY/scene.splinecode" />
    </div> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
