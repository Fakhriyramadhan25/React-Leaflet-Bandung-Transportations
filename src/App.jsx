import React from 'react';
import Maps from './Pages/Maps';
import { Routes, Route } from 'react-router-dom';
import Information from './Pages/Information';
import Home from './Pages/Home';

function App() {


  return (
    <>

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/maps' element={<Maps/>}/>
    <Route path='/information' element={<Information/>}/>
    </Routes>

    </>
  )
}

export default App
