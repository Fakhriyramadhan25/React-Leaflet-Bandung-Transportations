import React, { useState } from 'react';
import { TbMapSearch } from "react-icons/tb";


function InfoCont() {
    const [infoActive, setInfoActive] = useState(true);

    const butHandle = () => {
        setInfoActive(true);
    }

    const metaHandle = ()=>{
        setInfoActive(false);
    }

  return (
    <div className='grid grid-cols-6'>
        <div></div>
        <div className='col-span-4 mt-10 '>
      
            <div className='bg-blue-200 p-8 rounded-xl h-96 space-y-8 '>
                <div className='grid grid-cols-12'>
                <div className='rounded-full bg-white h-7 px-4 w-44 justify-center text-center'>
                <h1 className='text-text text-md font-semibold'> Documentation</h1>
                </div>
                <div className='col-span-10'></div>
                <div >
                <div className='rounded-full bg-white p-2 w-12 justify-center'><TbMapSearch size={28}/></div>
                </div>
                </div>

                
                <div className='grid grid-cols-2 gap-x-6 mx-4'>
                
                <div className='rounded-xl'>
         
                {infoActive === true ? 
                 (<>
                 <h2 className='text-3xl font-semibold mb-2'>Tutorial</h2>
                 <ol>
                     <li>1. Open the map feature</li>
                     <li>2. Drag the black pin to the standing point</li>
                     <li>3. Click the destination by clicking the maps</li>
                     <li>4. The red pin will appear along side the route</li>
                     <li>5. Open the left sidebar by clicking the bus icon</li>
                     <li>6. Delete route by cliking the the cross red button</li>
                 </ol>
                 </>):(<>
                <h2 className='text-3xl font-semibold mb-2'>Metadata</h2>
                 <ol>
                     <li>Source data: Overpassturbo from OSM</li>
                     <li>Routing Algorithm: Pgrouting Dijkstra</li>
                     <li>Public Transport data: 20 Random Route</li>
                     <li>Assumption: 200 meters/minutes</li>
                     <li>Algorithm Weakness: waive one-way road & dead-ends</li>
                     <li className='invisible'>test</li>
                 </ol>
                 </>
                 )
                }
               
                    <button className='hover:bg-blue-400 rounded-full bg-white p-1 mt-6 w-8 me-2 font-bold bg-blue-800 text-white focus:bg-blue-500 focus:outline-none focus:ring focus:ring-violet-300' onClick={butHandle}>1</button>
                    <button className='hover:bg-blue-400 rounded-full bg-white p-1 mt-6 w-8 me-4 font-bold bg-blue-800 text-white focus:bg-blue-500 focus:outline-none focus:ring focus:ring-violet-300' onClick={metaHandle}>2</button>
                </div>
                <div>
                    <img src='./asset/stopbus.png' className='rounded-lg'/>
                </div>
   
             
                </div>
                
            </div>

        </div>
        <div></div>
    </div>
  )
}

export default InfoCont