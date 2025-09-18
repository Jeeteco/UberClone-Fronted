import React, { useState, useEffect, useCallback } from "react";
import {
    GoogleMap,
    LoadScript,
    Marker,
    Polyline,
    InfoWindow,
} from "@react-google-maps/api";
import polyline from "@mapbox/polyline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_URL;

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 28.6139, lng: 77.209 };

function MapComponent({ pickup_location, dropoff_location, showRoute, apiKey }) {
    const [path, setPath] = useState([]);
    const [pickup_locationPos, setpickup_locationPos] = useState(null);
    const [dropoff_locationPos, setdropoff_locationPos] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [userLocation, setUserLocation] = useState(null);
    const [isUserLocationFound, setIsUserLocationFound] = useState(false);
    
    // Add a state for the icon size
    const [userIconSize, setUserIconSize] = useState(null);

    const navigate = useNavigate();

    // Geocode address to lat/lng
    const geocodeAddress = async (address) => {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${apiKey}`
        );
        const data = await res.json();
        if (data.results?.length > 0) return data.results[0].geometry.location;
        return null;
    };

    // Effect to get the user's current location on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLoc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMapCenter(userLoc);
                    setUserLocation(userLoc);
                    setIsUserLocationFound(true);
                },
                () => {
                    setMapCenter(defaultCenter);
                    setIsUserLocationFound(false);
                }
            );
        } else {
            setMapCenter(defaultCenter);
            setIsUserLocationFound(false);
        }
    }, []);

    // Effect for fetching route
    useEffect(() => {
        if (showRoute && pickup_location && dropoff_location) {
            const fetchRoute = async () => {
                try {
                    const access_token = localStorage.getItem('access_token');
                    if (!access_token) {
                        alert("Login First");
                        navigate('/login');
                        return;
                    }
                    const origin = await geocodeAddress(pickup_location);
                    const destination = await geocodeAddress(dropoff_location);
                    if (!origin || !destination) return;

                    setpickup_locationPos(origin);
                    setdropoff_locationPos(destination);
                    setMapCenter(origin);

                    const response = await axios.post(
                        "https://routes.googleapis.com/directions/v2:computeRoutes",
                        {
                            origin: {
                                location: {
                                    latLng: {
                                        latitude: origin.lat,
                                        longitude: origin.lng,
                                    },
                                },
                            },
                            destination: {
                                location: {
                                    latLng: {
                                        latitude: destination.lat,
                                        longitude: destination.lng,
                                    },
                                },
                            },
                            travelMode: "DRIVE",
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "X-Goog-Api-Key": apiKey,
                                "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
                            },
                        }
                    );

                    const data = response.data;
                    if (data.routes?.length > 0) {
                        const route = data.routes[0];
                        setDistance((route.distanceMeters / 1000).toFixed(1) + " km");
                        setDuration(route.duration.replace("s", " sec"));

                        const encoded = route.polyline.encodedPolyline;
                        const decoded = polyline.decode(encoded)?.map(([lat, lng]) => ({
                            lat,
                            lng,
                        }));
                        setPath(decoded);
                    }

                    const journeyDistance = data.routes[0].distanceMeters / 1000;
                    const fare_estimate = journeyDistance * 5;
                    const id = localStorage.getItem("userId");
                    const authToken = localStorage.getItem('access_token');

                    const url = `${backend}/rider/bookride/${id}`;
                    const user = { pickup_location, dropoff_location, fare_estimate };

                    const res = await axios.post(url, user, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`
                        }
                    });
                    alert(res.data.message);
                    const rideId = res.data.ride[0].id;
                    localStorage.setItem('rideId', rideId);
                } catch (err) {
                    alert(err.response?.data?.error || "An error occurred.");
                    console.error("Error fetching route:", err);
                }
            };

            fetchRoute()
            ;
        }
    }, [showRoute, pickup_location, dropoff_location, navigate, apiKey]);

 
    const onMapLoad = useCallback((map) => {
        if (window.google) {
         
            setUserIconSize(new window.google.maps.Size(40, 40));
        }
    }, []);

    return (
        <div className="h-[700px] rounded-2xl shadow-lg border border-gray-300 overflow-hidden">
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={12}
                    onLoad={onMapLoad} // <-- Add the onLoad prop here
                >
                    {/* Mark user's current location */}
                    {userLocation && userIconSize && ( // <-- Check if both are available
                        <Marker
                            position={userLocation}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                scaledSize: userIconSize, // <-- Use the state variable here
                            }}
                        />
                    )}

                    {/* InfoWindow for user location */}
                    {userLocation && (
                        <InfoWindow position={userLocation}>
                            <div>
                                <strong>You are here!</strong>
                            </div>
                        </InfoWindow>
                    )}

                    {/* pickup and drop location marker */}
                    {pickup_locationPos && <Marker position={pickup_locationPos} label="P" />}
                    {dropoff_locationPos && <Marker position={dropoff_locationPos} label="D" />}

                    {/* Existing route polyline */}
                    {path.length > 0 && (
                        <Polyline
                            path={path}
                            options={{
                                strokeColor: "#1E90FF",
                                strokeOpacity: 0.8,
                                strokeWeight: 5,
                            }}
                        />
                    )}

                    {/* Existing InfoWindow for distance and duration */}
                    {distance && duration && (
                        <InfoWindow position={dropoff_locationPos}>
                            <div>
                                <p><strong>Distance:</strong> {distance}</p>
                                <p><strong>Duration:</strong> {duration}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default MapComponent;