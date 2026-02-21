import React from 'react'
import { Navigation, ChevronDown, MapPin, Tag } from 'lucide-react';
import planelanding from "../../assets/planelanding.png";
import { ChevronRight } from 'lucide-react';
import Learn3people from "../../assets/Learn3people.png";

const LearnHero = () => {
    return (
        <div className='flex flex-col gap-10 py-8 text-white pt-20'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-40 w-full lg:px-0  items-center'>
            <div className='flex flex-col gap-5 lg:gap-13 w-full lg:w-auto'>
                {/* Hero text */}
                <div className='flex flex-col gap-8 lg:gap-8 sm:w-full'>
                    <div className='flex flex-col gap-3 sm:w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                        <div className='md:text-5xl  text-5xl font-bold lg:w-100 md:100 w-150'>Ride with friends seamlessly</div>
                    </div>
                    <div className='text-base font-light w-110'>
                        Riding with friends just got easier: set up a group ride in the Uber app, invite your friends, and arrive at your destination. Friends who ride together save together.
                    </div>
                </div>
            </div>
            <div className='w-500  overflow-hidden lg:block hidden'>
                <img src={Learn3people} className='object-cover w-full h-full block' />
            </div>
        </div>
        </div>

    )
}




export default LearnHero
