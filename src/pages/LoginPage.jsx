import React, { useState } from 'react'
import img1 from "../assets/loginSidepic.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const backend = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 

  



    const handleSubmit = async (event) => {



        event.preventDefault();
        try {
            const url = `${backend}/auth/login`;
            const user = { email, password };

            const res = await axios.post(url, user);

            // console.log(res)

            const  access_token = res.data.session.access_token;
           //Store acess_token in local storage
            localStorage.setItem("access_token", access_token);
           
            const userId=res.data.user.id
            //Store  user_Id in local storage
            localStorage.setItem("userId", userId);
            // console.log(access_token,userId)

            const roleRes = await axios.post(`${backend}/auth/getRole`, { email });
            const userRole = roleRes.data.role
            // store userRole in localstorage
            localStorage.setItem('userRole',userRole);
             
            // console.log(userRole);
            // console.log(roleRes.data);
            if(userRole === 'rider'){
                navigate("/riderDashboard")
               

                console.log("hlw Rider")
                return

            }
            if(userRole === 'driver'){
                navigate('/driverDashboard')
             
                console.log("Hlw Driver");
                return

            }
            alert("Logged in Sucessfully");
        } catch (error) {
            console.error(error.response.data.error);
            const err=error.response.data.error;
            
            if( err === 'Invalid login credentials')
            {
                alert(err);
                navigate('/register')

            }

                        
         
        }

    }

    return (
        <div className=' w-screen h-screen  p-2 flex  flex-wrap justify-center bg-cover bg-center  bg-gradient-to-l  from-gray-400/20 to-blue-400/20 ' style={{ backgroundImage: `url(${img1})` }}>

            <div className='w-full h-fit '>
                <h1 className=' flex   justify-start text-4xl text-white/100 font-extrabold  '>
                    <span onClick={() => { navigate("/") }}>RATHI</span>
                </h1>
            </div>
            <div className='flex flex-wrap
             justify-between w-6/10 h-5/10 p-2 bg-white/70  rounded-2xl shadow-4xl'>

                <div className="text-center pt-2 w-full">
                    <i>  <h1 className="text-xl font-semibold shadow-xl text-black-900 hover:text-yellow-600">Welcome back | <span className='text-blue-600/40 hover:text-blue-600'>Access your Account Again</span></h1></i>

                </div>
                <div className=' w-1/2 h-9/10 p-2 rounded-xl'>
                    <img src={img1} alt="" className='mt-1 w-full h-full rounded-xl' />
                </div>
                <div className=' w-1/2 h-8/10 p-2 mt-6 mb-6'>
                    <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
                        <h2 className="text-4xl font-bold text-gray-800"><u>Login Here</u></h2>


                        <div>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder='enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 bg-white/50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder='enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1  bg-white/50  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"

                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-l font-semibold'>
                                New user?{' '}
                                <Link to="/register" className='font-bold text-blue-800 hover:underline'>
                                    Sign Up
                                </Link>
                            </p>
                            <p className='text-l font-semibold'>

                                <Link to="/accountRecover" className='font-bold text-blue-800 hover:underline hover:text-green-800'>
                                    ForgotPassword
                                </Link>
                            </p>
                        </div>

                    </form>


                </div>

            </div>

        </div>
    )
}

export default LoginPage