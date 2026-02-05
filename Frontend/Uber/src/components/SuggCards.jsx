import React from 'react'
import Card1 from '../assets/card1.png'
import Card2 from '../assets/card2.png'
import Card3 from '../assets/card3.png'
import Card4 from '../assets/card4.png'
import Card5 from '../assets/card5.png'
import Card6 from '../assets/card6.png'

const SuggCards = () => {
    console.log("CardSection");

    const CardImage = [
        {
            Heading: "Ride",
            image: Card1,
            Description: "Go anywhere with Uber. Request a ride, hop in, and go."
        },
        {
            Heading: "Reserve",
            image: Card2,
            Description: "Reserve your ride in advance so you can relax on the day of your trip."
        },
        {
            Heading: "Intercity",
            image: Card3,
            Description: "Get convenient, affordable outstation cabs anytime at your door."
        },
        {
            Heading: "Courier",
            image: Card4,
            Description: "Uber makes same-day item delivery easier than ever."
        },
        {
            Heading: "Rentals",
            image: Card5,
            Description: "Request a trip for a block of time and make multiple stops."
        },
        {
            Heading: "Bike",
            image: Card6,
            Description: "Get affordable motorbike rides in minutes at your doorstep."
        }
    ];
    console.log("CardSection");


    return (
        <div className='flex flex-wrap justify-between gap-5'>
            {
                CardImage.map((item, index) => {
                    return (
                        <div className={`h-40 w-92 bg-gray-100 p-4 flex justify-between items-center rounded-[10px] ${index>=3 ? "hidden lg:flex":"flex"} `}>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <div className='font-semibold text-base'>{item.Heading}</div>
                                    <div className='font-light text-xs'>{item.Description}</div>
                                </div>
                                <button className='bg-white rounded-full px-1 py-2 w-18 font-medium text-sm'>Details</button>
                            </div>
                            <div className='h-48 w-48'>
                                <img className='object-contain h-full w-full' src={item.image}  />
                            </div>
                        </div>
                    )
                })
            }

        </div>
        // <div className="flex flex-wrap gap-5">
        //     {CardImage.map((item, index) => (
        //         <div key={index} className={`h-40 w-full sm:w-[48%] lg:w-[32%] bg-gray-100 p-4 flex items-center justify-between rounded-[10px] overflow-hidden ${index >= 3 ? "hidden lg:flex" : "flex"}`}>
        //             <div className="flex flex-col gap-4 max-w-[70%]">
        //                 <div>
        //                     <div className="font-semibold text-base">
        //                         {item.Heading}
        //                     </div>
        //                     <div className="font-light text-xs">
        //                         {item.Description}
        //                     </div>
        //                 </div>

        //                 <button className="bg-white rounded-full px-3 py-1 w-fit font-medium text-sm">
        //                     Details
        //                 </button>
        //             </div>

        //             <img
        //                 src={item.image}
        //                 className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
        //                 alt={item.Heading}
        //             />
        //         </div>
        //     ))}
        // </div>

    )
}

export default SuggCards
