import React from 'react'
import Navbar from './components/Navbar'
import InfoCont from './components/InfoCont'

function Information() {
  return (
    <>
    <div className='grid grid-rows-6 bg-gray-200 h-screen'>
        <div className='row-span-1 m-0 p-0'><Navbar/></div>
        <div className='row-span-5'><InfoCont/></div>
    </div>
    </>
  )
}

export default Information