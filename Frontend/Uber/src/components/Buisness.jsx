import React from 'react'
import mam from '../assets/mam.png'

const Buisness = () => {
  console.log("Buisness");
  console.log("Buisness");
  console.log("Buisness");
  console.log("Buisness");
  console.log("Buisness");
  console.log("Buisness");
  

  return (
    <div className='px-5 lg:px-40 h-auto lg:h-140 w-full bg-black my-8 lg:my-17 py-12 lg:py-16 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-0'>
        <div className='flex flex-col justify-between w-full lg:w-auto gap-6'>
            <div className='text-white font-bold text-2xl sm:text-3xl lg:text-4xl w-full lg:w-100'>
                Looking for business solutions?
            </div>

            <div className='flex flex-col gap-4 lg:gap-5 w-full lg:w-110'>
              <div>
                Get information about how companies leverage <u>Uber for Business</u>: 
              </div>
              <div className='pl-10'>
                <ul className='flex flex-col gap-6 list-disc'>
                  <li><u className='underline underline-offset-3'>Buissness travel</u></li>
                  <li><u className='underline underline-offset-3'>Courtesy rides</u></li>
                  <li><u className='underline underline-offset-3'>Meal programs</u></li>
                  <li><u className='underline underline-offset-3'>Item delivery</u></li>
                </ul>
              </div>
            </div>

            <div className='flex gap-5 items-center'>
              <button className='bg-white text-black font-medium px-7 py-3 rounded-[10px]'>Get started</button>
              <u className='underline underline-offset-6'>Check out our solutions</u>
            </div>
        </div>
        <div className='w-full lg:w-auto'>
          <img className='w-full lg:w-auto' src={mam} alt="" />
        </div>
      
    </div>
  )
}

export default Buisness

