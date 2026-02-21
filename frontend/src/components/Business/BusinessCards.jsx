import React from 'react'
import gas from '../../assets/gas.png'
import opendoor from '../../assets/opendoor.png'
import road from '../../assets/road.png'

const BusinessCards = () => {
    const CardData = [
        {
            image: gas,
            heading: "How to reduce the carbon footprints of business travel",
            button: "See how"
        },
        {
            image: opendoor,
            heading: "The perks and benefits your employees want now",
            button: "Find out"
        },
        {
            image: road,
            heading: "The road to sustainability:executives discuss thier efforts toward net zero",
            button: "Keep reading"
        }
    ]


    return (
        <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center w-full px-40'>
            <div className='lg:text-4xl text-2xl w-full font-bold'>
                Interested in learning more?
            </div>
            <div>
                <div className='flex items-center'>
                    <div className='flex md:flex-row flex-col flex-wrap w-full items-center justify-between gap-5'>
                        {
                            CardData.map((item, index) => {
                                return (
                                    <div key={index} className='flex flex-col gap-5 md:gap-2 lg:gap-5 w-90 md:w-80 lg:w-90'>
                                        <div className=' w-[100%]'>
                                            <img className='object-contain' src={item.image} />
                                        </div>

                                        <div className='text-lg font-medium break-words'>
                                            {item.heading}
                                        </div>

                                        <div className='text-gray-700 w-full'>
                                            <u className='underline-offset-5'>{item.button}</u>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessCards
