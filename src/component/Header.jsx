import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate=useNavigate();
    return (
        <div>
            <div className='flex flex-wrap justify-end bg-blue-800/10 border-1 h-13 shadow-xl rounded-s m-4'>
                <div className='flex mt-4 h-fit bg-red-700  md:w-1/2 justify-evenly rounded-xl text-2xl mr-4 '>
                    <span onClick={() => { navigate("/") }}><u>Home</u></span>
                    <span onClick={() => { navigate("/Login") }}><u>Login</u></span>
                    <span onClick={() => { navigate("register") }}><u>Register</u></span>
                    <span onClick={() => { navigate("/") }}><u>Help</u></span>


                </div>
            </div>
        </div>
    )
}

export default Header