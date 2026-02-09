import React from 'react'
import walkingmam from '../../assets/walkingmam.svg'
import songsir from '../../assets/songsir.svg'
import meal from '../../assets/meal.svg'

const BusinessLeverage = () => {
    return (
        <div className='px-40 flex flex-col gap-10 w-full py-15'>
            <div className='text-4xl font-bold w-185'>
                How companies leverage Uber for Business
            </div>
            <div className='flex w-full justify-between'>
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
                        <img className='' src={songsir} alt="" />
                    </div>
                    <div className='text-2xl font-bold'>
                        Courtesy rides
                    </div>
                </div>
                <div>
                    <div className=''>
                        <img className='' src={meal} alt="" />
                    </div>
                    <div className='text-2xl font-bold'>
                        Meals programs
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessLeverage
