
import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-200 '>
     <div className='w-full block'>
       <main>
          <Outlet />
       </main>
      </div> 
    </div>
  )
  
};

export default App