import React from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from './component/navbar'
import Register from './pages/Register'
import Signin from './pages/signin';

const App = () => {
  return (
   <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
         <Route path="/Signin" element={<Signin />} />
      </Routes>
    </>  

  )
}

export default App
