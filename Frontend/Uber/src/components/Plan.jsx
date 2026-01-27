import React from 'react'
import watch from '../assets/watch.png'
import CalendarIcon from '../assets/calendar.svg'
import Clock from '../assets/clock.svg';
import CreditCard from '../assets/CreditCard.svg';


const Plan = () => {
    


    return (
        <div className='pt-10 flex flex-col gap-6'>
            <div className='text-4xl font-bold' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Plan for later
            </div>
            <div >
                <div className='flex gap-7'>
                    <div className='bg-[#9AD4DE] rounded-xl h-100 relative w-192 pt-17 pl-10'>
                        <div className='flex flex-col gap-10 w-93'>
                            <div className='text-4xl font-bold w-80' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>Get your ride right with Uber Reserve</div>
                            <div className='flex flex-col gap-3 '>
                                <div className='text-xl font-medium'>
                                    Choose date and time
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex gap-3 '>
                                        <div>
                                            <span className='text-sm text-gray-500'>Date</span>
                                            <div className='h-12 w-45 bg-white rounded-[10px] flex items-center p-4 gap-5 cursor-pointer'>
                                                <div className='h-4 w-4 overflow-hidden'><img src={CalendarIcon} alt="" className='object-cover' /></div>
                                                <input className='h-7 w-20 outline-none cursor-pointer' type="text" name="" id="" />
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-sm text-gray-500'>Time</span>
                                            <div className='h-12 w-45 bg-white rounded-[10px] flex items-center p-4 gap-5 cursor-pointer'>
                                                <i className="fa-solid fa-clock"></i>
                                                <input className='h-7 w-20 outline-none cursor-pointer' type="text" name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                    <button className='bg-black w-full h-12 rounded-[10px] text-white font-semibold'>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='h-20 w-50'>
                            <img className='absolute bottom-0 right-0 object-cover' src={watch} />
                        </div>
                    </div>
                    {/* Benefits section */}
                    <div className='border-1 border-gray-100 h-85 w-90 pt-4 px-4 rounded-[10px] flex flex-col gap-6'>
                        <div className='text-xl font-bold' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                            Benefits
                        </div>
                        <div className='pl-6 flex flex-col gap-4 items-center'>
                            <div className='flex items-center gap-5'>
                                <div className='w-8 h-5 '>
                                    <img src={CalendarIcon} alt="" className="object-cover" />
                                </div>
                                <div className='text-base font-normal'>
                                    Choose your exact pickup time up to 90 days in advance.
                                </div>
                            </div>
                            <div className='h-[1px] w-56.5 bg-gray-100'></div>
                            <div className='flex items-center gap-5'>
                                <div className='w-8 h-5'>
                                    <img src={Clock} alt="" className="object-cover" />
                                </div>
                                <div className='text-base font-normal'>
                                    Extra wait time included to meet your ride.
                                </div>
                            </div>
                            <div className='h-[1px] w-56.5 bg-gray-100'></div>
                            <div className='flex items-center gap-5'>
                               <div className='w-8 h-5'>
                                    <img src={CreditCard} alt="" className="object-cover" />
                                </div>
                                <div className='text-base font-normal'>
                                    Cancel at no charge up to 60 minutes in advance.
                                </div>
                            </div>
                        </div>
                        <div className='font-light underline decoration-dotted underline-offset-5'>
                            See terms
                        </div>
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plan
