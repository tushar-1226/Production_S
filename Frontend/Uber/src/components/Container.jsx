import React from 'react'
import Page from './Page.jsx'
import Suggestion from './Suggestion.jsx'
import Plan from './Plan.jsx'
import TravelCards from './TravelCards.jsx'


const Container = () => {
  console.log("Container");
  console.log("Container");
  console.log("Container");

  return (
    <div className='px-40'>
      <Page/>
      <Suggestion/>
      <Plan/>
      <TravelCards/>
    </div>
  )
}

export default Container
