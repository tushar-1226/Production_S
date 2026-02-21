import React from 'react'
import { Navigation, ChevronDown, MapPin, Tag } from 'lucide-react';
import planelanding from "../../assets/planelanding.png";
import { ChevronRight } from 'lucide-react';
import Ubervdo1 from "../../assets/Ubervdo1.mp4";



const SeeHero = () => {
    return (
        <div className='flex flex-col gap-10 py-30 my-10'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-40 w-full lg:px-0  items-center'>
            <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto'>
                {/* Hero text */}
                <div className='flex flex-col gap-2 lg:gap-5 sm:w-full text-white'>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='md:text-5xl  text-5xl font-bold lg:w-110 md:100 w-150 leading-15'>Lock in a little peace of mind with Reserve</div>
                    </div>
                    <div className='text-base font-light w-110'>
                       Get anywhere, stress-free, with flexible pickups and upfront pricing on most trips.¹ Book up to 90 days ahead.
                    </div>
                </div>

                <div className='flex flex-col gap-6'>
                    {/* Location */}
                        <div className='flex flex-col gap-4 relative lg:w-full w-100'>
                        <div className='absolute z-100000 flex flex-col items-center top-5 left-5'>
                            <div className='border-6 rounded-full h-4 w-4'></div>
                            <div className='w-[1px] h-14 bg-white'></div>
                            <div className='h-4 w-4 border-5'></div>
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] py-7 w-full' placeholder='Where from?' />
                            <Navigation className='absolute top-4 right-4' />
                        </div>
                        <div>
                            <input type="text" className='h-10 bg-[#EFEFEF] pl-12 pr-12 rounded-[7px] py-7 w-full' placeholder='Where to?' />
                        </div>
                        <div className='flex gap-5'>
                            <button className='text-black bg-white rounded-[8px] px-6 py-3 '><span className='font-semibold'>See prices</span></button>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-500  rounded-[7px] overflow-hidden lg:block hidden'>
                <video src={Ubervdo1} autoPlay loop muted className='object-cover w-full h-full'></video>
            </div>
        </div>
        </div>

    )
}




export default SeeHero
