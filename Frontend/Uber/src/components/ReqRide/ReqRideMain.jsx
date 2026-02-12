import React from 'react'
import ReqRideHero from '../ReqRide/ReqRideHero'
import Navbar from '../Navbar'
import SubNav from '../SubNav'
import Suggestion from '../Suggestion'
import ReqRideWorld from './ReqRideWorld'
import ReqRideWorld2 from './ReqRideWorld2'


const ReqRideMain = () => {
  return (
    <div className='pt-32 px-40'>
        <Navbar/>
        <SubNav/>
      <ReqRideHero/>
      <Suggestion/>
      <ReqRideWorld/>
      <ReqRideWorld2/>
    </div>
  )
}

export default ReqRideMain
