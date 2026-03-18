import React, { useEffect, useRef, useState } from 'react'
import { Phone, MessageSquare, User, Navigation, KeyRound, CheckCircle } from 'lucide-react'
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import socket from "../../socket/socket";

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

const DriversRideDashboard = ({ ride, setRide }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [riderLocation, setRiderLocation] = useState(null)
  const [showOtpPanel, setShowOtpPanel] = useState(false)
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(ride?.isVerified || false)
  const [isRequestingComplete, setIsRequestingComplete] = useState(false)

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
          socket.emit("driver-location-update", { rideId: ride._id, location: loc });
        }
      }, err => console.error(err), { enableHighAccuracy: true });
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    }
  }, [ride]);

  // Sync isVerified with incoming ride prop (e.g. after page refresh)
  useEffect(() => {
    if (ride?.isVerified) setIsVerified(true);
  }, [ride?.isVerified]);

  const verifyAndStartRide = async () => {
    if (!otpInput || otpInput.length !== 4) {
      setOtpError('Please enter the 4-digit OTP');
      return;
    }
    setIsVerifying(true);
    setOtpError(null);
    try {
      // Step 1: Verify OTP
      const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ride/${ride._id}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ otp: otpInput })
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setOtpError(verifyData.message || 'Invalid OTP. Try again.');
        setIsVerifying(false);
        return;
      }
      // OTP matched — set isVerified locally
      setIsVerified(true);
      setShowOtpPanel(false);

      // Step 2: Start the ride
      const startRes = await fetch(`${import.meta.env.VITE_API_URL}/api/ride/${ride._id}/start`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const startData = await startRes.json();
      if (startRes.ok) {
        setRide(startData.ride);
      } else {
        setOtpError(startData.message || 'Failed to start ride.');
      }
    } catch (err) {
      setOtpError('Network error. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRequestComplete = async () => {
    setIsRequestingComplete(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ride/${ride._id}/request-complete`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setRide(data.ride);
      } else {
        console.error('Failed to request completion:', data.message);
      }
    } catch (err) {
      console.error('Network error:', err);
    } finally {
      setIsRequestingComplete(false);
    }
  };

  useEffect(() => {
    socket.on("rider-location-update", (data) => {
      setRiderLocation(data.location);
    });
    return () => socket.off("rider-location-update");
  }, []);

  useEffect(() => {
    if (riderLocation && mapRef.current) {
      if (!riderMarkerRef.current) {
        riderMarkerRef.current = L.marker([riderLocation.lat, riderLocation.lng], { icon: riderIcon }).addTo(mapRef.current).bindPopup("Rider's live location");
      } else {
        riderMarkerRef.current.setLatLng([riderLocation.lat, riderLocation.lng]);
      }
    }
  }, [riderLocation]);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker([currentLocation.lat, currentLocation.lng], { 
          icon: driverIcon,
          zIndexOffset: 1000 
        }).addTo(mapRef.current).bindPopup("You");
        
        // Automatically zoom and pan to fit Driver, Pickup, and Dropoff on screen
        if (ride?.pickup?.location && ride?.drop?.location) {
          const bounds = L.latLngBounds([
            [currentLocation.lat, currentLocation.lng],
            [ride.pickup.location.coordinates[1], ride.pickup.location.coordinates[0]],
            [ride.drop.location.coordinates[1], ride.drop.location.coordinates[0]]
          ]);
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      } else {
        driverMarkerRef.current.setLatLng([currentLocation.lat, currentLocation.lng]);
      }
    }
  }, [currentLocation, ride]);

  useEffect(() => {
    if (!ride || !ride.pickup || !ride.drop) return;

    // This flag prevents async routing callbacks from running after unmount
    let destroyed = false;

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
    const expectedControls = (statusMode === 'accepted' && currentLocation) ? 2 : 1;

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
          L.latLng(currentLocation ? currentLocation.lat : pickupLat, currentLocation ? currentLocation.lng : pickupLng),
          L.latLng(dropLat, dropLng),
        ]);
        return;
      } else if (statusMode === 'accepted' && currentLocation && routingControlRef.current.length === 2) {
        routingControlRef.current[0].setWaypoints([
          L.latLng(currentLocation.lat, currentLocation.lng),
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
          L.latLng(currentLocation ? currentLocation.lat : pickupLat, currentLocation ? currentLocation.lng : pickupLng),
          L.latLng(dropLat, dropLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: "#2563eb", opacity: 0.8, weight: 4 }] },
        createMarker: function (i, wp, nWps) {
          if (i === 0) return null; 
          if (i === nWps - 1) return L.marker(wp.latLng, { icon: dropoffIcon }).bindPopup("Dropoff");
          return null;
        },
      }).on('routingerror', (e) => console.warn('Routing Error:', e.error?.message || e.message)).addTo(mapRef.current);
      controls.push(driverToDrop);

    } else if (statusMode === 'accepted' && currentLocation) {
      const driverToPickup = L.Routing.control({
        router: L.Routing.osrmv1({ serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1" }),
        waypoints: [
          L.latLng(currentLocation.lat, currentLocation.lng),
          L.latLng(pickupLat, pickupLng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        lineOptions: { styles: [{ color: "#000000", opacity: 0.8, weight: 4 }] },
        createMarker: function (i, wp, nWps) {
          if (i === 0) return null; 
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

    // Cleanup: runs when component unmounts or dependencies change.
    // Removes routing controls and destroys the map BEFORE any pending
    // async OSRM callbacks try to call removeLayer on a null map.
    return () => {
      destroyed = true;
      if (routingControlRef.current) {
        const toRemove = Array.isArray(routingControlRef.current)
          ? routingControlRef.current
          : [routingControlRef.current];
        toRemove.forEach(c => {
          try {
            if (mapRef.current) mapRef.current.removeControl(c);
          } catch (e) { /* ignore if already removed */ }
        });
        routingControlRef.current = null;
      }
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch(e) {}
        mapRef.current = null;
      }
      if (riderMarkerRef.current) { riderMarkerRef.current = null; }
      if (driverMarkerRef.current) { driverMarkerRef.current = null; }
    };

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
                {ride?.riderFirstName ? `${ride.riderFirstName} ${ride.riderLastName || ''}` : "Rider"}
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
          <div className='w-px h-8 bg-gray-200'></div>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Fare</span>
            <span className='font-bold text-base text-gray-800'>₹{ride?.fare?.estimated || ride?.fare}</span>
          </div>
          <div className='w-px h-8 bg-gray-200'></div>
          <div className='flex flex-col items-center w-1/3'>
            <span className='text-xs text-gray-500 font-medium uppercase'>Vehicle</span>
            <span className='font-bold text-base text-gray-800 capitalize'>{ride?.vehicleType}</span>
          </div>
        </div>

        {/* OTP Verification Section — only visible when ride is accepted and not yet verified */}
        {ride?.status === 'accepted' && !isVerified && (
          <>
            {showOtpPanel ? (
              <div className='flex flex-col gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4'>
                <div className='flex items-center gap-2'>
                  <KeyRound size={18} className='text-gray-700' />
                  <span className='font-semibold text-gray-800 text-sm'>Enter Rider's OTP</span>
                </div>
                <p className='text-xs text-gray-500'>Ask the rider for their 4-digit OTP sent to their email.</p>
                <input
                  type='number'
                  maxLength={4}
                  placeholder='_ _ _ _'
                  value={otpInput}
                  onChange={(e) => {
                    if (e.target.value.length <= 4) setOtpInput(e.target.value);
                  }}
                  className='text-center text-2xl font-bold tracking-[0.4em] border-2 border-gray-300 rounded-xl p-3 outline-none focus:border-black transition-colors bg-white'
                />
                {otpError && (
                  <div className='flex items-center gap-2 text-red-600 text-xs font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2'>
                    <span>✕</span> {otpError}
                  </div>
                )}
                <div className='flex gap-2'>
                  <button
                    onClick={() => { setShowOtpPanel(false); setOtpError(null); setOtpInput(''); }}
                    className='flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={verifyAndStartRide}
                    disabled={isVerifying || otpInput.length !== 4}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${isVerifying || otpInput.length !== 4 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 active:scale-95'}`}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Start Ride'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowOtpPanel(true)}
                className='w-full py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-2'
              >
                <Navigation size={16} />
                Arrived at Pickup
              </button>
            )}
          </>
        )}

        {/* Verified Badge + Complete Ride — shown when ride is started */}
        {isVerified && ride?.status === 'started' && (
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3'>
              <CheckCircle size={18} className='text-green-600' />
              <span className='text-green-700 font-semibold text-sm'>Rider Verified — Ride in Progress</span>
            </div>

            {ride?.awaitingRiderConfirmation ? (
              // Waiting for rider confirmation
              <div className='flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3'>
                <div className='w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin flex-shrink-0' />
                <span className='text-yellow-700 font-semibold text-sm'>Waiting for rider to confirm arrival...</span>
              </div>
            ) : (
              // Complete Ride button
              <button
                onClick={handleRequestComplete}
                disabled={isRequestingComplete}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${isRequestingComplete ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'}`}
              >
                <CheckCircle size={16} />
                {isRequestingComplete ? 'Requesting...' : 'Complete Ride'}
              </button>
            )}
          </div>
        )}

        {/* Ride Completed Screen */}
        {ride?.status === 'completed' && (
          <div className='flex flex-col items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-5 text-center'>
            <div className='text-3xl'>🎉</div>
            <span className='text-green-800 font-bold text-base'>Ride Completed!</span>
            <div className='flex justify-between w-full text-sm text-gray-600 border-t border-green-200 pt-3'>
              <span>Total Fare</span>
              <span className='font-bold text-gray-900'>₹{ride?.fare?.final || ride?.fare?.estimated}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DriversRideDashboard
