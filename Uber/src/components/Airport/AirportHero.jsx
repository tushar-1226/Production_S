import React from 'react'
import { Navigation, ChevronDown, MapPin, Tag } from 'lucide-react';
import planelanding from "../../assets/planelanding.png";
import { ChevronRight } from 'lucide-react';



const AirportHero = () => {
    return (
        <div className='flex flex-col gap-10 py-8'>
            <div className='flex items-center text-[#333333]'>
                <a href=""><u className='underline-offset-4'>Home</u></a>
                <ChevronRight size={15} strokeWidth={2}/>
                <a href=""><u className='underline-offset-4'>Ride</u></a>
                <ChevronRight size={15} strokeWidth={2}/>
                <span>Airport</span>
            </div>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-40 w-full lg:px-0  items-center'>
            <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto'>
                {/* Hero text */}
                <div className='flex flex-col gap-2 lg:gap-5 sm:w-full'>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='md:text-4xl  text-3xl font-bold lg:w-100 md:100 w-150'>Airport rides are better with Uber</div>
                    </div>
                    <div className='text-base font-light w-110'>
                        Request a ride to over 700 airports around the world. In most regions, you’ll also have the option to schedule an airport pickup or dropoff in advance.
                    </div>
                </div>

                <div className='flex flex-col gap-6'>
                    {/* Location */}
                        <div className='flex flex-col gap-4 relative lg:w-full w-100'>
                        <div className='absolute z-100000 flex flex-col items-center top-5 left-5'>
                            <div className='border-6 rounded-full h-4 w-4'></div>
                            <div className='w-[1px] h-14 bg-black'></div>
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
            <div className='w-500  rounded-[7px] overflow-hidden lg:block hidden'>
                <img src={planelanding} className='object-cover w-full h-full block' />
            </div>
        </div>
        </div>

    )
}




export default AirportHero
