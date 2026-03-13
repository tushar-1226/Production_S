import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import clock from '../../assets/clock.svg'
import { ChevronDown, UserRound, X, Calendar, Clock, Car, Bike, MapPin, Square, Hourglass } from "lucide-react";
import socket from "../../socket/socket";

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
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehiclePanelMode, setVehiclePanelMode] = useState('select');
  const [errorMessage, setErrorMessage] = useState(null);

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
      setVehiclePanelMode('select');
    }
  };

  const handleBookRide = async () => {
    setErrorMessage(null);
    const rideData = {
      pickup: {
        address: pickup.name,
        location: {
          type: "Point",
          coordinates: [pickup.lng, pickup.lat]
        }
      },
      drop: {
        address: dropoff.name,
        location: {
          type: "Point",
          coordinates: [dropoff.lng, dropoff.lat]
        }
      },
      vehicleType: selectedVehicle,
      rideType: riderType === "me" ? "for_me" : "for_other",
      otherRider: riderType === "other" ? otherRiderDetails : null,
      scheduledTime: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
      distance: fareInfo?.distance
    };

    try {

      const res = await axios.post(
        "http://localhost:3003/api/ride/create-rides",
        rideData,
        {
          withCredentials: true
        }
      )

      const rideId = res.data.ride._id

      console.log("Ride created:", rideId)

      socket.emit("join-ride", rideId)
      window.location.reload();

    } catch (err) {
      console.error("Error creating ride:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || err.message);
    }


  };


  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start h-full lg:h-full w-full lg:w-auto transition-all duration-300">
      <div className="h-full lg:h-100 w-full lg:w-80 border-2 border-gray-100 rounded-2xl flex flex-col gap-4 p-2 lg:p-4 bg-white shadow-lg relative overflow-y-auto overflow-x-hidden shrink-0">
        <style>
          {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
        </style>
        {isScheduleOpen && (
          <div className="fixed inset-0 lg:absolute lg:inset-0 bg-white z-[2500] lg:z-50 lg:rounded-2xl p-4 flex flex-col gap-4" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Schedule a Ride</h3>
              <button onClick={() => setIsScheduleOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="text-base font-medium">When do you want to be picked up?</div>

            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs text-gray-500 font-medium">Date</label>
                <div
                  className="relative flex items-center bg-gray-100 rounded-lg p-2 focus-within:ring-2 focus-within:ring-black hover:bg-gray-200 transition-all cursor-pointer"
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
                  className="relative flex items-center bg-gray-100 rounded-lg p-2 focus-within:ring-2 focus-within:ring-black hover:bg-gray-200 transition-all cursor-pointer"
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
              className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-md"
            >
              Confirm Schedule
            </button>
          </div>
        )}

        {isRiderModalOpen && (
          <div className="fixed inset-0 lg:absolute lg:inset-0 bg-white z-[2500] lg:z-50 lg:rounded-2xl p-4 flex flex-col gap-4" style={{ animation: 'slideUp 0.3s ease-out' }}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Who's riding?</h3>
              <button onClick={() => setIsRiderModalOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div
              className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between transition-all duration-200 active:scale-95 ${riderType === 'me' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
              onClick={() => setRiderType('me')}
            >
              <div className="flex items-center gap-3">
                <UserRound size={20} />
                <span className="font-medium">For me</span>
              </div>
              {riderType === 'me' && <div className="w-2 h-2 bg-black rounded-full" />}
            </div>

            <div
              className={`p-3 border rounded-xl cursor-pointer flex flex-col gap-3 transition-all duration-200 active:scale-95 ${riderType === 'other' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
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
                    className="bg-gray-100 p-2 rounded-lg text-sm outline-none w-full focus:ring-2 focus:ring-black transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={otherRiderDetails.lastName}
                    onChange={(e) => setOtherRiderDetails({ ...otherRiderDetails, lastName: e.target.value })}
                    className="bg-gray-100 p-2 rounded-lg text-sm outline-none w-full focus:ring-2 focus:ring-black transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={otherRiderDetails.phone}
                    onChange={(e) => setOtherRiderDetails({ ...otherRiderDetails, phone: e.target.value })}
                    className="bg-gray-100 p-2 rounded-lg text-sm outline-none w-full focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => setIsRiderModalOpen(false)}
              className="mt-auto w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-md"
            >
              Done
            </button>
          </div>
        )}

        <div className="text-[20px] font-semibold hidden lg:block">Get a ride</div>

        <form onSubmit={SubmitForm} className="flex flex-col gap-4">

          {/* Pickup */}
          <div className="relative">
            <div className="absolute top-4 left-4 rounded-full h-4 w-4 border-5 border-black">

            </div>

            <input
              className="bg-[#EFEFEF] pl-10 px-4 py-2 lg:py-3 w-full rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
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
              className="bg-[#EFEFEF] pl-10 px-4 py-2 lg:py-3 w-full rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
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






























          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsScheduleOpen(true)}
              className="flex-1 flex bg-[#EFEFEF] px-3 py-2 lg:px-4 lg:py-3 rounded-full lg:rounded-lg items-center justify-between hover:bg-gray-200 active:scale-95 transition-all"
            >
              <div className="flex gap-2 items-center">
                <div className="w-5"><img className="object-cover h-full w-full" src={clock} alt="" /></div>
                <span className="font-normal text-sm whitespace-nowrap">Pickup now</span>
              </div>
              <ChevronDown size={15} className="" strokeWidth={4} />
            </button>
            <button
              type="button"
              onClick={() => setIsRiderModalOpen(true)}
              className="w-30 flex-shrink-0 flex bg-[#EFEFEF] px-3 py-2 lg:px-4 lg:py-3 rounded-full lg:rounded-lg items-center justify-between hover:bg-gray-200 active:scale-95 transition-all"
            >
              <div className="flex gap-2 items-center">
                <UserRound size={15} strokeWidth={4} />
                <span className="font-normal text-sm truncate max-w-[80px]">
                  {riderType === 'me' ? 'For me' : (otherRiderDetails.firstName || 'Other')}
                </span>
              </div>
              <ChevronDown size={15} strokeWidth={4} />
            </button>
          </div>

          <button
            type="submit"
            className="lg:py-3 py-1 rounded-lg bg-black text-white font-medium hover:opacity-87 cursor-pointer active:scale-95 transition-all"
          >
            Search Ride
          </button>
        </form>
      </div>

      {isVehiclePanelOpen && (
        <div className="fixed inset-0 lg:static z-[2000] lg:z-auto h-full lg:h-full w-full lg:w-[400px] border-none lg:border-2 lg:border-gray-100 rounded-none lg:rounded-2xl flex flex-col gap-4 p-4 bg-white shadow-none lg:shadow-lg relative overflow-hidden shrink-0" style={{ animation: 'slideIn 0.5s ease-out' }}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{vehiclePanelMode === 'select' ? 'Choose a Ride' : 'Confirm Ride'}</h3>
            <button onClick={() => setIsVehiclePanelOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {vehiclePanelMode === 'select' ? (
            <>
              <div className="flex flex-col gap-3 overflow-y-auto flex-1">
                {/* Cab Option */}
                <div
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all active:scale-95 ${selectedVehicle === 'cab' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
                  onClick={() => setSelectedVehicle('cab')}
                >
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
                <div
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all active:scale-95 ${selectedVehicle === 'auto' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
                  onClick={() => setSelectedVehicle('auto')}
                >
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
                <div
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all active:scale-95 ${selectedVehicle === 'moto' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}
                  onClick={() => setSelectedVehicle('moto')}
                >
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

              <button
                disabled={!selectedVehicle}
                onClick={() => setVehiclePanelMode('confirm')}
                className={`w-full py-3 rounded-lg font-medium transition-all ${selectedVehicle ? 'bg-black text-white hover:bg-gray-800 active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Confirm Ride
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-5 overflow-y-auto flex-1 p-1">
              {/* Selected Vehicle Option */}
              <div className="flex items-center justify-between p-3 border-black border bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  {selectedVehicle === 'cab' && <Car size={28} className="text-gray-800" />}
                  {selectedVehicle === 'auto' && <div className="w-7 h-7 flex items-center justify-center font-bold text-gray-800 border-2 border-gray-800 rounded-md text-[10px]">AUTO</div>}
                  {selectedVehicle === 'moto' && <Bike size={28} className="text-gray-800" />}
                  <div>
                    <div className="font-bold text-base capitalize">{selectedVehicle === 'moto' ? 'Rapido' : selectedVehicle}</div>
                    <div className="text-xs text-gray-500">{fareInfo?.distance} km</div>
                  </div>
                </div>
                <div className="font-bold text-lg">₹{fareInfo?.fares?.[selectedVehicle]}</div>
              </div>

              {/* Itinerary */}
              <div className="flex flex-col gap-4 border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-lg">Itinerary</h4>
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <div className="w-0.5 h-12 bg-gray-300"></div>
                    <div className="w-3 h-3 border-2 border-black bg-white"></div>
                  </div>
                  <div className="flex flex-col gap-6 w-full">
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-medium">{pickup?.name}</div>
                      <div className="text-xs text-gray-400">{scheduleTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Drop</div>
                      <div className="font-medium">{dropoff?.name}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extras */}
              <div className="flex flex-col gap-2 border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-base">Extras to be paid by you to driver</h4>
                <p className="text-xs text-gray-500">Your fare does not include</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Parking</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">Tolls</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">State entry taxes</span>
                </div>
              </div>

              {/* Things to keep in mind */}
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-base">Things to keep in mind</h4>
                <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                  <Hourglass size={20} className="mt-0.5 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">Wait time</div>
                    <div className="text-xs text-gray-500 mt-1">5 minutes of wait time included to meet your ride</div>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handleBookRide}
                className="w-full py-3 rounded-lg font-medium bg-black text-white hover:bg-gray-800 active:scale-95 transition-all mt-auto"
              >
                Book Ride
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RideLocation;