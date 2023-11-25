import React from 'react'
import { Link } from 'react-router-dom'

function Content() {
  return (
    <>
    <div className='grid grid-cols-4 mt-4'>
        <div className='col-span-2 mt-36'>
            <div className='grid grid-cols-6 '>
            <div className='col-span-2 xl:cols-span-1'></div>
            <div className='col-span-4 space-y-4'>
              <div className=' z-10 bg-blue-300 rounded-lg absolute h-36 w-1/3 opacity-60'>
                </div>
                <h1 className='z-20 text-7xl font-bold relative ms-4 text-gray-800'>Angkutan Kota Bandung</h1>
                <p className='z-30 me-32 ms-6 text-lg'>Shortest Path routing for public transportation in Bandung City, Indonesia.</p>
                <Link to="/maps" className='mt-3 rounded-full text-xl font-bold flex bg-white px-2 w-40 justify-center ms-6 hover:text-white hover:bg-blue-700 py-2'>
                <p>Let's begin</p>
                </Link>
            </div>
            </div>
        </div>


        <div>
        <img src='./asset/transPhoto.png' className='rounded-xl h-3/4 fixed'/>
        </div>
    </div>

    </>
  )
}

export default Content