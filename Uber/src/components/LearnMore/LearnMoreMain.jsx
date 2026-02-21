import React from 'react'
import Navbar from '../Navbar'
import SubNav from '../SubNav'
import LearnHero from '../LearnMore/LearnHero'
import LearnHeading from './LearnHeading'
import LearnAnimatedImg from './LearnAnimatedImg'
import LearnQuestion from './LearnQuesition'
import LearnPromoDetails from './LearnPromoDetails'
import Footer from '../Footer'

const LearnMoreMain = () => {
    return (
        <div>
            <div className='pt-16 px-40 bg-black'>
                <Navbar />
                <SubNav />
                <LearnHero />
                <LearnHeading />
                <LearnAnimatedImg />

            </div>
            <div>
                <LearnQuestion />
                <LearnPromoDetails />
                <Footer/>
            </div>
        </div>
    )
}

export default LearnMoreMain
