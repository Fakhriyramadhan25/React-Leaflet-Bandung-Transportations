import React, { useState } from 'react';
import { FaMapPin } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { Link } from 'react-router-dom';



const Result = (props) => {


  const calculateTime = (data) => {
    let timeJournal = 0;
    timeJournal = data/200;
    return timeJournal.toFixed(2);
}


    return(
        <div className='z-10 bg-white fixed top-0 left-0 w-1/4 h-screen transition-transform flex overflow-y-scroll'>

          <div className='z-20 top-0 left-0 fixed bg-gray-200 w-14 border-e-1 border-black h-screen '>
            <div onClick={props.cleardata}>
            <img src='./asset/delete.png' className='absolute left-2 top-32 h-10 p-2 z-20 rounded-lg bg-red-300 hover:bg-red-700' alt='information icon'/>
           
            </div>
            <Link to="/"> 
            <img src='./spade.png' className='max-h-14 p-2 absolute left-0 bottom-4 ' alt='bus icon'/>
            </Link>
          </div>
       

      
          <div className='grid grid-cols-5 '>
          <div></div>
          <div className='col-span-4 mt-6 space-y-2 me-2 '>

            <h2 className='text-text text-3xl font-bold'>Public Transportation</h2>

            <div>
              <p className='text text-xl font-medium'>{props.tArrival} minutes <span className='text-blue-700'> ({props.distance && props.distance} km) </span> </p>
              <p className='text text-sm'>the fastest route to </p>
              <p className='text text-md font-medium'>{props.routeData[props.routeData.length-1] == null  ? ("Jl. Bandung") : (props.routeData[props.routeData.length-1]).properties.name}</p>
            </div>


          {/* looping for all the data  */}
          {props.routeData == null ? null : props.routeData.sort((a, b) => a.properties.seq - b.properties.seq).map((pros, index)=>(
           
           <div className="p-2 border-2 border-gray-200 rounded-lg me-2" key={pros.properties.seq}>
           <h2 className='text-text text-lg'><span className='text-blue-700 font-semibold'>
             {index === 0 || index === props.routeData.length-1 ? (<FaMapPin className='max-h-14 inline'/>):(<GoDot className='max-h-14 inline'/>)}
             </span> {pros.properties.name === null ? ("Jl. Bandung") : (pros.properties.name)}
           </h2>
           <div className={`w-2 h-4 rounded-lg inline-block me-1`} style={{backgroundColor: pros.properties.trayekcolor}}></div> 
           <p className='text-text text-md inline-block'>Bus: {pros.properties.trayek} - {pros.properties.trayekname}</p>
           <p className='text-text text-sm text-gray-700'> {(pros.properties.distance *1000).toFixed(1)} meter - {(calculateTime(pros.properties.distance *1000))} min</p>
        </div>
          ))}

          </div>
          </div>
        </div>
    );
}

function LeftSide(props) {
    const [showTrans, setShowTrans] = useState(false);
    const expandHandle = ()=>{
        setShowTrans(!showTrans);
    }

  return (
    <>
    {showTrans ? <Result routeData={props.left} distance={props.distance} tArrival={props.tArrival} cleardata={props.cleardata}/>: null}
    <div className='fixed left-2 top-4 space-y-4 z-30'>
        <div className='rounded-lg bg-white hover:bg-blue-200' onClick={expandHandle}>
        <img src='./asset/bus.png' className='max-h-10 p-2' alt='bus icon'/>
        </div>
        <Link to="/information">
       <div className='rounded-lg bg-white hover:bg-blue-200 mt-4'>
        <img src='./asset/infoicon.png' className='h-10 p-2' alt='information icon'/>
       </div>
       </Link>
    </div>
    </>
  )
}

export default LeftSide