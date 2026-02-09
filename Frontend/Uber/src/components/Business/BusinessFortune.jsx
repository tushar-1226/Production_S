import React from 'react'
import zoom from '../../assets/zoom.png'
import cocacola from '../../assets/cocacola.png'
import samsung from '../../assets/samsung.png'
import parachute from '../../assets/parachute.png'


const BusinessFortune = () => {
    console.log("fortune")
    console.log("fortune")
    console.log("fortune")
    console.log("fortune")
    return (
        <div className='px-40 py-15 bg-[#EFEFEF] mt-17'>
            <div className='flex flex-col gap-10'>
                <div className='text-4xl font-semibold flex flex-col items-center'>
                    <span>
                        Join over 200,000 companies working with us,
                    </span>
                    <span>
                        including more than half of the Fortune 500
                    </span>
                </div>
                <div className='flex gap-2'>
                    <div className='h-35 flex items-center w-90 '>
                        <img className='object-cover h-full w-full' src={zoom} alt="" />
                    </div>
                    <div className='h-35 flex items-center w-90 '>
                        <img className='object-cover h-full w-full' src={cocacola} alt="" />
                    </div>
                    <div className='h-35 flex items-center w-90 '>
                        <img className='object-cover h-full w-full' src={samsung} alt="" />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className=''>
                    <div className='w-76 font-medium text-[18px] text-[#333333]'>
                        “Pay and basic benefits aren’t the endgame. You need to be actively listening to what employees need and want. One of our first added benefits was providing Uber credit for rides, so people could safely get a ride for work or for fun. We encourage employees to spend the credits however they want.”
                    </div>
                    <div>
                        <span>Ryan Carters</span><span>, Founder and CEO, Parachute Media</span>
                    </div>
                </div>
                <div>
                    <img src={parachute} alt="" />
                </div>
            </div>
        </div>
    )
}

export default BusinessFortune
