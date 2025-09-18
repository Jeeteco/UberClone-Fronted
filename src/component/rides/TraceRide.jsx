import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DriverSidebar from '../sidebar/DriverSideBar';
import RiderSidebar from '../sidebar/RiderSidebar';
const backend = import.meta.env.VITE_BACKEND_URL;


const MyRide = () => {
    const [rides, setRides] = useState([]);
    const navigate = useNavigate();

    // const startRide = async (rideId) => {
    //     const access_token = localStorage.getItem('access_token');
    //     // console.log(access_token);
    //     if (!access_token) {
    //         navigate('/login');
    //         return

    //     }

    //     try {



    //         const res = await axios.post(
    //             `${backend}/driver/startRide/${rideId}`,
    //             {},
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${access_token}`
    //                 }
    //             }
    //         );

    //         setRides(res.data.ride);
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //         alert(error.response.data.error);
    //     }
    // };




    useEffect(() => {
        const fetchMyRides = async () => {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) {
                navigate('/login');
                return;
            }
            console.log(access_token);
            
            const userId=localStorage.getItem('userId')

            try {
                const res = await axios.get(`${backend}/rider/getLiveRide/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    }
                )
                const rideId = res.data.data[0].id;
                // console.log("Ride ID:", rideId);
                localStorage.setItem("liveId",rideId)
                console.log(res.data.data);
                setRides(res.data.data);

            } catch (error) {
                console.log(error);
                navigate('/login');
                alert(error.response?.data?.error || "Something went wrong");
            }
        };

        fetchMyRides()
       
    }, [])

    return (
        <div className='w-full h-screen pt-1 flex flex-wrap justify-center bg-yellow-300/20'>

            <div className='w-full flex h-fit bg-gray-900/20   p-2  shadow-xl font-extrabold text-center'>
                <h1 className=' flex  justify-bottom ml-4  text-xl text-black/80  font-bold  '>
                    <span className='mt-2' onClick={() => { navigate('/') }}>RATHI</span>
                </h1>
                <div className='w-9/10 '>
                    <h1 className='text-blue-700 font-bold text-3xl'>OnGoing Ride </h1>
                </div>
            </div>
            <div className='w-full m-10 mt-9 flex justify-between'>
                <div className='w-15/100 shadow-2xl h-100vh rounded-xl'>
                    <DriverSidebar />
                </div>
                <div className='w-85/100 rounded-xl shadow-2xl shadow-reverse-md bg-yellow-300/10 p-2'>

                    <div className="h-full overflow-y-scroll overflow-x-auto relative shadow-md sm:rounded-lg">

                        <table className="w-full text-m text-left text-gray-900 bg-blue-400/50">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300/40">
                                <tr>

                                    <th scope="col" className="py-3 px-4">Pickup</th>
                                    <th scope="col" className="py-3 px-4">DropOff</th>
                                    <th scope="col" className="py-3 px-4">Fare</th>
                                    <th scope="col" className="py-3 px-4">Status</th>
                                    <th scope="col" className="py-3 px-4">Started At</th>
                                    <th scope="col" className="py-3 px-4">Start Ride</th>
                                    <th scope="col" className="py-3 px-4">Complete Ride</th>

                                </tr>
                            </thead>
                            <tbody>
                                {rides?.map((ride) => (
                                    <tr key={ride.id} className="bg-white/70 border-b hover:bg-gray-50">


                                        <td className="py-4 px-4 ">{ride.pickup_location}</td>
                                        <td className="py-4 px-4 ">{ride.dropoff_location}</td>
                                        <td className="py-4 px-4">{ride.fare_estimate}</td>
                                        <td className="py-4 px-4">{ride.status}</td>
                                        <td className="py-4 px-4">{ride.created_at}</td>
                                        <td className="py-4 px-4">
                                            <button onClick={() => startRide(ride.id)} className='px-3  py-2 bg-indigo-500/90 text-white/90 rounded-xl'>
                                                Pick
                                            </button>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className='px-3  py-2 bg-red-500/90 text-white/90 rounded-xl'>
                                                Drop
                                            </button>
                                        </td>
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

export default MyRide