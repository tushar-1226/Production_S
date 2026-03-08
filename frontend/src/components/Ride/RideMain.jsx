import React, { use } from 'react'
import RideLocation from './RideLocation'
import RideYourLocation from './RideYourLocation'
import { useAuth } from '../../context/AuthContext'
import { MapPin } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import socket from "../../socket/socket"
import { Navigate } from 'react-router-dom'
import DriversRideDashboard from './DriversRideDashboard'
import RidersRideDashboard from './RidersRideDashboard'









const RideMain = () => {

  const { user } = useAuth();
  const [rides, setRides] = useState([])
  const [isActiveRide, setIsActiveRide] = useState(false)
  const [activeRide, setActiveRide] = useState(null)

  useEffect(() => {
    const fetchRides = async () => {
      const res = await axios.get(
        "http://localhost:3003/api/ride/pending-rides",
        { withCredentials: true }
      )
      setRides(res.data.rides)
    }
    fetchRides()
    fetchActiveRidesOfDriver()
  }, [])

  const handleAcceptRide = async (rideId) => {

    try {

      const res = await axios.patch(
        `http://localhost:3003/api/ride/${rideId}/accept`,
        {},
        { withCredentials: true }
      )

      const ride = res.data.ride

      console.log("Ride accepted:", ride)
      setActiveRide(ride)

      // join socket room
      socket.emit("join-ride", ride._id)
      console.log(res.data.ride.isActiveRide)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }

  }

  const fetchActiveRidesOfDriver = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3003/api/ride/accepted-rides',
        { withCredentials: true }
      )
      setActiveRide(res.data.ride[0])
    }
    catch (err) {
      console.log(err.message)
    }
  }

  if (user?.roles?.[0] == "driver") {
    if (activeRide) {
      return <DriversRideDashboard ride={activeRide} setActiveRide={setActiveRide} />
    }

    return (
      <div className='pt-10 px-5 lg:px-20 w-full h-full flex flex-col gap-8'>
        <h1 className='text-3xl font-bold'>Available Rides</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {rides.map((ride) => (
            <div key={ride._id} className='border border-gray-200 rounded-xl p-6 shadow-sm bg-white flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-gray-100 px-3 py-1 rounded-full text-sm font-medium'>{ride.rideType}</div>
                <div className='font-bold text-lg'>{ride.fare.estimated}</div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex gap-3 items-start'>
                  <MapPin size={16} className="mt-1 text-green-600 shrink-0" />
                  <div>
                    <div className='text-xs text-gray-500'>Pickup</div>
                    <div className='font-medium text-sm'>{ride.pickup.address}</div>
                  </div>
                </div>
                <div className='flex gap-3 items-start'>
                  <MapPin size={16} className="mt-1 text-red-600 shrink-0" />
                  <div>
                    <div className='text-xs text-gray-500'>Drop</div>
                    <div className='font-medium text-sm'>{ride.drop.address}</div>
                  </div>
                </div>
              </div>
              <div className='text-sm text-gray-500 mt-2'>Distance: {ride.distance} km</div>
              <div className='flex gap-3 mt-2'>
                <button onClick={() => handleAcceptRide(ride._id)} className='flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer'>Accept</button>
                <button className='flex-1 bg-gray-100 text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer'>Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    console.log(activeRide)
    if (activeRide) {
      return <RidersRideDashboard ride={activeRide} setActiveRide={setActiveRide} />
    } else {
      return (
        <div className='pt-10 flex gap-10 h-full w-full '>
          <RideYourLocation />
        </div>
      )
    }
  }
}

export default RideMain
