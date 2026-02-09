import React from 'react'
import BusinessMam from '../../assets/BusinessMam.jpg'


const BusinessHero = () => {
  return (
    <div className='px-40 flex justify-between py-16 items-center text-white bg-black'>
      {/* Left section */}
      <div className='flex flex-col gap-10 w-100'>
        <div className='text-5xl font-bold w-100'>
          The best of Uber for your business
        </div>
        <div className='w-110 text-base'>
          Uber for Business gives your organization more control, deeper insights, and features built for enterprise users. Manage and track business travel, meal programs, and more on one dashboard.
        </div>
        <div className='justify-between w-full'>
          <span>
            <button className=' bg-white text-black font-medium px-6 py-3 rounded-[10px]'>How to get started</button>
          </span>
          <span>
            <a href=""><u className='underline-offset-8'>Check out our solutions</u></a>
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="w-[576px] h-[576px] bg-blue-400">
        <img src={BusinessMam} alt="" className="block w-full h-full max-w-none object-fill" style={{ width: '100%', height: '100%' }}/>
      </div>
    </div>
  )
}

export default BusinessHero
