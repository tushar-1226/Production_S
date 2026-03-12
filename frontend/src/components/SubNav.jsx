import React, { useState } from 'react'
import { ChevronDown } from "lucide-react";

const SubNav = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="lg:px-22 w-full h-16 px-5 flex items-center  justify-between absolute top-16 left-0 z-10 bg-white">
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='font-bold text-2xl pl-1.5 lg:w-auto w-full flex items-center gap-1 cursor-pointer' style={{ fontFamily: "Inter, system-ui, sans-serif" }} >
        <span className='font-bold text-2xl'>Ride</span>
        <ChevronDown size={20} strokeWidth={1} className={`lg:hidden block transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}/>
      </div>
      <div className='flex flex-row text-gray-600 font-light text-sm justify-between whitespace-nowrap gap-5.5 pr-4 '>
        <div className='cursor-pointer hover:text-black hidden lg:block'><a href="/ride">Request a ride</a></div>
        <div className='cursor-pointer hover:text-black hidden lg:block'>Reserve a ride</div>
        <div className='cursor-pointer hover:text-black hidden lg:block'><a href="/ride">See prices</a></div>
        <div className='cursor-pointer hover:text-black hidden lg:block'><a href="/exploreride">Explore ride options</a></div>
        <div className='cursor-pointer hover:text-black hidden lg:block'><a href="/airport">Airport rides</a></div>
      </div>

      <div className={`absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out lg:hidden flex flex-col z-20 ${isMenuOpen ? "h-[30vh] opacity-100" : "h-0 opacity-0"}`}>
        <div className='flex flex-col gap-3 p-5'>
          <a href="" className='text-sm font-semibold'>Request a ride</a>
          <a href="" className='text-sm font-semibold'>Reserve a ride</a>
          <a href="" className='text-sm font-semibold'>See prices</a>
          <a href="" className='text-sm font-semibold'>Explore ride options</a>
          <a href="" className='text-sm font-semibold'>Airport rides</a>
        </div>
      </div>

      <div onClick={() => setIsMenuOpen(false)} className={`absolute top-full left-0 w-full h-screen bg-black/50 z-10 lg:hidden transition-opacity duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}></div>
    </div>
  )
}





export default SubNav
