import React from 'react'
import van from '../../assets/van.png'

const ReqRideCardforWorld = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='w-85 bg-blue-700'>
        <img className='object-cover h-full w-full' src={van} alt="" />
      </div>
      <div className='flex flex-col gap-3'>
      <div className='text-lg font-medium '>
        Uber Shuttle
      </div>
      <div className='text-[#333333] font-light text-base'>
        Shared A/C rides at affordable prices
      </div>
      </div>
      <div className='text-[#2f2f2f] font-lg font-lg'>
        <u className='underline-offset-8 decoration-gray-300'>Learn more about Uber Shuttle</u>
      </div>
    </div>
  )
}

export default ReqRideCardforWorld
