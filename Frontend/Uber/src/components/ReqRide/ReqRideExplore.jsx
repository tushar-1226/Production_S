import React from 'react'
import gas from '../../assets/gas.png'
import opendoor from '../../assets/opendoor.png'
import road from '../../assets/road.png'
import ReqRideCardforWorld from './ReqRideCardforWorld'
import fuel from '../../assets/fuel.png'
import auntdriving from '../../assets/auntdriving.png'
import talkinggirls from '../../assets/talkinggirls.png'
import messyhair from '../../assets/messyhair.png'
import chevrolet from '../../assets/chevrolet.png'

const ReqRideExplore = () => {
    const CardData3 = [
        {
            image: fuel,
            heading: "Go green",
            desc: "Move toward a greener future with eco-friendly ride options. It’s the perfect way to be a more conscious traveler.",
            anchor: `Learn more`
        },
        {
            image: auntdriving,
            heading: "Our Door-to-Door Safety Standard",
            desc: "We’ve introduced new policies and features to help keep everyone safe, including a mandatory mask policy and free disinfectant supplies for drivers.",
            anchor: `Learn more`
        },
        {
            image: talkinggirls,
            heading: "Go further, get more with Uber One",
            desc: "See and do it all with one membership that lets you save on all your rides and eats.",
            anchor: `Learn more`
        }
    ]

    const CardData2 = [
        {
            image: messyhair,
            heading: "Ride with Uber in 15,000+ cities",
            desc: "Travel around cities worldwide, with access to rides almost everywhere.",
            anchor: `Learn more`
        },
        {
            image: chevrolet,
            heading: "Go green",
            desc: "The world is ready for your arrival. Start your travels with a ride to the airport. In most regions you’ll also have the option to schedule an airport pickup or dropoff in advance.",
            anchor: `Learn more`
        }
    ]


    return (
        <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center w-full py-15'>
            <div className='lg:text-4xl text-2xl w-full font-bold'>
                Explore the globe with Uber
            </div>
            {/* 2 Cards div */}
            <div className='flex items-start justify-between gap-5 '>
                {CardData2.map((item, index) => (
                    <div key={index} className='flex flex-col gap-5'>

                        <div className='w-140 overflow-hidden' >
                            <img className='object-cover h-full w-full' src={item.image} alt="" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='text-lg font-medium w-140'>
                                {item.heading}
                            </div>

                            <div className='text-[#333333] font-light text-base w-140'>
                                {item.desc}
                            </div>
                        </div>

                        <div className='text-[#2f2f2f] font-lg'>
                            <u className='underline-offset-8 decoration-gray-300'>
                                Learn more
                            </u>
                        </div>

                    </div>
                ))}
            </div>
            {/* 3 Cards div */}
            <div className='w-full'>
                <div className='w-full'>
                    <div className='flex items-start justify-between gap-5 w-full'>
                        {CardData3.map((item, index) => (
                            <div key={index} className='flex flex-col gap-5'>

                                <div className='w-90 overflow-hidden'>
                                    <img className='object-cover h-full w-full' src={item.image} alt="" />
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <div className='text-lg font-medium w-85'>
                                        {item.heading}
                                    </div>

                                    <div className='text-[#333333] font-light text-base w-90'>
                                        {item.desc}
                                    </div>
                                </div>

                                <div className='text-[#2f2f2f] font-lg'>
                                    <u className='underline-offset-8 decoration-gray-300'>
                                        Learn more
                                    </u>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReqRideExplore
