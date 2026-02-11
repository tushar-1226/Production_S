import React, { useState } from 'react'
import ReqRideCardforWorld from './ReqRideCardforWorld'
import Card2 from '../../assets/Card2.png'
import carkey from '../../assets/carkey.png'
import yellowtaxi from '../../assets/yellowtaxi.png'
import greencar from '../../assets/greeencar.png'
import uberx from '../../assets/uberx.png'
import hourly from '../../assets/hourly.png'



const ReqRideWorld = () => {

    const [IsActive, setIsActive] = useState('features')

    const moveClasses = {
        features: "left-0 w-25",
        wheels: "left-24 w-27",
        extra: "left-55 w-25",
    }

    const FeaturesArray = [
        {
            image:Card2,
            heading:"Uber Reserve",
            desc:"Book a ride in advance",
            anchor:`Learn more about`
        },
        {
            image:carkey,
            heading:"Uber Rent",
            desc:"Pick a car. See the price. Get moving.",
            anchor:`Learn more about`
        },
        {
            image:yellowtaxi,
            heading:"Uber Taxi",
            desc:"Local taxi cabs at the tap of a button",
            anchor:`Learn more about`
        },
        {
            image:yellowtaxi,
            heading:"Uber Taxi",
            desc:"Local taxi cabs at the tap of a button",
            anchor:`Learn more about`
        },
        {
            image:greencar,
            heading:"Uber Green",
            desc:"Sustainable rides in electric vehicles and hybrid vehicles",
            anchor:`Learn more about`
        },
        {
            image:uberx,
            heading:"UberX",
            desc:"Affordable rides, all to yourself",
            anchor:`Learn more about`
        },
        {
            image:hourly,
            heading:"Hourly",
            desc:"As many stops as you need in one car",
            anchor:`Learn more about`
        },
        {

        }
    ] 

    

    return (
        <div className='w-full py-30 flex flex-col gap-8'>
            <div className='text-4xl font-semibold text-[#333333]'>
                Rides around the world
            </div>
            <div className='w-185 text-[#333333]'>
                There’s more than one way to move with Uber, no matter where you are or where you’re headed next. Check the app to see which ride options are available near you.*
            </div>
            <div className='relative flex gap-8 pl-4 h-10 text-sm font-semibold'>
                <div onClick={() => setIsActive('features')} className='cursor-pointer'>
                    Features
                </div>
                <div onClick={() => setIsActive('wheels')} className='cursor-pointer'>
                    2 or 3 wheels
                </div>
                <div onClick={() => setIsActive('extra')} className='cursor-pointer'>
                    Extra room
                </div>
                <div className={`absolute bottom-0 z-10 h-[6px] ${moveClasses[IsActive] ?? ""} bg-black transition-all duration-400 ease-out`}></div>
                <div className='h-[6px] w-full bg-gray-400 absolute bottom-0 left-0'></div>
            </div>
            <div>
                {/* features */}
                <ReqRideCardforWorld />
            </div>

        </div>
    )
}

export default ReqRideWorld
