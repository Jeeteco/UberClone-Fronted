import React, { useState } from 'react'
import img1 from "../assets/loginSidepic.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const backend = import.meta.env.VITE_BACKEND_URL;

const RegisterPage = () => {
    const Navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullName] = useState('')
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState();

    const handleSubmit = async (event) => {



        event.preventDefault();
        try {
            const url = `${backend}/auth/register`;
            const full_name = fullname;
            const phone_number = phone
            const user = { full_name, email, password, phone_number, role };

            const res = await axios.post(url, user);

            console.log(res)

            // const { access_token } = res.data.session;
            // localStorage.setItem("access_token", access_token);

            // localStorage.setItem("userId", res.data.user.id);

            alert(" Verify Your Email  then log in ");
            Navigate('/Login');

        } catch (error) {
            console.error(error.message);


        }






    }

    return (
        <div className=' w-screen h-screen  p-2 flex  flex-wrap justify-center bg-cover bg-center shadow-3xl bg-gradient-to-l  from-gray-500/10 via-blue-500/10 to-pink-500/10 ' style={{ backgroundImage: `url(${img1})` }}>

            <div className='w-full h-fit '>

                <h1 className=' flex   justify-start text-4xl text-white/100 font-extrabold  '>
                    <span onClick={()=>{Navigate("/")}}>RATHI</span>
                </h1>
            </div>
            <div className='flex flex-wrap bg-white/80 
             justify-between w-6/10 h-7/10 p-2  rounded-2xl shadow-2xl'>

                <div className="text-center pt-2 w-full">
                    <h1 className="text-3xl shadow-xl font-extrabold text-green-900">Welcome| Join Us </h1>

                </div>
                <div className=' w-1/2 h-9/10 p-2 rounded-xl'>
                    <img src={img1} alt="" className='m-1 mt-2 w-full h-full rounded-xl' />
                </div>
                <div className=' w-1/2 h-8/10 p-2'>
                    <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
                        <h1 className="text-2xl m-1  font-bold text-green-900">Register Here</h1>


                        <div>

                            <input
                                id='fullname'
                                name='fullname'
                                type='text'
                                placeholder='Enter your Name'
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                className=" mt-0 m-1 bg-white/50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

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
                                className="m-1 bg-white/50 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

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
                                className="m-1  bg-white/50  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"

                                placeholder='enter your mobilenummber'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="m-1  bg-white/50  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <select
                                name="role"
                                id="role" 
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Select Your Role"
                                className="m-1  bg-white/50  block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                            >    
                              <option value="">Select Your Role</option>
                                <option value="rider">Rider</option>
                                <option value="driver">Driver</option>
                            </select>


                        </div>




                        <div>
                            <button
                                type="submit"

                                className="w-full m-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className='flex justify-between ml-1'>
                            <p className='text-l font-semibold'>
                                Already Register?{' '}
                                <Link to="/login" className='font-bold text-blue-800 hover:underline'>
                                    Sign In
                                </Link>
                            </p>

                        </div>

                    </form>


                </div>

            </div>

        </div>
    )
}

export default RegisterPage