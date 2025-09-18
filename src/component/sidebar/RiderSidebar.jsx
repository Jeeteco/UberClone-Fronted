import React from 'react'
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const RiderSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("access_token");
        alert("Logout Sucessfully")
        navigate("/login");
        window.location.reload();

    }
    return (
        <div className='w-full h-170 flex flex-wrap justify-center text-white mt-1  bg-white/20 rounded shadow-s '>
            <aside className="h-full w-9/10   p-2  flex flex-col ">
                <h1
                    onClick={() => navigate("/")}
                    className="text-3xl font-extrabold text-sky-600 cursor-pointer mb-2 mt-1"
                >
                    RATHI
                </h1>


                <nav className="flex flex-col  text-md  ">
                    <button
                        onClick={() => { navigate('/userProfile') }}
                        className="flex  items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-100 text-gray-700 font-semibold transition"
                    >

                        My Profile

                    </button>



                    <a
                        href='/riderDashboard'
                        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-100  text-gray-700 font-semibold transition"
                    >

                        Book Ride

                    </a>
                    <a
                        href='/liveRide'
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100  text-gray-700 font-semibold transition"
                    >

                        My Ride

                    </a>


                    <a
                        href='/RiderRideHistory'
                        className="flex items-center gap-1 px-3 py-2 rounded-lg   hover:bg-red-100 text-gray-700  font-semibold transition"
                    >

                        Ride History

                    </a>


                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-3 py-2   rounded-lg hover:bg-red-100 text-gray-700  font-semibold transition"
                    >
                        <LogOut className="text-red-500" size={18} />
                        logout

                    </button>
                </nav>
            </aside>
        </div>
    )
}

export default RiderSidebar