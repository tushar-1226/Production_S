import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import RideLocation from "./RideLocation";

const RideYourLocation = () => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [fareInfo, setFareInfo] = useState(null);

  // 🔥 Handle Search Button
  const handleSearch = () => {
    if (!mapRef.current || !pickup || !dropoff) return;

    if (!pickup.lat || !dropoff.lat) {
      alert("Please select a location from the suggestions");
      return;
    }

    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(dropoff.lat, dropoff.lng),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
    }).addTo(mapRef.current);

    // 🔥 Get Distance & Fare
    routingControlRef.current.on("routesfound", function (e) {
      const route = e.routes[0];
      const distanceInKm = route.summary.totalDistance / 1000;
      const durationInMin = route.summary.totalTime / 60;

      const baseFare = 40;
      const perKmRate = 10;
      const estimatedFare = baseFare + distanceInKm * perKmRate;

      setFareInfo({
        distance: distanceInKm.toFixed(2),
        duration: durationInMin.toFixed(0),
        fare: estimatedFare.toFixed(0),
      });
    });
  };

  // 🔥 Initialize Map Once
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([28.6139, 77.2090], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Uber.Creations",
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex gap-6 w-full">
      {/* Left Panel */}
      <RideLocation
        pickup={pickup}
        dropoff={dropoff}
        setPickup={setPickup}
        setDropoff={setDropoff}
        onSearch={handleSearch}
      />

      {/* Map */}
      <div className="h-175 w-240 rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 relative">
        <div id="map" className="w-full h-full"></div>

        {/* Fare Box */}
        {fareInfo && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg">
            <p><strong>Distance:</strong> {fareInfo.distance} km</p>
            <p><strong>Duration:</strong> {fareInfo.duration} min</p>
            <p className="text-lg font-semibold">
              ₹ {fareInfo.fare}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideYourLocation;