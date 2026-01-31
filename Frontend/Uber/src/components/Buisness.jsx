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
    <div className='px-40 h-140 w-full bg-black my-17 py-15 text-white flex items-center justify-between'>
        <div className='h-full flex flex-col justify-between'>

            <div className='text-white font-bold text-4xl w-100'>
                Looking for business solutions?
            </div>

            <div className='flex flex-col gap-5 w-110'>
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
        <div className=''>
          <img className='' src={mam} alt="" />
        </div>
      
    </div>
  )
}

export default Buisness

