import React from 'react'
import CardCompoTravel from './CardCompoTravel'

const TravelCards = () => {
  return (
    <div className='pt-30 flex flex-col gap-10'>
      <div className='text-4xl font-bold'>Use the Uber app to help you travel your way</div>
      <div>
        <CardCompoTravel/>
      </div>
    </div>
  )
}

export default TravelCards
