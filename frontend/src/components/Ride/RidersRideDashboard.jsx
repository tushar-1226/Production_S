import React, { useEffect, useRef, useState } from 'react'
import { Phone, MessageSquare, User, Car, Star } from 'lucide-react'
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import socket from '../../socket/socket';

const driverIcon = L.divIcon({
  html: `<div style="background-color: black; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg></div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
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

const riderIcon = L.divIcon({
  html: `<div style="background-color: #3b82f6; border-radius: 50%; width: 16px; height: 16px; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const RidersRideDashboard = ({ ride, setRide }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmArrival = async () => {
    setIsConfirming(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ride/${ride._id}/rider-confirm-complete`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok && setRide) {
        setRide(data.ride);
      } else {
        console.error('Failed to confirm ride:', data.message);
      }
    } catch (err) {
      console.error('Network error:', err);
    } finally {
      setIsConfirming(false);
    }
  };








  


























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
    if (currentLocation && mapRef.current) {
      if (!riderMarkerRef.current) {
        riderMarkerRef.current = L.marker([currentLocation.lat, currentLocation.lng], { icon: riderIcon }).addTo(mapRef.current).bindPopup("You");
      } else {
        riderMarkerRef.current.setLatLng([currentLocation.lat, currentLocation.lng]);
      }
    }
  }, [currentLocation]);

  useEffect(() => {
    if (driverLocation && mapRef.current) {
      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker([driverLocation.lat, driverLocation.lng], { 
          icon: driverIcon,
          zIndexOffset: 1000 // Ensures the car stays on top even if locations overlap during local testing
        }).addTo(mapRef.current).bindPopup("Driver");

        // Automatically zoom and pan to fit all 3 points (Driver, Pickup, Dropoff) on screen
        if (ride?.pickup?.location && ride?.drop?.location) {
          const bounds = L.latLngBounds([
            [driverLocation.lat, driverLocation.lng],
            [ride.pickup.location.coordinates[1], ride.pickup.location.coordinates[0]],
            [ride.drop.location.coordinates[1], ride.drop.location.coordinates[0]]
          ]);
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      } else {
        driverMarkerRef.current.setLatLng([driverLocation.lat, driverLocation.lng]);
      }
    }
  }, [driverLocation, ride]);

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

    const pickupLat = ride.pickup.location.coordinates[1];
    const pickupLng = ride.pickup.location.coordinates[0];
    const dropLat = ride.drop.location.coordinates[1];
    const dropLng = ride.drop.location.coordinates[0];

    const statusMode = ride.status;
    const expectedControls = (statusMode === 'accepted' && driverLocation) ? 2 : 1;

    // Rebuild the route completely if the ride status transitions or expected number of routes changes
    if (routingControlRef.current && (routingControlRef.current.mode !== statusMode || routingControlRef.current.length !== expectedControls)) {
      if (Array.isArray(routingControlRef.current)) {
        routingControlRef.current.forEach(c => mapRef.current.removeControl(c));
      } else {
        mapRef.current.removeControl(routingControlRef.current);
      }
      routingControlRef.current = null;
    }

    // Fast-path: Just update moving waypoints if the controls are already correctly established
    if (routingControlRef.current && Array.isArray(routingControlRef.current)) {
      if (statusMode === 'started') {
        routingControlRef.current[0].setWaypoints([
          L.latLng(driverLocation ? driverLocation.lat : pickupLat, driverLocation ? driverLocation.lng : pickupLng),
          L.latLng(dropLat, dropLng),
        ]);
        return;
      } else if (statusMode === 'accepted' && driverLocation && routingControlRef.current.length === 2) {
        routingControlRef.current[0].setWaypoints([
          L.latLng(driverLocation.lat, driverLocation.lng),
          L.latLng(pickupLat, pickupLng),
        ]);
        routingControlRef.current[1].setWaypoints([
          L.latLng(pickupLat, pickupLng),
          L.latLng(dropLat, dropLng),
        ]);
        return;
      } else if (routingControlRef.current.length === 1) {
        routingControlRef.current[0].setWaypoints([
          L.latLng(pickupLat, pickupLng),
          L.latLng(dropLat, dropLng),
        ]);
        return;
      }
    }

    const controls = [];

    if (statusMode === 'started') {
      const driverToDrop = L.Routing.control({
        router: L.Routing.osrmv1({ serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1" }),
        waypoints: [
          L.latLng(driverLocation ? driverLocation.lat : pickupLat, driverLocation ? driverLocation.lng : pickupLng),
          L.latLng(dropLat, dropLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: "#2563eb", opacity: 0.8, weight: 4 }] },
        createMarker: function (i, wp, nWps) {
          if (i === 0) return null; // Standalone driver marker takes care of this
          if (i === nWps - 1) return L.marker(wp.latLng, { icon: dropoffIcon }).bindPopup("Dropoff");
          return null;
        },
      }).on('routingerror', (e) => console.warn('Routing Error:', e.error?.message || e.message)).addTo(mapRef.current);
      controls.push(driverToDrop);

    } else if (statusMode === 'accepted' && driverLocation) {
      const driverToPickup = L.Routing.control({
        router: L.Routing.osrmv1({ serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1" }),
        waypoints: [
          L.latLng(driverLocation.lat, driverLocation.lng),
          L.latLng(pickupLat, pickupLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: "#000000", opacity: 0.8, weight: 4 }] },
        createMarker: function (i, wp, nWps) {
          if (i === 0) return null; // Standalone driver marker takes care of this
          if (i === nWps - 1) return L.marker(wp.latLng, { icon: pickupIcon }).bindPopup("Pickup");
          return null;
        },
      }).on('routingerror', (e) => console.warn('Routing Error:', e.error?.message || e.message)).addTo(mapRef.current);
      controls.push(driverToPickup);

      const pickupToDrop = L.Routing.control({
        router: L.Routing.osrmv1({ serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1" }),
        waypoints: [
          L.latLng(pickupLat, pickupLng),
          L.latLng(dropLat, dropLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: "#2563eb", opacity: 0.8, weight: 4 }] },
        createMarker: function (i, wp, nWps) {
          // Driver->Pickup route already drew the pickup marker
          if (i === 0) return null;
          if (i === nWps - 1) return L.marker(wp.latLng, { icon: dropoffIcon }).bindPopup("Dropoff");
          return null;
        },
      }).on('routingerror', (e) => console.warn('Routing Error:', e.error?.message || e.message)).addTo(mapRef.current);
      controls.push(pickupToDrop);

    } else {
      const pickupToDrop = L.Routing.control({
        router: L.Routing.osrmv1({ serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1" }),
        waypoints: [
          L.latLng(pickupLat, pickupLng),
          L.latLng(dropLat, dropLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: "#2563eb", opacity: 0.8, weight: 4 }] },
        createMarker: function (i, wp, nWps) {
          if (i === 0) return L.marker(wp.latLng, { icon: pickupIcon }).bindPopup("Pickup");
          if (i === nWps - 1) return L.marker(wp.latLng, { icon: dropoffIcon }).bindPopup("Dropoff");
          return null;
        },
      }).on('routingerror', (e) => console.warn('Routing Error:', e.error?.message || e.message)).addTo(mapRef.current);
      controls.push(pickupToDrop);
    }

    controls.mode = statusMode;
    routingControlRef.current = controls;

  }, [ride, driverLocation]);

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

        {/* Confirm Arrival — shown when driver has requested completion */}
        {ride?.awaitingRiderConfirmation && ride?.status === 'started' && (
          <div className='flex flex-col gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-4'>
            <div className='flex items-center gap-2'>
              <span className='text-xl'>📍</span>
              <span className='text-yellow-800 font-bold text-sm'>Driver says you have arrived!</span>
            </div>
            <p className='text-xs text-yellow-700'>Please confirm that you have reached your destination.</p>
            <button
              onClick={handleConfirmArrival}
              disabled={isConfirming}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${isConfirming ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 active:scale-95'}`}
            >
              {isConfirming ? 'Confirming...' : 'Yes, I have Arrived — Complete Ride'}
            </button>
          </div>
        )}

        {/* Ride Completed */}
        {ride?.status === 'completed' && (
          <div className='flex flex-col items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-5 text-center'>
            <div className='text-3xl'>🎉</div>
            <span className='text-green-800 font-bold text-base'>Ride Completed! Thanks for riding.</span>
            <div className='flex justify-between w-full text-sm text-gray-600 border-t border-green-200 pt-3'>
              <span>Total Fare</span>
              <span className='font-bold text-gray-900'>Rs.{ride?.fare?.final || ride?.fare?.estimated}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default RidersRideDashboard
