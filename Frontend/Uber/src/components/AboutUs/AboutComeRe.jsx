import React from 'react'
import earth from '../../assets/earth.svg'


const AboutComeRe = () => {
    return (
        <div className='bg-[#F6F6F6] px-40 w-full h-128 flex items-center justify-between'>
            <div className='w-100 flex flex-col gap-14'>
                <div className='text-5xl font-bold text-[#333333] leading-14'>
                    Come reimagine with us
                </div>
                <div>
                    <button className='bg-black py-3 px-6 rounded-[7px] text-white font-medium'>
                        Read Dara's Letter
                    </button>
                </div>
            </div>
            <div className='w-130'>
                <img className='object-cover w-full h-full' src={earth} alt="" />
            </div>
        </div>
    )
}

export default AboutComeRe
