import React from 'react'
import watch from '../assets/watch.png'
import { CalendarIcon } from "@heroicons/react/24/solid";


const Plan = () => {



    return (
        <div className='pt-10 flex flex-col gap-6'>
            <div className='text-4xl font-bold' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Plan for later
            </div>
            <div >
                <div className=''>
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
                                                <i className="fa-solid fa-calendar"></i>
                                                <input className='h-7 w-20 outline-none cursor-pointer' type="text" name="" id="" />
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-sm text-gray-500'>Time</span>
                                            <div className='h-12 w-45 bg-white rounded-[10px] flex items-center p-4 gap-5 cursor-pointer'>
                                                <i class="fa-solid fa-clock"></i>
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
                        <img className='absolute bottom-0 right-0' src={watch} height={100} width={270} />
                    </div>
                    {/* Benefits section */}
                    <div className=''>
                        <div className='text-2xl font-bold' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                            Benefits
                        </div>
                        <div></div>
                        <div></div>

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
