import React from 'react'
import airportvdo1 from "../../assets/airportvdo1.mp4";
import airportvdo2 from "../../assets/airportvdo2.mp4";
import airportvdo3 from "../../assets/airportvdo3.mp4";
import airportvdo4 from "../../assets/airportvdo4.mp4";

const SeeVideoCards = () => {

    const CardData = [
        {
            heading: "Lock it in¹",
            disc: "With upfront pricing, you receive an estimated fare. Just reserve your ride and prepare for pickup.",
            vdo: airportvdo1
        },
        {
            heading: "Get picked up when you need it",
            disc: "Uber technology helps ensure that you’re picked up on time for a stress-free ride.²",
            vdo: airportvdo2
        },
        {
            heading: "Ride on your time, whenever that may be",
            disc: "Plans changed? Cancel at no charge up to one hour in advance.³",
            vdo: airportvdo3
        },
        {
             heading: "From doorstep to departure",
            disc: "Reserving a ride to the airport? Select your airline, find your flight, and confirm your pickup time.",
            vdo: airportvdo4
        }
    ]

    return (
        <div className='w-full'>
            <div className='w-full flex flex-col gap-20'>
                {
                    CardData.map((item, index) => {
                        return (
                            <div key={index} className={`flex items-center w-full ${index%2 != 0 ? "flex-row-reverse" : "flex-row"}`}>
                                <div className='w-1/2'>
                                    <video src={item.vdo} autoPlay loop muted className='object-cover w-full h-full'></video>
                                </div>
                                <div className={`text-white w-1/2 flex flex-col gap-5 ${index%2 != 0 ? "pr-46" : "p-18"}`}>
                                    <div className={`font-semibold ${index === 3 ? "text-5xl":"text-4xl"}`}>
                                        {item.heading}
                                    </div>
                                    <div>
                                        {item.disc}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SeeVideoCards
