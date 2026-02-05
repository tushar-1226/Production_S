import React from 'react'
import { Globe } from 'lucide-react';




const RightNav = () => {
    return (
        <div>
            <ul className="flex items-center lg:gap-6 gap-3 text-sm font-medium text-white">
                <li className='lg:block hidden'>
                    <a href="" className="text-white flex items-center gap-2">
                        <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>EN</span>
                    </a>
                </li>

                <li className='lg:block hidden'>
                    <a href="" className="text-white">
                        Help
                    </a>
                </li>

                <li className='rounded-full'>
                    <a href="" className="text-white text-sm">
                        Log in
                    </a>
                </li>

                <li>
                    <button className="bg-white text-black rounded-full px-3 py-2  lg:px-4 lg:py-2 lg:text-sm">
                        Sign up
                    </button>
                </li>

                <li className='block lg:hidden'>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </li>
            </ul>


        </div>
    )
}

export default RightNav
