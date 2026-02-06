import React from 'react'
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChevronDown } from 'lucide-react';
import Line from './Line'

const Question = () => {
  return (
    <div className='pb-16 w-full h-auto lg:h-110 flex flex-col gap-13 px-5 lg:px-40'>
      <div className='text-4xl font-bold text-[#333333]'>
        Frequently asked questions
      </div>
      <div className='flex flex-col gap-3 lg:gap-0 justify-between h-full px-5 hover:cursor-pointer'>
        <div className=' w-full'>
          <button className='w-full flex justify-between hover:cursor-pointer'><span className='font-semibold text-base'>Can I have a lost item delivered to me?</span> <span><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between hover:cursor-pointer'><span className='font-semibold text-base'>Can I rent a car using Uber?</span> <span><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between hover:cursor-pointer'><span className='font-semibold text-base'>Can I request a ride that picks up a friends in different locations?</span> <span><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between hover:cursor-pointer'><span className='font-semibold text-base'>Can I request a taxi on Uber?</span> <span><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between hover:cursor-pointer'><span className='font-semibold text-base'>Is there an Uber ride option for 5 peoples?</span> <span><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
      </div>
    </div>
  )
}

export default Question
