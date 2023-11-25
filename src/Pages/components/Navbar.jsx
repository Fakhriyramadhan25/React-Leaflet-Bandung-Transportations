import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (


<nav className="bg-gray-200 mt-2">
  <div className="2xl:max-w-screen-xl xl:max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse">
        <img src="./spade.png" className="h-12" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-bold whitespace-nowrap text-blue-700">Spatially Design</span>
    </Link>
    
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="text-xl font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
        <li>
          
          <Link to="/information" className="block px-3 text-gray-900 font-semibold rounded-full hover:text-blue-700 hover:bg-white">
          Documentation
          </Link>
        </li>
        <li>
          <Link to="/maps" className="block px-3 text-gray-900 font-semibold rounded-full hover:text-blue-700 hover:bg-white">
            Maps
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


  )
}

export default Navbar