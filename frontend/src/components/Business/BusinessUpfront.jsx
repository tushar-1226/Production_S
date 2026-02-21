import React from 'react'
import card from '../../assets/card.png'
import mobile from '../../assets/mobile.png'
import mam from '../../assets/mam.png'

const Upfront = () => {
  return (
    <div className='px-40 flex flex-col gap-10'>
      <div className='text-4xl font-semibold '>
        Get started with no upfront costs
      </div>
      {/* Section 1 */}
      <div className='flex gap-15'>
        <div className=''>
          <div className='flex flex-col gap-15'>
            <div className='h-50 w-90 bg-blue-300'>
              <img className='object-cover h-full w-full' src={mam} alt=""/>
            </div>
            <div className='h-50 w-90'>
              <img className='object-cover h-full w-full' src={mobile} alt="" />
            </div>
            <div className='h-50 w-90'>
              <img className='object-cover h-full w-full' src={card} alt="" />
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div className='flex flex-col items-center'>
          <div className='h-2.5 w-2.5 bg-black'></div>
          <div className='h-62 w-[1px] bg-black'></div>
          <div className='h-2.5 w-2.5 bg-black'></div>
          <div className='h-63 w-[1px] bg-black'></div>
          <div className='h-2.5 w-2.5 bg-black'></div>
        </div>
        <div className='flex flex-col gap-36'>
          <div className='flex flex-col gap-1.5'>
            <div className='text-xl font-semibold'>
              Customize your travel and meal programs
            </div>
            <div className='text-base w-160 font-light'>
              Set your own policies, help ensure T&E compliance, and get full visibility into every ride and meal. You can easily integrate with the top expensing partners for seamless expensing without paying a service fee.
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='text-xl font-semibold'>
              Onboard people at your own pace
            </div>
            <div className='text-base w-160 font-light'>
              Add individuals, specific teams, or your entire organization at once. After your employees are invited, they can add a business profile for work-related rides and meals to their existing Uber account that they know and trust for business rides and meals.
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='text-xl font-semibold'>
              Set up amenities for customers
            </div>
            <div className='text-base w-160 font-light'>
              Send Uber credit in the form of gift cards and vouchers for rides, meals, and more in a snap. You can even request rides for others to make their travel experience practically effortless.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upfront
