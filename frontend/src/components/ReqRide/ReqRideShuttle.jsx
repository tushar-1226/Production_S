import React from 'react'
import blueshirt from '../../assets/blueshirt.png'

const ReqRideShuttle = () => {
    return (
        <div className='flex gap-35 w-full'>
            <div className='flex flex-col gap-7'>
                <div className='text-4xl font-semibold w-105 text-[#333333]'>
                    Commute in Comfort with Uber Shuttle
                </div>
                <div className=' font-light w-105'>
                    Uber Shuttle is a new way to enjoy a comfortable, safe, and convenient commute in Delhi. There’s no need to wait to hail down and squeeze onto a crowded bus, spend hours in the metro or drive in peak traffic.
                </div>
                <div>
                    <button className='px-6 py-4 bg-black font-semibold rounded-[10px] text-white '>
                        Explore Uber Shuttle
                    </button>
                </div>
            </div>
            <div className='w-380 bg-amber-500'>
                <img className='object-cover h-full w-full' src={blueshirt} alt="" />
            </div>
        </div>
    )
}

export default ReqRideShuttle
