import React from 'react'
import CarCard from '../assets/CarCard.png'


const CardCompoTravel = () => {
    return (
        <div>
            <div>
                <div className='h-100 w-90'>
                    <img className='object-contain' src={CarCard} />
                </div>
                <div>
                    Ride options
                </div>
                <div className='text-gray-500'>
                    There’s more than one way to move with Uber, no matter where you are or where you’re headed next.
                </div>
            </div>
        </div>
    )
}

export default CardCompoTravel
