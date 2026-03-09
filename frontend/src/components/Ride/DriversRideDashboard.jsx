import React, { useEffect, useRef, useState } from 'react'
import { Phone, MessageSquare, User, Navigation } from 'lucide-react'
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
















const pickupIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const dropoffIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const DriversRideDashboard = ({ ride, setRide }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }, [])

  useEffect(() => {
    if (!ride || !ride.pickup || !ride.drop || !currentLocation) return;

    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        zoomControl: false,
        attributionControl: false
      }).setView([28.6139, 77.2090], 13);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Uber.Creations",
      }).addTo(mapRef.current);
    }

    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    const pickupLat = ride.pickup.location.coordinates[1];
    const pickupLng = ride.pickup.location.coordinates[0];

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(currentLocation.lat, currentLocation.lng),
        L.latLng(pickupLat, pickupLng),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: "#000", opacity: 0.8, weight: 5 }],
      },
      createMarker: function (i, wp, nWps) {
        if (i === 0) {
          return L.marker(wp.latLng, { icon: dropoffIcon }).bindPopup("Driver");
        } else if (i === nWps - 1) {
          return L.marker(wp.latLng, { icon: pickupIcon }).bindPopup("Pickup");
        }
        return null;
      },
    }).addTo(mapRef.current);

  }, [ride, currentLocation]);

  return (
    <div className='fixed inset-0 z-50 lg:relative lg:w-full lg:h-[90vh] bg-gray-100 lg:rounded-xl overflow-hidden lg:shadow-lg lg:border lg:border-gray-200'>
      
      {/* Map Container - You will handle the map implementation here */}
      <div className='absolute inset-0 w-full h-full bg-gray-200' id='map-container'>
        {/* Placeholder for map */}
        <div id='map' className='absolute inset-0 w-full h-full'></div>
        
        {/* Overlay for status */}
        <div className='absolute top-20 lg:top-4 left-4 z-10'>
           <div className='bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold flex items-center gap-2'>
              <div className={`w-2 h-2 rounded-full animate-pulse ${ride?.status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className='capitalize'>{ride?.status || "On the way to pickup"}</span>
           </div>
        </div>
      </div>

      {/* Ride Information Panel */}
      <div className='absolute z-100000 bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)] px-4 py-6 flex flex-col gap-4 z-20 h-auto'>
        
        {/* Rider Header */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200'>
              <User size={20} className='text-gray-600' />
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-800 capitalize'>
                {ride?.rider?.firstName ? `${ride.rider.firstName} ${ride.rider.lastName || ''}` : "Rider"}
              </h2>
            </div>
          </div>
          
          <div className='flex gap-2'>
            <button className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer'>
              <Phone size={18} />
            </button>
            <button className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer'>
              <MessageSquare size={18} />
            </button>
          </div>
        </div>

        {/* Route Details */}
        <div className='flex flex-col gap-2'>
          <div className='flex gap-4 items-start'>
            <div className='flex flex-col items-center gap-1 mt-1.5'>
              <div className='h-3 w-3 bg-green-500 rounded-full ring-2 ring-green-100'></div>
              <div className='h-8 w-[2px] bg-gray-200 rounded-full'></div>
              <div className='h-3 w-3 bg-red-500 rounded-full ring-2 ring-red-100'></div>
            </div>
            
            <div className='flex flex-col gap-2 w-full'>
              <div className='text-sm'>
                <div className='text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1'>Pickup</div>
                <div className='font-semibold text-gray-800 leading-tight text-sm truncate'>
                  {ride?.pickup?.address}
                </div>
              </div>
              <div className='text-sm'>
                <div className='text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1'>Dropoff</div>
                <div className='text-sm font-semibold text-gray-800 leading-tight truncate'>
                  {ride?.drop?.address}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Stats */}
        <div className='flex justify-between items-center bg-gray-50 p-2 rounded-xl border border-gray-100'>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Distance</span>
            <span className='font-bold text-base text-gray-800'>{ride?.distance} km</span>
          </div>
          <div className='w-[1px] h-8 bg-gray-200'></div>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Fare</span>
            <span className='font-bold text-base text-gray-800'>₹{ride?.fare?.estimated || ride?.fare}</span>
          </div>
          <div className='w-[1px] h-8 bg-gray-200'></div>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Vehicle</span>
            <span className='font-bold text-base text-gray-800 capitalize'>{ride?.vehicleType}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriversRideDashboard
