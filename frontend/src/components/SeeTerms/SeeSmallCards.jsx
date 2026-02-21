import React from 'react'

const SeeSmallCards = ({ ArrayObject, ScrollRef }) => {

    return (
        <div ref={ScrollRef} className="flex gap-9 overflow-hidden w-full">
            {ArrayObject.map((item, index) => (
                <div key={index} className='flex flex-col gap-5 group'>

                    <div className='w-90 overflow-hidden '>
                        <img className='object-cover h-full w-full group-hover:scale-125 duration-300' src={item.image} alt="" />
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className='text-3xl font-medium text-white '>
                            {item.heading}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SeeSmallCards
