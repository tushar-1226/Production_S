import React from 'react'
import { Search } from 'lucide-react';

const AirportFinder = () => {
    return (
        <div className='w-full flex flex-col gap-10'>
            <div className='text-4xl font-semibold'>
                Find your airport
            </div>
            <div className='flex gap-8 items-center'>
                <div className='w-full'>
                    <input type="text" placeholder='Search for an airport' className='pl-5 py-3 rounded-[7px] w-full bg-[#EFEFEF]' />
                </div>
                <div className='bg-black p-3.5 rounded-[7px]'>
                  <Search color="white" size={20} strokeWidth={3}/>
                </div>
            </div>
            <div className='h-100 w-full flex items-center justify-center'>
                <div className='text-9xl font-black'>
                    Work to be done 
                </div>
            </div>
        </div>
    )
}

export default AirportFinder
