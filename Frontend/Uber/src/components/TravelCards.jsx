import React from 'react'
import CardCompoTravel from './CardCompoTravel'

const TravelCards = () => {
  console.log("TravelCards");
  console.log("TravelCards");
  console.log("TravelCards");

  return (
    <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center'>
      <div className='lg:text-4xl text-2xl w-full font-bold'>Use the Uber app to help you travel your way</div>
      <div>
        <CardCompoTravel/>
      </div>
    </div>
  )
}

export default TravelCards
