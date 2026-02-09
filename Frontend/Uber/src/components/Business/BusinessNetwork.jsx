import React from 'react'
import gift from '../../assets/gift.svg'
import plant from '../../assets/plant.svg'
import star from '../../assets/star.svg'
import WritingPad from '../../assets/WritingPad.svg'


const BusinessNetwork = () => {
    return (
        <div className='px-40 flex flex-col gap-10 pb-15 text-white bg-black'>
            <div className='text-4xl font-bold w-185'>
                A global platform built on the world’s largest mobility network
            </div>
            <div className="grid grid-cols-2 gap-y-10">
                <div className=" w-131 flex flex-col gap-3">
                    <div className='h-13 w-13'>
                        <img className='object-cover h-full w-full' src={gift} alt="" />
                    </div>
                    <div className='text-xl font-semibold'>
                        Achieve up to 10% cost savings through strengthened compliance.
                    </div>
                    <div>
                        Customers have praised the reduction in travel and meal expenses.¹ It is possible to manage expenditures and usage, and operate under the established usage rules. For corporate use, there are no fees or monthly fixed costs.
                    </div>
                </div>
               <div className=" w-131 flex flex-col gap-3">
                    <div className='h-13 w-13'>
                        <img className='object-cover h-full w-full' src={plant} alt="" />
                    </div>
                    <div className='text-xl font-semibold'>
                        Achieve up to 10% cost savings through strengthened compliance.
                    </div>
                    <div>
                        Customers have praised the reduction in travel and meal expenses.¹ It is possible to manage expenditures and usage, and operate under the established usage rules. For corporate use, there are no fees or monthly fixed costs.
                    </div>
                </div>
                <div className=" w-131 flex flex-col gap-3">
                    <div className='h-13 w-13'>
                        <img className='object-cover h-full w-full' src={star} alt="" />
                    </div>
                    <div className='text-xl font-semibold'>
                        Achieve up to 10% cost savings through strengthened compliance.
                    </div>
                    <div>
                        Customers have praised the reduction in travel and meal expenses.¹ It is possible to manage expenditures and usage, and operate under the established usage rules. For corporate use, there are no fees or monthly fixed costs.
                    </div>
                </div>
               <div className="w-131 flex flex-col gap-3">
                    <div className='h-13 w-13'>
                        <img className='object-cover h-full w-full' src={WritingPad} alt="" />
                    </div>
                    <div className='text-xl font-semibold'>
                        Achieve up to 10% cost savings through strengthened compliance.
                    </div>
                    <div>
                        Customers have praised the reduction in travel and meal expenses.¹ It is possible to manage expenditures and usage, and operate under the established usage rules. For corporate use, there are no fees or monthly fixed costs.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessNetwork
