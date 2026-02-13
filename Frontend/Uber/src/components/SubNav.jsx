import React from 'react'
import { ChevronDown } from "lucide-react";

const SubNav = () => {
  return (
    <div className="lg:px-22 w-full h-16 px-5 flex items-center  justify-between absolute top-16 left-0 z-10 bg-white">
      <div className='font-bold text-2xl pl-1.5 lg:w-auto w-full flex items-center gap-1' style={{ fontFamily: "Inter, system-ui, sans-serif" }} >
        <span className='font-bold text-2xl'>Ride</span>
        <ChevronDown size={20} strokeWidth={1} className='lg:hidden block'/>
      </div>
      <div className='flex flex-row text-gray-600 font-light text-sm justify-between whitespace-nowrap gap-5.5 pr-4 '>
        <div className='cursor-pointer hover:text-black hidden lg:block'>Request a ride</div>
        <div className='cursor-pointer hover:text-black hidden lg:block'>Reserve a ride</div>
        <div className='cursor-pointer hover:text-black hidden lg:block'>See prices</div>
        <div className='cursor-pointer hover:text-black hidden lg:block'>Explore ride options</div>
        <div className='cursor-pointer hover:text-black hidden lg:block'>Airport rides</div>
      </div>
    </div>
  )
}

export default SubNav
