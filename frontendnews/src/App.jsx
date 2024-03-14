import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './component/header/Header'

function App() {
   const [user,setuser]=useState(false)
  return (
    <div>
      <Header user={user}  />
      <Outlet />
      
    </div>
  )
}

export default App