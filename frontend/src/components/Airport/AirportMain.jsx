import React from 'react'
import AirportHero from './AirportHero'
import Navbar from '../Navbar'
import AirportReserve from './AirportReserve'
import AirportQuestion from './AirportQuestion'
import AirportFinder from './AirportFinder'
import Footer from '../Footer'


const AirportMain = () => {
    return (
        <div>
            <div className='px-40 pt-16'>
                <Navbar />
                <AirportHero />
                <AirportReserve />
                <AirportQuestion />
                <AirportFinder />

            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default AirportMain
