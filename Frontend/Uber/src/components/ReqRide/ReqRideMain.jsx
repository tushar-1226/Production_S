import React from 'react'
import ReqRideHero from '../ReqRide/ReqRideHero'
import Navbar from '../Navbar'
import SubNav from '../SubNav'
import Suggestion from '../Suggestion'
import ReqRideWorld from './ReqRideWorld'


const ReqRideMain = () => {
  return (
    <div className='pt-32 px-40'>
        <Navbar/>
        <SubNav/>
      <ReqRideHero/>
      <Suggestion/>
      <ReqRideWorld/>
    </div>
  )
}

export default ReqRideMain
