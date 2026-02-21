import React from 'react'
import RideLocation from './RideLocation'
import RideYourLocation from './RideYourLocation'

const RideMain = () => {
  return (
    <div className='pt-10 flex gap-10 '>
      <RideLocation />
      <RideYourLocation/>
    </div>
  )
}

export default RideMain
