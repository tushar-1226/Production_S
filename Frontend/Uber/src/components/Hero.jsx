import React from 'react'
import { MapPinIcon } from "@heroicons/react/24/solid";
import { TagIcon } from "@heroicons/react/24/solid";
import { Navigation } from 'lucide-react';
import Page from "../assets/page.png";

const Hero = () => {
    console.log("Hero");
    console.log("hero2")
    console.log("hero3")
    console.log("hero4")
    console.log("hero6")
    console.log("hero5")
    
    return (
        <div className='flex gap-50'>
            <div className='pt-6 flex flex-col gap-15'>
                {/* Hero text */}
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <MapPinIcon className="h-5 w-5 text-black" />
                        <span className='font-medium'>Lucknow,IN</span>
                        <span className='text-base hover:bg-gray-100 hover:rounded-full cursor-pointer'><u>Change city</u></span>
                    </div>
                    <div className='flex flex-col gap-3' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='text-5xl font-extrabold whitespace-nowrap'>Request a ride for</div>
                        <div className='text-5xl font-extrabold'>now or later</div>
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
            <div className='h-138 w-750'>
                <img src={Page} className='object-cover'/>
            </div>
        </div>

    )
}




export default Hero
