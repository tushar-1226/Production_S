import React from 'react'
import AboutHero from './AboutHero.jsx'
import Navbar from '../Navbar.jsx'
import AboutReImagine from './AboutReImagine.jsx'
import AboutCEOLetter from './AboutCEOLetter.jsx'

const AboutMore = () => {
  return (
    <div>
      <Navbar/>
      <AboutHero/>
      <AboutReImagine/>
      <AboutCEOLetter/>
    </div>
  )
}

export default AboutMore
