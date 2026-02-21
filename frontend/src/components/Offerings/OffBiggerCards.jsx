import React from 'react'

const OffBiggerCards = ({ ArrayObject }) => {
    return (
        <div>
            <div className='flex items-start justify-between gap-5 '>
                {ArrayObject.map((item, index) => (
                    <div key={index} className='flex flex-col gap-5'>

                        <div className='w-140 overflow-hidden' >
                            <img className='object-cover h-full w-full' src={item.image} alt="" />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <div className='text-lg font-medium w-140'>
                                {item.heading}
                            </div>

                            <div className='text-[#333333] font-light text-base w-140'>
                                {item.desc}
                            </div>
                        </div>

                        <div className='text-[#2f2f2f] font-lg'>
                            <u className='underline-offset-8 decoration-gray-300'>
                                Learn more
                            </u>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default OffBiggerCards
