import React from 'react'

const PromoDetails = () => {
    return (
        <div className=' px-5 py-16 flex flex-col gap-10 lg:justify-between lg:h-100 text-white'>
            <div className='flex flex-col gap-5'>
                <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
                    ¹Your upfront price may change due to factors such as adding stops, updating your destination, significant changes to the route or duration of the trip, or passing through a toll that was not factored into the upfront price. Upfront price not available on meter taxi trips. Refer to the app for pricing applicable to your trip.
                </div>
                <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
                    ²Uber doesn’t guarantee that a driver will accept your ride request. Your ride is confirmed once you receive your driver details. Uber Reserve is available in select cities.
                </div>
                <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
                    ³Cancellation fees for Uber Reserve are higher than with on-demand. You may be charged a cancellation fee if you cancel a Reserve trip, depending on the circumstances. Policies vary by location and ride type. Refer to the Uber Reserve Terms of Use and policy in your Uber app for details.
                </div>
                <div className='text-[14px] lg:text-sm font-light lg:font-normal font-sans'>
                    Some features are only available in select cities, and the trips applicable for Uber Reserve will vary per city. Be sure to check the app for availability.
                </div>
            </div>
        </div>
    )
}

export default PromoDetails
