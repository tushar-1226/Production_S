import React from 'react'
import { ChevronDown } from 'lucide-react';
import Line from '../Line'

const AirportQuestion = () => {
  return (
    <div className='pb-16 w-full h-auto lg:h-110 flex flex-col gap-13 px-5 '>
      <div className='text-4xl font-bold text-[#333333]'>
        Top questions about airport rides
      </div>
      <div className='flex flex-col gap-3 lg:gap-0 justify-between h-full hover:cursor-pointer'>
        <div className=' w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>How much will my airport ride cost?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>What vehicles are available for airport trips?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full h-auto'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'> Will all of my luggage fit in the car?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>Can I reserve a ride with Uber to and from the airport?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>At what point after I've landed should I request a ride?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>How long will my driver wait for me at the airport?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
      </div>
    </div>
  )
}

export default AirportQuestion
