import React from 'react'
import Page from './Page.jsx'
import Suggestion from './Suggestion.jsx'
import Plan from './Plan.jsx'
import TravelCards from './TravelCards.jsx'
import DoMore2 from './DoMore2.jsx'




const Container = () => {

  return (
    <div className='w-full pt-10 lg:px-40 px-6 flex flex-col items-center'>
      <Page/>
      <DoMore2/>
      <Suggestion/>
      <Plan/>
      <TravelCards/>
    </div>
  )
}

export default Container
