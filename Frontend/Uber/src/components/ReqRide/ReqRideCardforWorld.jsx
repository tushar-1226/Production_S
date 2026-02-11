import React from 'react'
import van from '../../assets/van.png'

const ReqRideCardforWorld = ({ ArrayObject }) => {
  console.log(ArrayObject);
  console.log("hellow")
  console.log("card")
  return (
    <div className="flex gap-15 overflow-hidden overflow-x-scroll w-full">
      {ArrayObject.map((item, index) => (
        <div key={index} className='flex flex-col gap-5'>
          
          <div className='w-85 overflow-hidden h-43'>
            <img className='object-cover h-full w-full' src={item.image} alt=""/>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='text-lg font-medium'>
              {item.heading}
            </div>

            <div className='text-[#333333] font-light text-base'>
              {item.desc}
            </div>
          </div>

          <div className='text-[#2f2f2f] font-lg'>
            <u className='underline-offset-8 decoration-gray-300'>
              Learn more about {item.heading}
            </u>
          </div>

        </div>
      ))}
    </div>
  )
}

export default ReqRideCardforWorld
