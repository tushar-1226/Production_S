import React from 'react'

const SubNav = () => {
  return (
    <div className="lg:px-22 w-full h-16 px-6 flex items-center ">
      <div className='font-bold text-2xl pl-1.5 w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }} >
        Ride
      </div>
      <div className='flex flex-row text-gray-600 font-light text-sm justify-between whitespace-nowrap gap-5.5 pr-4'>
        <div className='cursor-pointer hover:text-black'>Request a ride</div>
        <div className='cursor-pointer hover:text-black'>Reserve a ride</div>
        <div className='cursor-pointer hover:text-black'>See prices</div>
        <div className='cursor-pointer hover:text-black'>Explore ride options</div>
        <div className='cursor-pointer hover:text-black'>Airport rides</div>
      </div>
    </div>
  )
}

export default SubNav
