import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const backend=import.meta.env.VITE_BACKEND_URL;

const RecoverPasswordPage = () => {
    const Navigate = useNavigate();

    const [email, setEmail] = useState('')
  

    const handleSubmit = async (event) => {



        event.preventDefault();
        try {
            const url = `${backend}/auth/forgotPassword`;
            const user = { email};

            const res = await axios.post(url, user);

            console.log(res)

           

          alert(`mail sent on ${email}`);
``
        } catch (error) {
            console.error(error.message);
            alert(error.message);
          


        }






    }

    return (
        <div className=' w-screen h-screen  p-2 flex  flex-wrap justify-center bg-white   '>

            <div className='w-full h-fit '>
               </div>
            <div className='flex flex-wrap
             justify-center w-fit h-fit p-2 m-6 mt-0  rounded-2xl shadow-2xl'>

             
                <div className=' h-8/10 p-2'>
                 <h1 className=' flex   justify-center text-2xl font-bold hover:text-blue-900 '>Recover password</h1>
                    <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
                       
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
                                className="mt-1 bg-white/50 block w-200 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>




                        <div>
                            <button
                                type="submit"

                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Send Link
                            </button>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-l font-semibold'>

                                <Link to="/login" className='font-bold text-blue-800 hover:underline'>
                                    Back
                                </Link>
                            </p>

                        </div>

                    </form>


                </div>

            </div>

        </div>
    )
}

export default RecoverPasswordPage