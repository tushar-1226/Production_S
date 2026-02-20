import React from 'react'
import Navbar from '../Navbar'
import OffHero from './OffHero'
import OffPopular from './OffPopular'
import OffBiggerContainer from './OffBiggerContainer'
import OffSignUp from './OffSignUp'
import OffPromo from './OffPromo'
import Footer from '../Footer'

const OffMain = () => {


  return (
    <div>
      <div className='pt-16 px-40'>
        <Navbar />
        <OffHero />
        <OffPopular />
        <OffBiggerContainer />
        <OffSignUp />
        <OffPromo />
      </div>
      <Footer/>
    </div>
  )
}

export default OffMain
