import React from 'react'
import { Navigation, ChevronDown, MapPin, Tag } from 'lucide-react';
import Page from "../assets/page.png";

const Hero = () => {
    


    return (
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-50 w-full lg:px-0'>
            <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto'>
                {/* Hero text */}
                <div className='flex flex-col gap-2 lg:gap-3 sm:w-full'>
                    <div className='flex items-center gap-2 lg:gap-3 sm:w-full'>
                        <MapPin className="lg:h-5 lg:w-5 h-3 w-3 text-black" />
                        <span className='text-sm lg:text-base lg:text-font-medium'>Lucknow, IN</span>
                        <span className='text-base  hover:bg-gray-100 hover:rounded-full cursor-pointer'><u>Change city</u></span>
                    </div>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='md:text-5xl  text-4xl font-extrabold lg:w-100 md:100 w-150'>Request a ride for now or later</div>
                    </div>
                </div>

                <div className='flex flex-col gap-6'>
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
                            <button className='flex gap-2 bg-[#EFEFEF] px-4 py-3 rounded-full items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>
                                <span className='text-base font-medium'>Pickup now</span>
                                <ChevronDown size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                    {/* Location */}
                        <div className='flex flex-col gap-4 relative lg:w-full w-100'>
                        <div className='absolute z-100000 flex flex-col items-center top-5 left-5'>
                            <div className='border-6 rounded-full h-4 w-4'></div>
                            <div className='w-1 h-14 '></div>
                            <div className='h-4 w-4 border-5'></div>
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] py-7 w-full' placeholder='Pickup Location' />
                            <Navigation className='absolute top-4 right-4' />
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] py-7 w-full' placeholder='Dropoff location' />
                        </div>
                        <div className='flex gap-5'>
                            <button className='text-white bg-black rounded-[8px] px-6 py-3 '><span className='font-semibold'>See prices</span></button>
                            <button className='text-black bg-gray-200 rounded-[8px] px-7 py-3 '><span className='font-semibold'>Schedule for later</span></button>
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
