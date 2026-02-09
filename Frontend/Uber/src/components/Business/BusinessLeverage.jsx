import React from 'react'
import walkingmam from '../../assets/walkingmam.svg'

const BusinessLeverage = () => {
    return (
        <div className='px-40'>
            <div className='text-4xl font-bold w-185'>
                How companies leverage Uber for Business
            </div>
            <div>
                <div className='flex flex-col gap-3 '>
                    <div className=''>
                        <img className='' src={walkingmam} alt="" />
                    </div>
                    <div className='text-2xl font-bold'>
                        Business travel
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img className='' src={walkingmam} alt="" />
                    </div>
                    <div className='text-2xl font-bold'>
                        Business travel
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img className='' src={walkingmam} alt="" />
                    </div>
                    <div className='text-2xl font-bold'>
                        Business travel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessLeverage
