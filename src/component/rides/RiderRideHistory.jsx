import React, { useEffect, useState } from 'react'
import RiderSidebar from '../sidebar/RiderSidebar'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const backend = import.meta.env.VITE_BACKEND_URL;


const RiderRideHistory = () => {
    const [rides, setRides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleMyRides = async () => {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) {
                navigate('/login')
            }

            try {
                const userId = localStorage.getItem('userId')
                const res = await axios.get(`${backend}/rider/getRides/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                setRides(res.data.ride);

            } catch (error) {
                console.log(error.response.data.error);
                   navigate('/login');
                alert( error.response.data.error);
             
              
            }
        };
        handleMyRides()
    }, [navigate])

    return (
        <div className='w-full h-screen pt-1 flex flex-wrap justify-center bg-yellow-300/20'>

            <div className='w-full flex h-fit bg-gray-900/20   p-2  shadow-xl font-extrabold text-center'>
                <h1 className=' flex  justify-bottom ml-4  text-xl text-black/80  font-bold  '>
                    <span className='mt-2' onClick={() => { navigate('/') }}>RATHI</span>
                </h1>
                <div className='w-9/10 '>
                    <h1 className='text-blue-700 font-bold text-3xl'>My Rides</h1>
                </div>
            </div>

            <div className='w-full m-10 mt-9 flex justify-between'>
                <div className='w-15/100 shadow-2xl h-100vh rounded-xl'>
                    <RiderSidebar />
                </div>
                <div className='w-85/100 rounded-xl shadow-2xl shadow-reverse-md bg-yellow-300/10 p-6'>

                    <div className="h-full overflow-y-scroll  overflow-x-auto relative shadow-md sm:rounded-lg ">

                        <table className="w-full text-m text-left  text-gray-900">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300/40">
                                <tr>
                                    <th scope="col" className="py-3 px-6">No.</th>
                                    <th scope="col" className="py-3 px-6">Pickup</th>
                                    <th scope="col" className="py-3 px-6">DropOff</th>
                                    <th scope="col" className="py-3 px-6">Fare</th>
                                    <th scope="col" className="py-3 px-6">Status</th>
                                    <th scope="col" className="py-3 px-6">Completed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rides?.map((ride, index) => (
                                    <tr key={ride.id} className="bg-white/70 border-b hover:bg-gray-50">

                                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                                        <td className="py-4 px-6 ">{ride.pickup_location}</td>
                                        <td className="py-4 px-6 ">{ride.dropoff_location}</td>
                                        <td className="py-4 px-6">{ride.fare_estimate}</td>
                                        <td className="py-4 px-6">{ride.status}</td>
                                        <td className="py-4 px-6">{ride.completed_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiderRideHistory