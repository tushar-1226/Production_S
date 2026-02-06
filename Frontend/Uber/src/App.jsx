import React from 'react'
import Navbar from './components/Navbar.jsx'
import SubNav from './components/SubNav.jsx'
import Container from './components/Container.jsx'
import SeePrices from './components/SeePrices.jsx'
import Buisness from './components/Buisness.jsx'
import Question from './components/Question.jsx'
import DoMore from './components/DoMore.jsx'
import PromoDetails from './components/PromoDetails.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div className='pt-16 overflow-x-hidden'>
      <Navbar/>
      <SubNav/>
      <Container/>
      <Buisness/>
      <Question/>
      <SeePrices/>
      <DoMore/>
      <PromoDetails/>
      <Footer/>
      </div>
  )
}

export default App
