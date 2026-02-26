import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const RideLocation = ({
  pickup,
  dropoff,
  setPickup,
  setDropoff,
  onSearch,
}) => {
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropoffQuery, setDropoffQuery] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const fetchSuggestions = async (query, setter) => {
    if (query.length < 3) {
      setter([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            countrycodes: "in",
          },
        }
      );

      setter(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  useEffect(() => {
    if (activeField === "pickup") {
      debouncedFetch(pickupQuery, setPickupSuggestions);
    } else if (activeField === "dropoff") {
      debouncedFetch(dropoffQuery, setDropoffSuggestions);
    }
  }, [pickupQuery, dropoffQuery, activeField]);

  const SubmitForm = (e) => {
    e.preventDefault();
    if (pickup && dropoff) {
      onSearch();
    }
  };

  return (
    <div className="h-90 w-80 border-2 border-gray-100 rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-lg">
      <div className="text-[20px] font-semibold">Get a ride</div>

      <form onSubmit={SubmitForm} className="flex flex-col gap-4">

        {/* Pickup */}
        <div className="relative">
          <input
            className="bg-[#EFEFEF] px-4 py-3 w-full rounded-lg"
            placeholder="Pickup Location"
            value={pickupQuery}
            onChange={(e) => setPickupQuery(e.target.value)}
            onFocus={() => setActiveField("pickup")}
          />

          {activeField === "pickup" && pickupSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
              {pickupSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPickup({
                      name: s.display_name,
                      lat: parseFloat(s.lat),
                      lng: parseFloat(s.lon),
                    });
                    setPickupQuery(s.display_name);
                    setPickupSuggestions([]);
                  }}
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dropoff */}
        <div className="relative">
          <input
            className="bg-[#EFEFEF] px-4 py-3 w-full rounded-lg"
            placeholder="Dropoff Location"
            value={dropoffQuery}
            onChange={(e) => setDropoffQuery(e.target.value)}
            onFocus={() => setActiveField("dropoff")}
          />

          {activeField === "dropoff" && dropoffSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
              {dropoffSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDropoff({
                      name: s.display_name,
                      lat: parseFloat(s.lat),
                      lng: parseFloat(s.lon),
                    });
                    setDropoffQuery(s.display_name);
                    setDropoffSuggestions([]);
                  }}
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="py-3 rounded-lg bg-black text-white font-medium"
        >
          Search Ride
        </button>
      </form>
    </div>
  );
};

export default RideLocation;