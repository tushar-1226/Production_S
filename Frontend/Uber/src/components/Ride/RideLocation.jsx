import React from 'react'
import { ChevronDown } from 'lucide-react';


const RideLocation = () => {
    return (
        <div className='h-90 w-80 border-2 border-gray-100 rounded-2xl flex flex-col gap-4 p-4'>
            <div className='text-[20px] font-semibold'>
                Get a ride
            </div>

            <div className='flex flex-col justify-between h-full'>
                <div className='flex items-center relative'>
                    <div className='border-6 rounded-full h-4 w-4 absolute left-3'></div>
                    <input className='bg-[#EFEFEF] px-4 py-3 w-full pl-10  rounded-[8px]' type="text" placeholder='Pickup Location' />
                </div>
                <div className='flex items-center relative'>
                    <div className='h-4 w-4 border-5 absolute left-3'></div>
                    <input className='bg-[#EFEFEF] px-4 py-3 w-full pl-10  rounded-[8px]' type="text" placeholder='Pickup Location' />
                </div>
                <div>
                    <button className='flex justify-between bg-[#EFEFEF] px-2 py-3 rounded-[8px] items-center w-full'>
                        <div className='flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>
                            <span className='text-base'>Pickup now</span>
                        </div>
                        <ChevronDown size={18} strokeWidth={3} />
                    </button>
                </div>
                <div>
                    <button className='flex gap-2 bg-[#EFEFEF] px-2 py-2 rounded-full items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                        <span className='text-sm font-light'>For me</span>
                        <ChevronDown size={18} strokeWidth={3} />
                    </button>
                </div>
            </div>

            <div>
                <button className='flex gap-1 py-3 rounded-[5px] justify-center w-full items-center bg-black text-white cursor-pointer text-sm font-medium '>
                    <span className='font-semibold text-[15px]'>Search</span>
                </button>
            </div>

        </div>
    )
}

export default RideLocation
