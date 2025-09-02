import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QuakeList from './QuakeList.jsx'
import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <QuakeList/>
  </StrictMode>
)
