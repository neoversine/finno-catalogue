import React from 'react'
import SiteNavbar from '../components/landing/SiteNavbar'
import HeroSection from '../components/landing/HeroSection'
import MainProductsSection from '../components/landing/MainProductsSection'
import EmbraceSection from './EmbraceSection'
import BestDeals from './BestDeals'

const LandingPage = () => {
    return (
        <div className='flex flex-col'>
            <SiteNavbar />
            <HeroSection />
            <MainProductsSection />
            <EmbraceSection />
            <BestDeals />
        </div>
    )
}

export default LandingPage