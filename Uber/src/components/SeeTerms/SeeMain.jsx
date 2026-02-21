import React from 'react'
import SeeHero from './SeeHero'
import Navbar from '../Navbar'
import SubNav from '../SubNav'
import SeeBlueHeading from './SeeBlueHeading'
import SeeVideoCards from './SeeVideoCards'
import SeeContainer from './SeeContainer'
import SeePromoDetails from './SeePromoDetails'
import Footer from '../Footer'

const SeeMain = () => {
  return (
    <div>
      <div className='pt-16 bg-black px-40'>
        <Navbar />
        <SubNav />
        <SeeHero />
        <SeeBlueHeading />
        <SeeVideoCards />
        <SeeContainer />
        <SeePromoDetails />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default SeeMain
