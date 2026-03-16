import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Navigation, ChevronDown, MapPin, Tag, Calendar, Clock, X } from 'lucide-react';
import Page from "../assets/page.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Hero = () => {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const dateInputRef = useRef(null);
    const timeInputRef = useRef(null);

    const [pickupQuery, setPickupQuery] = useState("");
    const [dropoffQuery, setDropoffQuery] = useState("");
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [isLocating, setIsLocating] = useState(false);

    const navigate = useNavigate();

    const getCurrentLocation = () => {
      if (!navigator.geolocation) return;
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get("https://photon.komoot.io/reverse", {
              params: { lon: longitude, lat: latitude },
            });
            if (res.data?.features?.length > 0) {
              const props = res.data.features[0].properties;
              const address = Array.from(new Set([props.name, props.street, props.city].filter(Boolean))).join(", ");
              setPickup({ name: address, lat: latitude, lng: longitude });
              setPickupQuery(address);
            }
          } catch (err) {
            console.error(err);
          } finally {
            setIsLocating(false);
            setActiveField(null);
          }
        },
        (error) => setIsLocating(false),
        { enableHighAccuracy: true }
      );
    };

    const fetchSuggestions = async (query, setter) => {
      if (query.length < 3) return setter([]);
      try {
        const res = await axios.get(`http://localhost:3003/api/maps/suggestions`, {
          params: { input: query }
        });
        if (Array.isArray(res.data)) {
          setter(res.data.map(f => ({
            display_name: f.display_name,
            lat: parseFloat(f.lat),
            lon: parseFloat(f.lon),
          })));
        } else {
          setter([]);
        }
      } catch (err) {
        setter([]);
      }
    };

    const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

    useEffect(() => {
      if (activeField === "pickup") debouncedFetch(pickupQuery, setPickupSuggestions);
      else if (activeField === "dropoff") debouncedFetch(dropoffQuery, setDropoffSuggestions);
    }, [pickupQuery, dropoffQuery, activeField]);

    const handleSearch = () => {
        if (pickup && dropoff) {
            navigate('/ride', { state: { initialPickup: pickup, initialDropoff: dropoff } });
        }
    };

    return (
        <div className='flex flex-col pt-16 lg:pt-20 lg:flex-row gap-8 lg:gap-50 w-full lg:px-0'>
            <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto relative'>
                <style>
                  {`
                  @keyframes slideUp {
                    from { transform: translateY(10%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                  }
                `}
                </style>
                {/* Hero text */}
                <div className='flex flex-col gap-2 lg:gap-3 sm:w-full'>
                    <div className='flex items-center gap-2 lg:gap-3 sm:w-full'>
                        <MapPin className="lg:h-5 lg:w-5 h-3 w-3 text-black" />
                        <span className='text-sm lg:text-base lg:text-font-medium'>Lucknow, IN</span>
                        <span className='text-base  hover:bg-gray-100 hover:rounded-full cursor-pointer'><u>Change city</u></span>
                    </div>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='md:text-5xl  text-4xl font-extrabold lg:w-100 md:w-100 w-80'>Request a ride for now or later</div>
                    </div>
                </div>

                <div className='flex flex-col gap-6 relative z-10'>
                    {/* Schedule Popup */}
                    {isScheduleOpen && (
                      <div className="absolute top-20 left-0 bg-white z-50 rounded-2xl p-4 flex flex-col gap-4 shadow-xl border border-gray-100 w-full max-w-[320px]" style={{ animation: 'slideUp 0.2s ease-out' }}>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Schedule a Ride</h3>
                          <button onClick={() => setIsScheduleOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                            <X size={20} />
                          </button>
                        </div>

                        <div className="text-sm font-medium">When do you want to be picked up?</div>

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
                                className="bg-transparent text-sm outline-none flex-1 cursor-pointer font-medium w-full"
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
                                className="bg-transparent text-sm outline-none flex-1 cursor-pointer font-medium w-full"
                                onClick={(e) => e.preventDefault()}
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsScheduleOpen(false)}
                          className="mt-2 w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 active:scale-95 transition-all shadow-md text-sm"
                        >
                          Confirm Schedule
                        </button>
                      </div>
                    )}

                    {/* Map text */}
                    <div className='flex flex-col gap-5'>
                        <div className=''>
                            <div className='flex items-center gap-2'>
                                <span>
                                    <Tag className="h-4 w-4 text-green-600" />
                                </span>

                                <span className='text-xs lg:text-sm'>
                                    <span className='font-medium'>Up to 50% off your first 5 Uber rides.</span>
                                    <span className='text-xs lg:text-sm'>T&Cs apply.*</span>
                                </span>
                            </div>

                            <span className='pl-6 text-xs lg:text-sm'>
                                *Valid within 15 days of signup.
                            </span>
                        </div>
                        <div>
                            <button 
                                onClick={() => setIsScheduleOpen(true)}
                                className='flex gap-2 bg-[#EFEFEF] px-4 py-3 rounded-full items-center hover:bg-gray-200 active:scale-95 transition-all w-fit cursor-pointer'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>
                                <span className='text-base font-medium'>Pickup now</span>
                                <ChevronDown size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                    {/* Location */}
                    <div className='flex flex-col gap-4 relative lg:w-full z-20'>
                        <div className='absolute z-[1] flex flex-col items-center top-[18px] left-5'>
                            <div className='border-6 rounded-full h-4 w-4'></div>
                            <div className='w-1 h-14 bg-black'></div>
                            <div className='h-4 w-4 border-5'></div>
                        </div>

                        {/* Pickup Input */}
                        <div className='relative'>
                            <input 
                              type="text" 
                              className='h-12 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] w-full outline-none focus:ring-2 focus:ring-black transition-all' 
                              placeholder='Pickup Location' 
                              value={pickupQuery}
                              onChange={(e) => setPickupQuery(e.target.value)}
                              onFocus={() => setActiveField("pickup")}
                            />
                            <button 
                              onClick={getCurrentLocation}
                              className='absolute top-3 right-4 hover:bg-gray-200 p-1 rounded-full transition-colors cursor-pointer'
                            >
                              {isLocating ? (
                                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Navigation size={20} />
                              )}
                            </button>
                            {activeField === "pickup" && pickupSuggestions.length > 0 && (
                              <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
                                {pickupSuggestions.map((s, i) => (
                                  <li
                                    key={i}
                                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none text-sm"
                                    onClick={() => {
                                      setPickup({ name: s.display_name, lat: s.lat, lng: s.lon });
                                      setPickupQuery(s.display_name);
                                      setPickupSuggestions([]);
                                      setActiveField(null);
                                    }}
                                  >
                                    {s.display_name}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>

                        {/* Dropoff Input */}
                        <div className='relative'>
                            <input 
                              type="text" 
                              className='h-12 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] w-full outline-none focus:ring-2 focus:ring-black transition-all' 
                              placeholder='Dropoff location' 
                              value={dropoffQuery}
                              onChange={(e) => setDropoffQuery(e.target.value)}
                              onFocus={() => setActiveField("dropoff")}
                            />
                            {activeField === "dropoff" && dropoffSuggestions.length > 0 && (
                              <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
                                {dropoffSuggestions.map((s, i) => (
                                  <li
                                    key={i}
                                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-none text-sm"
                                    onClick={() => {
                                      setDropoff({ name: s.display_name, lat: s.lat, lng: s.lon });
                                      setDropoffQuery(s.display_name);
                                      setDropoffSuggestions([]);
                                      setActiveField(null);
                                    }}
                                  >
                                    {s.display_name}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>

                        <div className='flex gap-3 sm:gap-5 mt-2'>
                            <button 
                              onClick={handleSearch}
                              disabled={!pickup || !dropoff}
                              className={`rounded-[8px] px-4 sm:px-6 py-3 transition-all ${pickup && dropoff ? 'bg-black text-white hover:opacity-80 active:scale-95 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                              <span className='font-medium sm:font-semibold'>See prices</span>
                            </button>
                            <button className='text-black bg-[#EFEFEF] hover:bg-gray-200 rounded-[8px] px-4 sm:px-6 py-3 transition-colors cursor-pointer'>
                              <span className='font-medium sm:font-semibold'>Schedule for later</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-138 lg:max-w-[750px] lg:block hidden'>
                <img src={Page} className='object-cover w-full h-full block' />
            </div>
        </div>
    )
}

export default Hero
