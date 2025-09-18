import React from 'react'
import RiderSidebar from '../component/sidebar/RiderSidebar'

import RouteFinder from '../component/RouteFinder'
import { useNavigate } from 'react-router-dom'

const RiderDashboard = () => {
  const navigate=useNavigate();
  return (
    <div className=' w-full h-screen pt-1   flex flex-wrap justify-center bg-yellow-300/20'>

      <div className='w-full flex h-fit bg-gray-900/20   p-2  shadow-xl font-extrabold text-center'>
        <h1 className=' flex  justify-bottom ml-4  text-xl text-black/80  font-bold  '>
          <span className='mt-2' onClick={() => { navigate('/') }}>RATHI</span>
        </h1>
        <div className='w-9/10 '>
         <h1 className='text-blue-700 font-bold text-3xl'>Rider DashBoard</h1>
         </div>
      </div>

      <div className='w-full  m-10 mt-9   flex justify-between  '>
        <div className='w-15/100   shadow-2xl shadow-reverse-md h-100vh  rounded-xl '>
          <RiderSidebar />
        </div>
        <div className='w-85/100 rounded-xl shadow-2xl shadow-reverse-md bg-yellow-300/10'>
          <RouteFinder />
        </div>
      </div>
    </div>
  )
}

export default RiderDashboard