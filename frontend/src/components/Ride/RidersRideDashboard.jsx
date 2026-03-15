import React, { useEffect, useRef, useState } from 'react'
import { Phone, MessageSquare, User, Car, Star } from 'lucide-react'
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import socket from '../../socket/socket';

const driverIcon = L.divIcon({
  html: `<div style="background-color: white; border: 2px solid black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">D</div>`,
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const pickupIcon = L.divIcon({
  html: `<div style="background-color: white; border: 6px solid black; border-radius: 50%; width: 24px; height: 24px;"></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const dropoffIcon = L.divIcon({
  html: `<div style="background-color: white; border: 6px solid black; width: 24px; height: 24px;"></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const RidersRideDashboard = ({ ride }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  console.log(ride)

  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(position => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(loc);
        if (ride?._id) {
          socket.emit("rider-location-update", { rideId: ride._id, location: loc });
        }
      }, err => console.error(err), { enableHighAccuracy: true });
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    }
  }, [ride]);

  useEffect(() => {
    socket.on("driver-location-update", (data) => {
      setDriverLocation(data.location);
    });
    return () => socket.off("driver-location-update");
  }, []);

  useEffect(() => {
    if (!ride || !ride.pickup || !ride.drop) return;

    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        zoomControl: false,
        attributionControl: false
      }).setView([28.6139, 77.2090], 13);
      
      L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        attribution: "Google Maps",
      }).addTo(mapRef.current);
    }

    const pickupLat = currentLocation ? currentLocation.lat : ride.pickup.location.coordinates[1];
    const pickupLng = currentLocation ? currentLocation.lng : ride.pickup.location.coordinates[0];
    const dropLat = ride.drop.location.coordinates[1];
    const dropLng = ride.drop.location.coordinates[0];

    if (routingControlRef.current && Array.isArray(routingControlRef.current)) {
      if (driverLocation && routingControlRef.current.length === 2) {
        routingControlRef.current[0].setWaypoints([
          L.latLng(driverLocation.lat, driverLocation.lng),
          L.latLng(pickupLat, pickupLng),
        ]);
        routingControlRef.current[1].setWaypoints([
          L.latLng(pickupLat, pickupLng),
          L.latLng(dropLat, dropLng),
        ]);
        return;
      } else if (!driverLocation && routingControlRef.current.length === 1) {
        routingControlRef.current[0].setWaypoints([
          L.latLng(pickupLat, pickupLng),
          L.latLng(dropLat, dropLng),
        ]);
        return;
      }
    }

    if (routingControlRef.current) {
      if (Array.isArray(routingControlRef.current)) {
        routingControlRef.current.forEach(control => mapRef.current.removeControl(control));
      } else {
        mapRef.current.removeControl(routingControlRef.current);
      }
    }

    const controls = [];

    if (driverLocation) {
      const driverToPickup = L.Routing.control({
        waypoints: [
          L.latLng(driverLocation.lat, driverLocation.lng),
          L.latLng(pickupLat, pickupLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: "#4b5563", opacity: 0.8, weight: 4 }],
        },
        createMarker: function (i, wp, nWps) {
          if (i === 0) {
            return L.marker(wp.latLng, { icon: driverIcon }).bindPopup("Driver");
          } else if (i === nWps - 1) {
            return L.marker(wp.latLng, { icon: pickupIcon }).bindPopup("Pickup");
          }
          return null;
        },
      }).addTo(mapRef.current);
      controls.push(driverToPickup);
    }

    const pickupToDrop = L.Routing.control({
      waypoints: [
        L.latLng(pickupLat, pickupLng),
        L.latLng(dropLat, dropLng),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: "#2563eb", opacity: 0.8, weight: 4 }],
      },
      createMarker: function (i, wp, nWps) {
        if (i === 0 && !driverLocation) {
          return L.marker(wp.latLng, { icon: pickupIcon }).bindPopup("Pickup");
        }
        if (i === nWps - 1) {
          return L.marker(wp.latLng, { icon: dropoffIcon }).bindPopup("Dropoff");
        }
        return null;
      },
    }).addTo(mapRef.current);
    controls.push(pickupToDrop);

    routingControlRef.current = controls;

  }, [ride, driverLocation, currentLocation]);

  return (
    <div className='fixed inset-0 z-50 lg:relative lg:w-full lg:h-[90vh] bg-gray-100 lg:rounded-xl overflow-hidden lg:shadow-lg lg:border lg:border-gray-200'>
      
      {/* Map Container */}
      <div className='absolute inset-0 w-full h-full bg-gray-200' id='map-container'>
        <div id='map' className='absolute inset-0 w-full h-full'></div>
        
        {/* Overlay for status */}
        <div className='absolute top-20 lg:top-4 left-4 z-10'>
           <div className='bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold flex items-center gap-2'>
              <div className={`w-2 h-2 rounded-full animate-pulse ${ride?.status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className='capitalize'>{ride?.status || "Looking for a driver..."}</span>
           </div>
        </div>
      </div>

      {/* Ride Information Panel */}
      <div className='absolute z-[1000] bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)] px-4 py-6 flex flex-col gap-4 z-20 h-auto'>
        
        {/* Driver/Vehicle Header */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
             {ride.driver ? (
                <>
                    <div className='h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 overflow-hidden'>
                        <User size={24} className='text-gray-600' />
                    </div>
                    <div>
                    <h2 className='text-lg font-bold text-gray-800 capitalize'>
                        {ride.driverFirstName} {ride.driverLastName || ''}
                    </h2>
                    <div className='text-sm text-gray-500 font-medium flex items-center gap-1'>
                        <Star size={12} className="fill-black text-black" /> 4.8 • {ride.vehicleType}
                    </div>
                    </div>
                </>
             ) : (
                <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 animate-pulse'>
                        <Car size={24} className='text-gray-400' />
                    </div>
                    <div>
                        <h2 className='text-lg font-bold text-gray-800'>Connecting to driver...</h2>
                    </div>
                </div>
             )}
          </div>
          
          {ride.driver && (
            <div className='flex gap-2'>
                <div className='flex flex-col items-end mr-2'>
                    <span className='text-xs text-gray-400 font-medium uppercase'>OTP</span>
                    <span className='text-xl font-bold text-black tracking-widest'>{ride.otp || '1234'}</span>
                </div>
                <button className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer'>
                <Phone size={18} />
                </button>
                <button className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer'>
                <MessageSquare size={18} />
                </button>
            </div>
          )}
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
            <span className='text-xs text-gray-500 font-medium uppercase'>Payment</span>
            <span className='font-bold text-base text-gray-800 capitalize'>Cash</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RidersRideDashboard
