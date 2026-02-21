import React from 'react'
import wlogo from '../../assets/wlogo.png'
import car from '../../assets/car.png'
import key from '../../assets/key.png'
import eat from '../../assets/eat.png'

const RideMapNav = () => {
  return (
    <div className='h-16 border-b-4 border-gray-200 fixed left-0 top-0 z-100000 w-full overflow-hidden flex items-center px-16 justify-between '>
      {/* Right section */}
      <div className='flex items-center gap-20'>
        <div className='h-20 w-25'>
          <img className='object-cover h-full w-full' src={wlogo} alt="" />
        </div>
        <div className='pt-3 flex gap-3'>
          <div className='flex items-center'>
            <div className='w-10'><img className='object-cover w-full h-full' src={car} alt="" /></div>
            <span className='text-sm font-medium'>
              Ride
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-10'><img className='object-cover w-full h-full' src={key} alt="" /></div>
            <span className='text-sm font-medium'>
              Rent
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-10'><img className='object-cover w-full h-full' src={eat} alt="" /></div>
            <span className='text-sm font-medium'>
              Eat
            </span>
          </div>
        </div>
      </div>
      {/* left section */}
      <div>
        <div className='flex gap-2'>
          <button className='flex gap-2 py-1 px-2 hover:bg-gray-200 rounded-full items-center cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            <span className='text-sm font-medium'>Login</span>
          </button>

          <button className='flex gap-1 py-2 px-3 rounded-full items-center bg-black text-white cursor-pointer text-sm font-medium'>
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default RideMapNav
