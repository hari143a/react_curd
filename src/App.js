import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './Pages/Registration'
import Home from './Pages/Home/index.jsx'
import Update from './Pages/Update/index.jsx'
import View from './Pages/View/index.jsx'

export default function App() {
  return (
    <>
      {/* <Registration/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} /> {/* 👈 Renders at /app/ */}
          <Route path='/registration' element={<Registration />} />
          <Route path='/update/:id' Component={Update} element={<Update />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
