import React from 'react'
import { useNavigate } from 'react-router-dom'
import sidepic from "../assets/3658351.jpg"

const HomePage = () => {
  const navigate = useNavigate();

  const handleUser = async () => {
    const access_token = localStorage.getItem('access_token');
    const userRole=localStorage.getItem('userRole');

    if (!access_token) {
      navigate('/login')
       window.location.reload();
      
    }
    if (userRole === 'rider') {
      navigate("/riderDashboard")

      window.location.reload();
     alert("hlw Rider")
      return

    }
    if (userRole === 'driver') {
      navigate('/driverDashboard')
       window.location.reload();

     alert("Welcome Driver");
      return

    }

  }
  return (
    <div className=' md:w-screen  h-screen bg-black/100'>
      <div className='sticky top-0 z-10 flex flex-wrap justify-between bg-black text-white  h-11 shadow-xl '>
        <h1 className=' ml-4 mt-2  h-fit   md:w-fit justify-evenly font-bold rounded-xl text-2xl  '>RATHI</h1>
        <div className='flex mt-4 h-fit  md:w-3/10 justify-evenly rounded-xl text-l mr-4  '>
          <span className='hover:text-yellow-200 ' onClick={() => { navigate("/") }}>Home</span>
          <span className='hover:text-yellow-200 ' onClick={() => { navigate("/Login") }}>Login</span>
          {/* <span onClick={() => { navigate("/register") }}><u>Register</u></span> */}
          <span className='hover:text-yellow-200 ' onClick={() => { navigate("/") }}>UseGuide</span>


        </div>
      </div>
      <div className='md:w-full flex flex-wrap justify-between   bg-red-200/100 h-94/100 border-5  p-4 flex flex-wrap justify-centre  ' style={{ backgroundImage: `url(${sidepic})` }}>

        <div className='md:w-4/10  m-4  flex flex-wrap justify-center    rounded-xl shadow-2xl '>
          <h1 className=' mt-10   font-bold text-5xl  ' >👋Welcome to🚔</h1>
          <h1 className='mt-10 m-6   font-bold text-4xl  '> <i>" सबसे तेज़ (fastest) & <br /> <span className='ml-40'>सुरक्षित (Secure)</span> <br /> <span className='ml-50' >way to your </span> <span className='ml-60'>next destination"  </span><button onClick={handleUser} className='ml-90 mt-8 bg-yellow-600 hover:bg-yellow-400 p-2 rounded-xl text-xl'>Use Now</button></i></h1>

          {/* <h1 className='m-4  font-bold text-4xl text-gradient-to-l from-red-400 to-blue-800'> <i>"सबसे तेज़ <br /> <span className='ml-25' >तरीका </span> <br /><span className='ml-30'> आपकी अगली मंज़िल तक"  </span><button onClick={()=>{navigate("/login")}} className='ml-70 mt-8 bg-yellow-600 hover:bg-yellow-400 p-2 rounded-xl text-xl'>आइए </button></i></h1>
       
         आपकी अगली मंज़िल तक पहुँचने का सबसे तेज़ तरीका।" */}



        </div>

        <div className='md:w-4/10  m-4  flex flex-wrap justify-center    rounded-xl shadow-2xl  '  >
          <img src={sidepic} className='rounded-xl shadow-xl w-9/10  ' alt="loading" />
        </div>


      </div>
    </div>
  )
}

export default HomePage