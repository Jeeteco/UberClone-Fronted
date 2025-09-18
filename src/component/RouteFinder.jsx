import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { useNavigate } from "react-router-dom";

function RouteFinder() {
  const [pickup_location, setpickup_location] = useState("");
  const [dropoff_location, setdropoff_location] = useState("");
  const [showRoute, setShowRoute] = useState(false);

  const handleShowRoute = () => setShowRoute(true);
  const Navigate=useNavigate();

  return (
    <div className="w-full h-70vh  pt-4 pb-3   flex flex-wrap justify-center bg-gray-200/20  space-y-6">
      

      <div className=" w-full    flex justify-evenly">

        <div className="w-25/100 h-fit p-2 flex flex-wrap jusitfy-center p-4 bg-white/60 shadow-2xl rounded-2xl">
          <h1 className="text-2xl font-bold text-center">🚗  Ride Route </h1>


          <div className="w-85/10   flex flex-wrap  gap-4 justify-center">
            <input
              type="text"
              value={pickup_location}
              onChange={(e) => setpickup_location(e.target.value)}
              placeholder="Enter pickup location"
              required
              className="border rounded-xl bg-white/90 px-4 py-2 w-9/10 shadow"
            />
            <input
              type="text"
              value={dropoff_location}
              onChange={(e) => setdropoff_location(e.target.value)}
              placeholder="Enter dropoff location"
              required
              className="border rounded-xl bg-white/90 px-4 py-2 w-9/10 shadow"
            />
            
          </div>

          {/* Button */}
          <div className="flex mt-4  flex-wrap justify-center">
            <button
              onClick={handleShowRoute}
              className="px-6 py-3 ml-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
             Book Ride
            </button>
          </div>
        </div>
        <div className="w-7/10 ">

          <MapComponent
            pickup_location={pickup_location}
            dropoff_location={dropoff_location}
            showRoute={showRoute}
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          />
        </div>

      </div>



    </div>
  );
}

export default RouteFinder;
