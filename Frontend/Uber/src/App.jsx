import React from 'react'
import Navbar from './components/Navbar.jsx'
import SubNav from './components/SubNav.jsx'
import Page from './components/Page.jsx'



const App = () => {
  return (
    <div className='pt-16'>
      <Navbar/>
      <SubNav/>
      <Page/>
    </div>
  )
}

export default App
