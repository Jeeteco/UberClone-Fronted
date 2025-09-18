import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage.jsx'
import Register from './pages/RegisterPage'
import Home from './pages/HomePage'
import Driver from './context/DriverDashboard.jsx'
import Rider from './context/RiderDashboard.jsx'
import Recovery from './pages/RecoverPasswordPage.jsx'
// import RouteFinder from './component/RouteFinder.jsx'
//import RiderSidebar from './component/sidebar/RiderSidebar.jsx'

import RiderRideHistory from './component/rides/RiderRidehistory.jsx'
import DriverRideHistory from './component/rides/DriverRideHistory.jsx'
import TraceRide from './component/rides/TraceRide.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

import Payment from './component/payments/PaymentForm.jsx'
import MyRide from './component/rides/MyRide.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/driverDashboard' element={<Driver />} />
          <Route path='/accountRecover' element={<Recovery />} />
          <Route path='/riderDashboard' element={<Rider />} />
          {/* <Route path='/RouteFinder' element={<RouteFinder/>}/> */}
          {/* <Route path='/riderSidebar' element={<RiderSidebar/>} /> */}
          <Route path='/userProfile' element={<ProfilePage />} />
          <Route path='/RiderRideHistory' element={<RiderRideHistory />} />
          <Route path='/DriverRideHistory' element={<DriverRideHistory />} />\
          <Route path='/payments' element={<Payment/>} />
          <Route path='/liveRide' element={<MyRide/>} />
           <Route path='/OngoingRide' element={<TraceRide/>} />





        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
