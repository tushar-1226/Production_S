import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import clock from '../../assets/clock.svg'
import { ChevronDown, UserRound, X, Calendar, Clock, Car, Bike } from "lucide-react";








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
  fareInfo,
}) => {
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropoffQuery, setDropoffQuery] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduleTime, setScheduleTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const [isRiderModalOpen, setIsRiderModalOpen] = useState(false);
  const [riderType, setRiderType] = useState("me");
  const [otherRiderDetails, setOtherRiderDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);

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
      setIsVehiclePanelOpen(true);
    }
  };

  return (
    <div className="flex gap-5 items-start">
      <div className="h-100 w-80 border-2 border-gray-100 rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-lg relative overflow-hidden">
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
      {isScheduleOpen && (
        <div className="absolute inset-0 bg-white z-50 rounded-2xl p-4 flex flex-col gap-4" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Schedule a Ride</h3>
            <button onClick={() => setIsScheduleOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="text-base font-medium">When do you want to be picked up?</div>

          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <label className="text-xs text-gray-500 font-medium">Date</label>
              <div
                className="relative flex items-center bg-gray-100 rounded-lg p-2 focus-within:ring-2 focus-within:ring-black transition-all cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dateInputRef.current?.showPicker();
                }}
              >
                <Calendar size={18} className="text-gray-500 mr-2 shrink-0" />
                <input
                  ref={dateInputRef}
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1 cursor-pointer font-medium"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <label className="text-xs text-gray-500 font-medium">Time</label>
              <div
                className="relative flex items-center bg-gray-100 rounded-lg p-2 focus-within:ring-2 focus-within:ring-black transition-all cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  timeInputRef.current?.showPicker();
                }}
              >
                <Clock size={18} className="text-gray-500 mr-2 shrink-0" />
                <input
                  ref={timeInputRef}
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1 cursor-pointer font-medium"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="p-3 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium">Pickup at</span>
                  <span className="text-xs text-gray-500 truncate">{pickup?.name || "Current location"}</span>
                </div>
              </div>
            </div>

            <div className="p-3 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium">Drop off at</span>
                  <span className="text-xs text-gray-500 truncate">{dropoff?.name || "Destination"}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsScheduleOpen(false)}
            className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md"
          >
            Confirm Schedule
          </button>
        </div>
      )}

      {isRiderModalOpen && (
        <div className="absolute inset-0 bg-white z-50 rounded-2xl p-4 flex flex-col gap-4" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Who's riding?</h3>
            <button onClick={() => setIsRiderModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div
            className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between transition-all duration-200 ${riderType === 'me' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
            onClick={() => setRiderType('me')}
          >
            <div className="flex items-center gap-3">
              <UserRound size={20} />
              <span className="font-medium">For me</span>
            </div>
            {riderType === 'me' && <div className="w-2 h-2 bg-black rounded-full" />}
          </div>

          <div
            className={`p-3 border rounded-xl cursor-pointer flex flex-col gap-3 transition-all duration-200 ${riderType === 'other' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
            onClick={() => setRiderType('other')}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <UserRound size={20} />
                <span className="font-medium">For someone else</span>
              </div>
              {riderType === 'other' && <div className="w-2 h-2 bg-black rounded-full" />}
            </div>

            {riderType === 'other' && (
              <div className="flex flex-col gap-3 w-full mt-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={otherRiderDetails.firstName}
                  onChange={(e) => setOtherRiderDetails({ ...otherRiderDetails, firstName: e.target.value })}
                  className="bg-gray-100 p-2 rounded-lg text-sm outline-none w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={otherRiderDetails.lastName}
                  onChange={(e) => setOtherRiderDetails({ ...otherRiderDetails, lastName: e.target.value })}
                  className="bg-gray-100 p-2 rounded-lg text-sm outline-none w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={otherRiderDetails.phone}
                  onChange={(e) => setOtherRiderDetails({ ...otherRiderDetails, phone: e.target.value })}
                  className="bg-gray-100 p-2 rounded-lg text-sm outline-none w-full"
                />
              </div>
            )}
          </div>

          <button
            onClick={() => setIsRiderModalOpen(false)}
            className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md"
          >
            Done
          </button>
        </div>
      )}

      <div className="text-[20px] font-semibold">Get a ride</div>

      <form onSubmit={SubmitForm} className="flex flex-col gap-4">

        {/* Pickup */}
        <div className="relative">
          <div className="absolute top-4 left-4 rounded-full h-4 w-4 border-5 border-black">

          </div>

          <input
            className="bg-[#EFEFEF] pl-10 px-4 py-3 w-full rounded-lg"
            placeholder="Pickup Location"
            value={pickupQuery}
            onChange={(e) => setPickupQuery(e.target.value)}
            onFocus={() => setActiveField("pickup")}
          />

          {activeField === "pickup" && pickupSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-88 overflow-y-auto">
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
          <div className="absolute top-4 left-4  h-4 w-4 border-5 border-black">

          </div>
          <input
            className="bg-[#EFEFEF] pl-10 px-4 py-3 w-full rounded-lg"
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

        <div>
          <button
            type="button"
            onClick={() => setIsScheduleOpen(true)}
            className="flex bg-[#EFEFEF] px-4 py-3 w-full rounded-lg items-center justify-between "
          >
            <div className="flex gap-2 items-center">
              <div className="w-5"><img className="object-cover h-full w-full" src={clock} alt="" /></div>
              <span className="font-normal">Pickup now</span>
            </div>
            <ChevronDown size={15} className="" strokeWidth={4}/>
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsRiderModalOpen(true)}
            className="flex bg-[#EFEFEF] px-4 py-3 w-30 rounded-full items-center justify-between "
          >
            <div className="flex gap-2 items-center">
              <UserRound size={15} strokeWidth={4}/>
              <span className="font-normal text-sm truncate max-w-[80px]">
                {riderType === 'me' ? 'For me' : (otherRiderDetails.firstName || 'Other')}
              </span>
            </div>
            <ChevronDown size={15} strokeWidth={4}/>
          </button>
        </div>

        <button
          type="submit"
          className="py-3 rounded-lg bg-black text-white font-medium"
        >
          Search Ride
        </button>
      </form>
      </div>

      {isVehiclePanelOpen && (
        <div className="h-100 w-80 border-2 border-gray-100 rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Choose a Ride</h3>
            <button onClick={() => setIsVehiclePanelOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto flex-1">
            {/* Cab Option */}
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-black cursor-pointer transition-all">
              <div className="flex items-center gap-4">
                <Car size={28} className="text-gray-800" />
                <div>
                  <div className="font-bold text-base">Cab</div>
                  <div className="text-xs text-gray-500">{fareInfo?.distance} km • {fareInfo?.duration} min</div>
                  <div className="text-xs text-gray-400">Comfy, AC ride</div>
                </div>
              </div>
              <div className="font-bold text-lg">₹{fareInfo?.fares?.cab}</div>
            </div>

            {/* Auto Option */}
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-black cursor-pointer transition-all">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 flex items-center justify-center font-bold text-gray-800 border-2 border-gray-800 rounded-md text-[10px]">AUTO</div>
                <div>
                  <div className="font-bold text-base">Auto</div>
                  <div className="text-xs text-gray-500">{fareInfo?.distance} km • {fareInfo?.duration} min</div>
                  <div className="text-xs text-gray-400">Affordable, compact</div>
                </div>
              </div>
              <div className="font-bold text-lg">₹{fareInfo?.fares?.auto}</div>
            </div>

            {/* Rapido/Moto Option */}
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-black cursor-pointer transition-all">
              <div className="flex items-center gap-4">
                <Bike size={28} className="text-gray-800" />
                <div>
                  <div className="font-bold text-base">Rapido</div>
                  <div className="text-xs text-gray-500">{fareInfo?.distance} km • {fareInfo?.duration} min</div>
                  <div className="text-xs text-gray-400">Fastest, cheapest</div>
                </div>
              </div>
              <div className="font-bold text-lg">₹{fareInfo?.fares?.moto}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideLocation;