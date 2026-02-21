import React from 'react'

const BusinessCutomer = () => {
    return (
        <div className='px-40 flex flex-col gap-10 py-15 bg-blue-950 items-center' >
            <div className='font-medium text-4xl flex flex-col items-center text-white'>
                <div>
                    9 out of 10 customers recommend choosing
                </div>
                <div>
                    Uber for Business³
                </div>
            </div>
            <div>
                <button className="bg-white text-black rounded-[10px] font-medium px-8 py-3">
                    How to get started
                </button>
            </div>

        </div>
    )
}

export default BusinessCutomer
