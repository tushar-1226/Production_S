import React from 'react'
import CarCard from '../assets/CarCard.png'
import Car2Card from '../assets/Car2Card.png'
import AirCard from '../assets/AirCard.png'



const CardCompoTravel = () => {

    const CardData = [
        {
            image: CarCard,
            heading: "Ride options",
            description: "There’s more than one way to move with Uber, no matter where you are or where you’re headed next.",
            button: "Search ride options"
        },
        {
            image: AirCard,
            heading: "700+ airports",
            description: `TYou can request a ride to and from most major airports. ${<u>Schedule</u>} a ride to the airport for one less thing to worry about.`,
            button: "Search airports"
        },
        {
            image: Car2Card,
            heading: "15,000+ cities",
            description: "The app is available in thousands of cities worldwide, so you can request a ride even when you’re far from home.",
            button: "Search cities"
        }
    ]
    console.log("CardCompoTravel");
    console.log("CardCompoTravel");
    console.log("CardCompoTravel"); 
    console.log("CardCompoTravel");



    return (
        <div className='flex'>
            <div className='flex justify-between gap-5 w-90'>
                {
                    CardData.map((item, index) => {
                        return (
                            <div className='flex flex-col gap-5 w-90'>
                                <div className='h-90 w-90 bg-amber-300'>
                                    <img className='object-contain' src={item.image} />
                                </div>
                                <div className='text-lg font-medium'>
                                    {item.heading}
                                </div>
                                <div className='text-gray-700 w-90'>
                                    {item.description}
                                </div>
                                <div>
                                    <button className='px-8 py-3 bg-black text-white rounded-[10px] font-medium'>
                                        {item.button}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default CardCompoTravel
