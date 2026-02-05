import React from 'react'
import { MapPinIcon } from "@heroicons/react/24/solid";
import { TagIcon } from "@heroicons/react/24/solid";
import { Navigation } from 'lucide-react';
import Page from "../assets/page.png";

const Hero = () => {
    
    return (
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-50 w-full  lg:px-0'>
            <div className='flex flex-col gap-15 w-full lg:w-auto'>
                {/* Hero text */}
                <div className='flex flex-col gap-3 sm:w-full'>
                    <div className='flex items-center gap-2 lg:gap-3 sm:w-full'>
                        <MapPinIcon className="lg:h-5 lg:w-5 h-3 w-3 text-black" />
                        <span className='text-sm lg:text-base lg:text-font-medium'>Lucknow, IN</span>
                        <span className='text-base  hover:bg-gray-100 hover:rounded-full cursor-pointer'><u>Change city</u></span>
                    </div>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='lg:text-5xl text-4xl font-extrabold lg:w-100  w-full'>Request a ride for now or later</div>
                        <div className='lg:text-5xl font-extrabold sm:w-full'></div>
                    </div>
                </div>

                <div className='flex flex-col gap-9'>
                    {/* Map text */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2'>
                            <span>
                                <TagIcon className="h-4 w-4 text-green-600" />
                            </span>

                            <span className='text-sm'>
                                <span className='font-medium'>Up to 50% off your first 5 Uber rides.</span> T&Cs apply.*
                            </span>
                        </div>
                        <span className='pl-6 text-sm'>
                            *Valid within 15 days of signup.
                        </span>
                    </div>
                    {/* Location */}
                    <div className='flex flex-col gap-4 relative'>
                        <div className='absolute flex flex-col items-center top-5 left-5'>
                            <div className='border-6 rounded-full h-4 w-4'></div>
                            <div className='border-[1px] h-14 '></div>
                            <div className='h-4 w-4 border-5'></div>
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-gray-100 pl-12 pr-43 rounded-[7px] py-7' placeholder='Pickup Location' />
                            <Navigation className='absolute top-4 left-89' />
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-gray-100 pl-12 pr-43 rounded-[7px] py-7' placeholder='Dropoff location' />
                        </div>
                        <div className='flex gap-5'>
                            <button className='text-white bg-black rounded-[8px] px-6 py-3 '><span className='font-semibold'>See prices</span></button>
                            <button className='text-black bg-gray-200 rounded-[8px] px-7 py-3 '><span className='font-semibold'>Schedule for later</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-138 lg:w-750 w-200'>
                <img src={Page} className='object-cover'/>
            </div>
        </div>

    )
}




export default Hero
