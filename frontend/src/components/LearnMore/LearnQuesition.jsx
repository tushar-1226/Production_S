import React from 'react'
import { ChevronDown } from 'lucide-react';
import Line from '../Line'

const LearnQuestion = () => {
  return (
    <div className=' w-full h-auto lg:h-150 flex flex-col gap-13 px-5 bg-white lg:px-40 pt-15'>
      <div className='text-4xl font-bold text-[#333333]'>
        Frequently asked questions
      </div>
      <div className='flex flex-col  lg:gap-0 justify-between h-full hover:cursor-pointer'>
        <div className=' w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>How many friends can I ride with?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>How many stops can I add?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full h-auto'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>How do I invite friends?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>How do I split the cost?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>Does splitting the price take time and distance into account for each person?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
        <div className='flex w-full'>
          <button className='w-full flex justify-between items-center hover:cursor-pointer'><span className='font-semibold text-base text-left'>Where can I find the group rides option?</span> <span className='flex-shrink-0'><ChevronDown strokeWidth={4} size={18} /></span></button>
        </div>
        <Line/>
      </div>
    </div>
  )
}

export default LearnQuestion
