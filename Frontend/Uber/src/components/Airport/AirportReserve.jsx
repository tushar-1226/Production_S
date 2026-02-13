import React from 'react'
import manlookingdown from "../../assets/manlookingdown.png";
import auntywaving from "../../assets/auntywaving.svg";
import flightcal from "../../assets/flightcal.png";

const AirportReserv = () => {

  const AirportCards = [
    {
      image: manlookingdown,
      heading: "Plan your ride to the airport",
      description: "Priority matching through Uber Reserve helps you get the ride you need when you need it.*",
    },
    {
      image: auntywaving,
      heading: "Have a ride waiting for you when you land**",
      description: "Our flight-tracking technology will let your driver know if your flight is delayed (or early) so they can adjust their pickup time accordingly.",
    },
    {
      image: flightcal,
      heading: "Book ahead of time with flexible cancellation",
      description: "Lock in your price when you reserve your ride. If your plans change, cancel for free up to one hour before your scheduled pickup time.",
    }
  ]

  return (
    <div className='py-20 flex flex-col gap-10'>
      <div className='text-4xl font-semibold'>
        Reserve your airport ride in advance
      </div>
      <div className='text-gray-700'>
        Take the stress out of getting to or from the airport by scheduling a ride up to 90 days ahead of time.
      </div>
      <div className='text-gray-700  flex gap-4'>
        <span><u className='underline-offset-8 decoration-gray-300'>Request a ride today</u></span>
        <span><u className='underline-offset-8 decoration-gray-300'>Learn more about Uber Reserve</u></span>
      </div>
      <div className='flex items-center'>
        <div className='flex md:flex-row flex-col flex-wrap w-full  items-start justify-between gap-5'>
          {
            AirportCards.map((item, index) => {
              return (
                <div key={index} className='flex flex-col gap-5 md:gap-2 lg:gap-5 w-90 md:w-80 lg:w-90'>
                  <div className=' w-[100%]'>
                    <img className='object-contain' src={item.image} />
                  </div>

                  <div className='text-lg font-medium break-words'>
                    {item.heading}
                  </div>

                  <div className='text-gray-700 w-full'>
                    {item.description}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AirportReserv
