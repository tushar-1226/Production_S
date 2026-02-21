import React from 'react'
import logo from "../../assets/logo.svg";
import { Instagram, Globe, MapPin } from 'lucide-react';
import XLogo from '../XLogo';
import PlayStore from '../../assets/PlayStore.svg';
import AppleStore from '../../assets/AppleStore.svg';

const BusinessFooter = () => {
    
    return (
        <div className='lg:h-200 w-full bg-black lg:px-40 px-7 pt-16  text-white flex flex-col gap-20 '>
            <div className='flex flex-col gap-5'>
                <div>
                    <img className='h-17 w-17' src={logo} alt="" />
                </div>
                <div>
                    Visit Help Center
                </div>
            </div>
            <div className='flex flex-row flex-wrap w-full gap-20 lg:gap-45'>
                <div className='flex flex-col gap-5'>
                    <div className='text-xl'>
                        About us
                    </div>
                    <div className='flex flex-col gap-4 font-normal text-sm'>
                        <div>
                            <a href="">Newsroom </a>
                        </div>
                        <div>
                            <a href=""> Blog</a>
                        </div>
                        <div>
                            <a href="">Careers</a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='text-xl'>
                        Products
                    </div>
                    <div className='flex flex-col gap-4 font-normal text-sm'>
                        <div>
                            <a href="">Uber eat for food delivery</a>
                        </div>
                        <div>
                            <a href="">Uber for Business</a>
                        </div>
                        <div>
                            <a href="">Uber Freight</a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='text-xl'>
                        Travel
                    </div>
                    <div className='flex flex-col gap-4 font-normal text-sm'>
                        <div>
                            <a href="">Reserve</a>
                        </div>
                        <div>
                            <a href="">Airports</a>
                        </div>
                        <div>
                            <a href="">Cities</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex lg:flex-row flex-col gap-10 lg:justify-between'>
                <div className='flex items-center gap-5 lg:gap-10'>
                    <div><i className="fa-brands fa-linkedin"></i></div>
                    <div><i className="fa-brands fa-youtube font-xs h-4 w-3"></i></div>
                    <div><Instagram className='h-4 w-5' /></div>
                    <div><XLogo className='h-4 w-5' /></div>
                </div>
                <div className='flex gap-5 lg:flex-row  items-center'>
                    <div>
                        <a href="" className="text-white flex items-center gap-2">
                            <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>English</span>
                        </a>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <MapPin className="h-4 w-4 text-white" />
                        <span>Luckhnow</span>
                    </div>
                </div>
            </div>
            <div className='flex gap-3'>
                <div>
                    <img className='h-10 w-33' src={PlayStore} alt="" />
                </div>
                <div>
                    <img className='h-10 w-33' src={AppleStore} alt="" />
                </div>
            </div>
            <div className='lg:w-full flex lg:flex-row flex-col lg:justify-between gap-5 text-[#AFAFAF] text-xs pb-30 lg:items-center'>
                <div>
                    © 2026 Uber Technologies Inc.
                </div>
                <div className='flex gap-8 items-center'>
                    <div>Privacy</div>
                    <div>Accessibility</div>
                    <div>Terms</div>
                </div>
            </div>
        </div>
    )
}

export default BusinessFooter
