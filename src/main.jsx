import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatBox from './components/Chatbot.jsx'
import Dashboard from './components/Dashboard.jsx'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,

    children: [
      {
       path:"/",
       element: <Dashboard />
      },
      {
        path:"/chatbot",
        element:(
            <ChatBox />
        )
      },
    ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ChatBox /> */}
    {/* <Dashboard /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
