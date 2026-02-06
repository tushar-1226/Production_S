import React from 'react'

const PromoDetails = () => {
  return (
    <div className='lg:px-40 px-5 py-16 flex flex-col gap-10 lg:justify-between lg:h-137'>
      <div className='flex flex-col gap-5'>
        {/* Start text */}
        <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            *Join the millions of riders who trust Uber for their everyday travel needs. Get doorstep pickup and dropoff to your chosen destination at the tap of a button. Select from a wide range of affordable options, such as Uber Auto, Uber Moto, and Cabs.
        </div>
        <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            Limited-period offer- Discount on first 5 trips (cab or moto) completed within 15 days of signing up. The offer is valid only for first-time users only. The promotion shall apply automatically to eligible rides. Download the Uber app now to request your first ride.
        </div>
        <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            Discounts applicable - (i) For cab rides- 25% discount (maximum discount of INR 75 per ride) (ii) For moto rides- 50% discount (maximum discount of INR 50 per ride)
        </div>
        <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            This offer cannot be combined with any other offers or promo codes.
        </div>
        <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            The offer is non-transferrable and limited to one per user/account.
        </div>
        <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            Uber reserves the right to alter, suspend or withdraw the promotion offer in the future in its sole discretion without any prior notice. Terms and conditions apply.
        </div>
      </div>
      {/* End text */}
      <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
            Certain requirements and features vary by country, region, and city.
      </div>
    </div>
  )
}

export default PromoDetails
