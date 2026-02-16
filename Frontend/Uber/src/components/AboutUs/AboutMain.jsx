import React from 'react'
import AboutHero from './AboutHero.jsx'
import Navbar from '../Navbar.jsx'
import AboutReImagine from './AboutReImagine.jsx'
import AboutCEOLetter from './AboutCEOLetter.jsx'
import AboutSus from './AboutSus.jsx'
import AboutCompany from './AboutCompany.jsx'
import AboutComeRe from './AboutComeRe.jsx'
import Footer from '../Footer.jsx'

const AboutMore = () => {
  git add . && git commit -m "updated" && git push
  
  return (
    <div>
      <Navbar/>
      <AboutHero/>
      <AboutReImagine/>
      <AboutCEOLetter/>
      <AboutSus/>
      <AboutCompany/>
      <AboutComeRe/>
      <Footer/>
    </div>
  )
}

export default AboutMore
