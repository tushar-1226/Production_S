import React from 'react'
import { ArrowRight } from 'lucide-react';
import logo from "../../assets/logo.svg";

const OffSignUp = () => {
    return (
        <div className='flex w-full justify-between gap-2'>
            <div className='w-full border-gray-200 border-b-2 px-2 md:px-3 md:py-1 lg:w-auto group cursor-pointer'>
                <div className='flex flex-row justify-between items-center lg:p-5 lg:py-1 md:py-2 py-4 h-auto sm:h-50 bg-white w-full lg:w-140 group gap-4 sm:gap-0' >
                    <div className='flex items-center gap-3 sm:gap-5 w-full'>
                        <div>
                            <span className='lg:text-4xl text-3xl font-semibold group-hover:text-gray-700'>Sign up to ride</span>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <ArrowRight className='transition-transfrom duration-300 ease-in group-hover:translate-x-4 m-0 group-hover:text-gray-700' size={50} strokeWidth={3}/>
                    </div>
                </div>
            </div>
            <div className='w-full border-gray-200 border-b-2 px-2 md:px-3 md:py-1 lg:w-auto group cursor-pointer'>
                <div className='flex flex-row justify-between items-center lg:p-5 lg:py-1 md:py-2 py-4 h-auto sm:h-50 bg-white w-full lg:w-140 group gap-4 sm:gap-0' >
                    <div className='flex items-center gap-3 sm:gap-5'>
                        <div>
                            <span className='lg:text-4xl text-3xl font-semibold w-20 group-hover:text-gray-700 '>Sign up to drive</span>
                        </div>
                    </div>

                    <div className='flex-shrink-0'>
                        <ArrowRight className='transition-transfrom duration-300 ease-in group-hover:translate-x-4 m-0 group-hover:text-gray-700' size={50} strokeWidth={3}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OffSignUp
