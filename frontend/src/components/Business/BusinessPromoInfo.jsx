import React from 'react'

const PromoDetails = () => {
  return (
    <div className='lg:px-40 px-5 py-16 flex flex-col gap-10 lg:justify-between lg:h-87'>
      <div className='flex flex-col gap-5 '>
        {/* Start text */}
        <div className='text-[14px] font-light font-sans'>
            Product and feature availability may vary by market and location. To find out more, get started here.
        </div>
        <div className='text-[14px] font-light font-sans'>
            ¹Based on over 275 Uber for Business customers surveyed globally in February 2023. Customers agreed that they were able to reduce costs on ground transportation and/or meals through better compliance.
        </div>
        <div className='text-[14px] font-light font-sans'>
            ²Uber Electric is available only in certain cities. In addition, availability may be limited outside of downtown areas to start.
        </div>
        <div className='text-[14px] font-light font-sans'>
            ³Based on a November 2021 survey commissioned by Uber, in which 323 Uber for Business customers responded to the question “How likely are you to recommend Uber for Business to a colleague or someone in your professional network?”
        </div>
      </div>     
    </div>
  )
}

export default PromoDetails
