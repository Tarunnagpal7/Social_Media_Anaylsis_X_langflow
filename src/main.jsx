import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatBox from './components/Chatbot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatBox />
  </StrictMode>,
)