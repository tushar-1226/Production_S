import React from 'react'
import Qr from '../assets/Qr.png'
import { ArrowRight } from 'lucide-react';
import logo from "../assets/logo.svg";

const DoMore = () => {
    return (
        <div className='w-full h-100 bg-[#F6F6F6] py-14 px-40 flex flex-col justify-between' >
            <div className='text-4xl font-semibold'>
                Do more in the app
            </div>
            {/* Card 1 */}
            <div className='flex justify-between'>
                <div>
                    <div className='flex justify-between items-center p-8 h-50 bg-white w-140 group' >
                        <div className='flex items-center gap-5'>
                            <div className='h-38 w-38 bg-blue-200'>
                                <img className='object-cover' src={Qr} />
                            </div>

                            <div className='flex flex-col'>
                                <span className='text-2xl font-semibold whitespace-nowrap' >Download the Uber app</span>
                                <span className=''>Scan to download</span>
                            </div>
                        </div>
                        
                        <div>
                            <ArrowRight className='transition-transfrom duration-300 ease-in group-hover:translate-x-4 m-0  ' size={25} />
                        </div>
                    </div>
                </div>
                {/* Card 2 */}
                <div>
                    <div className='flex justify-between items-center p-8 h-50 bg-white w-140 group' >
                        <div className='flex items-center gap-5'>
                            <div className='h-38 w-38'>
                                <img className='object-cover h-38 w-38' src={logo} alt="" />
                            </div>

                            <div className='flex flex-col'>
                                <span className='text-2xl font-semibold whitespace-nowrap' >Sign up to ride</span>
                            </div>
                        </div>

                        <div >
                            <ArrowRight className='transition-transfrom duration-300 ease-linear group-hover:translate-x-4 m-0  ' size={25} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DoMore
