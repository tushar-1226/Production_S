import React from 'react'
import logo from "../assets/logo.svg";
import { Instagram, Globe } from 'lucide-react';
import XLogo from './XLogo';
import { MapPinIcon } from "@heroicons/react/24/solid";
import PlayStore from '../assets/PlayStore.svg';
import AppleStore from '../assets/AppleStore.svg';





const Footer = () => {
    
    return (
        <div className='h-230 w-full bg-black px-40 pt-16  text-white flex flex-col gap-20 '>
            <div className='flex flex-col gap-5'>
                <div>
                    <img className='h-17 w-17' src={logo} alt="" />
                </div>
                <div>
                    Visit Help Center
                </div>
            </div>
            <div className='flex w-full gap-45'>
                <div className='flex flex-col gap-5'>
                    <div className='text-xl'>
                        Company
                    </div>
                    <div className='flex flex-col gap-4 font-normal text-sm'>
                        <div>
                            <a href="">About us </a>
                        </div>
                        <div>
                            <a href=""> Our offerings</a>
                        </div>
                        <div>
                            <a href="">Newsroom</a>
                        </div>
                        <div>
                            <a href="">Investors</a>
                        </div>
                        <div>
                            <a href=""> Blog</a>
                        </div>
                        <div>
                            <a href="">Careers</a>
                        </div>
                        <div>
                            <a href="">Uber ones</a>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='text-xl'>
                        Products
                    </div>
                    <div className='flex flex-col gap-4 font-normal text-sm'>
                        <div>
                            <a href="">Ride</a>
                        </div>
                        <div>
                            <a href="">Drive</a>
                        </div>
                        <div>
                            <a href="">Eat</a>
                        </div>
                        <div>
                            <a href="">Uber for Business</a>
                        </div>
                        <div>
                            <a href="">Uber Freight</a>
                        </div>
                        <div>
                            <a href="">Gift cards</a>
                        </div>
                        <div>
                            <a href="">Uber Health</a>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='text-xl'>
                        Global citizenship
                    </div>
                    <div className='flex flex-col gap-4 font-normal text-sm'>
                        <div>
                            <a href="">Safety</a>
                        </div>
                        <div>
                            <a href="">Sustainability</a>
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
            <div className='flex justify-between'>
                <div className='flex items-center gap-10'>
                    <div><i className="fa-brands fa-linkedin"></i></div>
                    <div><i className="fa-brands fa-youtube font-xs h-4 w-3"></i></div>
                    <div><Instagram className='h-4 w-5' /></div>
                    <div><XLogo className='h-4 w-5' /></div>
                </div>
                <div className='flex gap-5 items-center'>
                    <div>
                        <a href="" className="text-white flex items-center gap-2">
                            <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>English</span>
                        </a>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <MapPinIcon className="h-4 w-4 text-white" />
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
            <div className='w-full flex justify-between text-[#AFAFAF] text-xs pb-30 items-center'>
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

export default Footer
