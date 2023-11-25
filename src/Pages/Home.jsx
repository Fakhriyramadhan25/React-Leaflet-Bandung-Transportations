import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';

function Home() {
  return (
    <>
    <div className='grid grid-rows-6 bg-gray-200 h-screen'>
        <div className='row-span-1 m-0 p-0'><Navbar/></div>
        <div className='row-span-5'> <Content/></div>
    </div>
    </>
  )
}

export default Home