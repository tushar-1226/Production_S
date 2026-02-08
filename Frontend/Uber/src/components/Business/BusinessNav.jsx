import React from 'react'
import LogoBusiness from '../../assets/LogoBusiness.png'
import { Globe } from 'lucide-react';


const BusinessNav = () => {
  return (
    <div className='bg-black fixed left-0 top-0 w-full px-24 flex items-center justify-between'>
      {/* Left section */}
      <div className='flex h-16 gap-5 items-center'>
        <div className=' w-30'>
          <img className='object-cover' src={LogoBusiness} alt="" />
        </div>
        <div>
          <ul className='flex gap-1'>
            <li>
              <button className="text-white text-sm font-semibold hover:bg-white/10 rounded-full px-3 py-2 cursor-pointer flex  items-center gap-2">
                <span>Overview</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </li>
            <li>
              <button className="text-white text-sm font-semibold hover:bg-white/10 rounded-full px-3 py-2 cursor-pointer flex  items-center gap-2">
                <span>Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </li>
            <li>
              <button className="text-white text-sm font-semibold hover:bg-white/10 rounded-full px-3 py-2 cursor-pointer flex  items-center gap-2">
                <span>Pricing</span>
              </button>
            </li>
            <li>
              <button className="text-white text-sm font-semibold hover:bg-white/10 rounded-full px-3 py-2 cursor-pointer flex  items-center gap-2">
                <span>Customer support</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </li>
            <li>
              <button className="text-white text-sm font-semibold hover:bg-white/10 rounded-full px-3 py-2 cursor-pointer flex  items-center gap-2">
                <span>Resources</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Right section */}
      <div>
        <div>
          <ul className="flex items-center lg:gap-6 gap-3 text-sm font-medium text-white">
            <li className='lg:block hidden'>
              <a href="" className="text-white flex items-center gap-2">
                <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>EN</span>
              </a>
            </li>

            <li className='lg:block hidden'>
              <a href="" className="text-white">
                Contact us
              </a>
            </li>

            <li className='rounded-full'>
              <a href="" className="text-white text-sm">
                Log in
              </a>
            </li>

            <li>
              <button className="bg-white text-black rounded-full px-3 py-2  lg:px-4 lg:py-2 lg:text-sm">
                Get Started
              </button>
            </li>

            <li className='block lg:hidden'>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BusinessNav