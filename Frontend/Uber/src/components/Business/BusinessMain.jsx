import React from 'react'
import Navbar from '../Navbar'
import BusinessHero from './BusinessHero'
import BusinessNav from './BusinessNav'
import BusinessLeverage from './BusinessLeverage'
import BusinessNetwork from './BusinessNetwork'
import BusinessUpfront from './BusinessUpfront'
import BusinessFortune from './BusinessFortune'
import BusinessCutomer from './BusinessCutomer'
import BusinessCards from './BusinessCards'
import BusinessPromoInfo from './BusinessPromoInfo'
import Footer from '../Footer'

const BusinessMain = () => {
  return (
    <div>
      <BusinessNav/>
      <BusinessHero/>
      <BusinessNetwork/>
      <BusinessLeverage/>
      <BusinessUpfront/>
      <BusinessFortune/>
      <BusinessCutomer/>
      <BusinessCards/>
      <BusinessPromoInfo/>
      <Footer/>
    </div>
  )
}

export default BusinessMain
