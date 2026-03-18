import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navigation, MapPin, Tag, ChevronDown, Clock, Calendar, X, ChevronRight } from 'lucide-react';
import planelanding from "../../assets/planelanding.png";
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

const AirportHero = () => {
    const [pickupQuery, setPickupQuery] = useState("");
    const [dropoffQuery, setDropoffQuery] = useState("");
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    
    // Scheduling state
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const dateInputRef = useRef(null);
    const timeInputRef = useRef(null);
    
    const navigate = useNavigate();

    const getCurrentLocation = () => {
        if (!navigator.geolocation) return;
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/maps/reverse-geocode`, {
                        params: { lon: longitude, lat: latitude },
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });

                    if (res.data?.display_name) {
                        const address = res.data.display_name;
                        setPickup({ name: address, lat: latitude, lng: longitude });
                        setPickupQuery(address);
                    } else {
                        setPickup({ name: "Current Location", lat: latitude, lng: longitude });
                        setPickupQuery("Current Location");
                    }
                } catch (err) {
                    console.error(err);
                    setPickup({ name: "Current Location", lat: latitude, lng: longitude });
                    setPickupQuery("Current Location");
                } finally {
                    setIsLocating(false);
                    setActiveField(null);
                }
            },
            () => setIsLocating(false),
            { enableHighAccuracy: true }
        );
    };

    const fetchSuggestions = async (query, setter, currentField) => {
        if (query.length < 3) {
            if (currentField === "pickup") {
                setter([{ display_name: "Current Location", isCurrentLocation: true }]);
            } else {
                setter([]);
            }
            return;
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/maps/suggestions`, {
                params: { input: query },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const currentLocationOption = currentField === "pickup"
                ? [{ display_name: "Current Location", isCurrentLocation: true }]
                : [];

            if (Array.isArray(res.data)) {
                const apiSuggestions = res.data.map((f) => ({
                    display_name: f.display_name,
                    lat: parseFloat(f.lat),
                    lon: parseFloat(f.lon),
                }));
                setter([...currentLocationOption, ...apiSuggestions]);
            } else {
                setter(currentLocationOption);
            }
        } catch (err) {
            console.error("Suggestions fetch error:", err);
            const fallbackOption = currentField === "pickup"
                ? [{ display_name: "Current Location", isCurrentLocation: true }]
                : [];
            setter(fallbackOption);
        }
    };

    const fetchRef = useRef(fetchSuggestions);
    useEffect(() => {
        fetchRef.current = fetchSuggestions;
    });

    const debouncedFetch = useCallback(debounce((...args) => fetchRef.current(...args), 300), []);

    useEffect(() => {
        if (activeField === "pickup") debouncedFetch(pickupQuery, setPickupSuggestions, activeField);
        else if (activeField === "dropoff") debouncedFetch(dropoffQuery, setDropoffSuggestions, activeField);
    }, [pickupQuery, dropoffQuery, activeField, debouncedFetch]);

    const handleSearch = () => {
        if (pickup && dropoff) {
            navigate('/ride', { state: { pickup, dropoff } });
        }
    };

    return (
        <div className='flex flex-col gap-10 py-8 relative'>
            <div className='flex items-center text-[#333333]'>
                <a href="/"><u className='underline-offset-4 cursor-pointer'>Home</u></a>
                <ChevronRight size={15} strokeWidth={2}/>
                <a href="/ride"><u className='underline-offset-4 cursor-pointer'>Ride</u></a>
                <ChevronRight size={15} strokeWidth={2}/>
                <span>Airport</span>
            </div>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-40 w-full lg:px-0 items-center relative'>
                <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto relative'>
                    <style>
                        {`
                        @keyframes slideUp {
                            from { transform: translateY(10%); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                        `}
                    </style>
                    
                    {/* Schedule Popup */}
                    {isScheduleOpen && (
                        <div className="absolute top-32 left-0 bg-white z-50 rounded-2xl p-4 flex flex-col gap-4 shadow-xl border border-gray-100 w-full max-w-[320px]" style={{ animation: 'slideUp 0.2s ease-out' }}>
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

                    {/* Hero text */}
                    <div className='flex flex-col gap-2 lg:gap-5 sm:w-full relative z-10'>
                        <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                            <div className='md:text-4xl text-3xl font-bold lg:w-100 md:100 w-full'>Airport rides are better with Uber</div>
                        </div>
                        <div className='text-base font-light w-full lg:w-110'>
                            Request a ride to over 700 airports around the world. In most regions, you’ll also have the option to schedule an airport pickup or dropoff in advance.
                        </div>
                    </div>

                    <div className='flex flex-col gap-6'>
                        {/* Location Inputs */}
                        <div className='flex flex-col gap-4 relative w-full lg:w-[450px] z-20'>
                            <div className='absolute z-[1] flex flex-col items-center top-[22px] left-5'>
                                <div className='border-6 rounded-full h-4 w-4'></div>
                                <div className='w-1 h-[44px] bg-black'></div>
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
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    if (s.isCurrentLocation) {
                                                        getCurrentLocation();
                                                    } else {
                                                        setPickup({ name: s.display_name, lat: s.lat, lng: s.lon });
                                                        setPickupQuery(s.display_name);
                                                    }
                                                    setPickupSuggestions([]);
                                                    setActiveField(null);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {s.isCurrentLocation ? <Navigation size={16} className="text-blue-500" /> : <MapPin size={16} className="text-gray-500" />}
                                                    <span className={s.isCurrentLocation ? "text-blue-500 font-medium" : ""}>{s.display_name}</span>
                                                </div>
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
                                    placeholder='Dropoff location (e.g. Airport)'
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
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    if (s.isCurrentLocation) {
                                                        getCurrentLocation();
                                                    } else {
                                                        setDropoff({ name: s.display_name, lat: s.lat, lng: s.lon });
                                                        setDropoffQuery(s.display_name);
                                                    }
                                                    setDropoffSuggestions([]);
                                                    setActiveField(null);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {s.isCurrentLocation ? <Navigation size={16} className="text-blue-500" /> : <MapPin size={16} className="text-gray-500" />}
                                                    <span className={s.isCurrentLocation ? "text-blue-500 font-medium" : ""}>{s.display_name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            
                            <div className='flex gap-5 mt-2'>
                                <button
                                    onClick={handleSearch}
                                    disabled={!pickup || !dropoff}
                                    className={`rounded-[8px] px-4 sm:px-6 py-3 transition-all ${pickup && dropoff ? 'bg-black text-white hover:opacity-80 active:scale-95 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                >
                                    <span className='font-medium sm:font-semibold'>See prices</span>
                                </button>
                                <button onClick={() => setIsScheduleOpen(true)} className='text-black bg-[#EFEFEF] hover:bg-gray-200 rounded-[8px] px-4 sm:px-6 py-3 transition-colors cursor-pointer'>
                                    <span className='font-medium sm:font-semibold'>Schedule for later</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-500 rounded-[7px] overflow-hidden lg:block hidden z-10'>
                    <img src={planelanding} className='object-cover w-full h-full block' alt="Plane Landing" />
                </div>
            </div>
        </div>
    );
};

export default AirportHero;
