import React from 'react'
import CEOStanding from '../../assets/CEOStanding.png'
import standspeak from '../../assets/standspeak.png'
import newsroom from '../../assets/newsroom.svg'
import blog from '../../assets/blog.svg'
import investor from '../../assets/investor.svg'


const AboutCompany = () => {

    const CardData2 = [
        {
            image: CEOStanding,
            heading: "Who's driving Uber",
            desc: "We’re building a culture within Uber that emphasizes doing the right thing, period, for riders, drivers, and employees. Find out more about the team that’s leading the way.",
            anchor: `See our leadership`
        },
        {
            image: standspeak,
            heading: "Acting with integrity",
            desc: "Uber's Ethics & Compliance Program Charter outlines our commitment to integrity at the highest levels within the company. Transparency is critical to an ethical culture; we achieve this through our Integrity Helpline and suite of scalable and effective compliance initiatives.",
            anchor: `Learn more`
        }
    ]
    const CardData3 = [
        {
            image: newsroom,
            heading: "Newsroom",
            desc: "Get announcements about partnerships, app updates, initiatives, and more near you and around the world.",
            anchor: `Go To Newsroom`
        },
        {
            image: blog,
            heading: "Blog",
            desc: "Find new places to explore and learn about Uber products, partnerships, and more.",
            anchor: 'Read our posts'
        },
        {
            image: investor,
            heading: "Investor relations",
            desc: "Download financial reports, see next-quarter plans, and read about our corporate responsibility initiatives.",
            anchor: `Learn more`
        }
    ]

    return (
        <div className='lg:pt-30 pt-15 flex flex-col gap-30 w-full py-15 px-40'>
            <div className='flex flex-col gap-10 items-center'>
                <div className='lg:text-4xl text-2xl w-full font-bold text-[#333333]'>
                    Company info
                </div>
                {/* 2 Cards div */}
                <div className='flex items-start justify-between gap-5 '>
                    {CardData2.map((item, index) => (
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
            {/* 3 Cards div */}
            <div className='flex flex-col gap-7'>
                <div className='lg:text-4xl text-2xl w-full font-bold text-[#333333]'>
                    Keep up with the latest
                </div>
                <div className='w-full'>
                    <div className='w-full'>
                        <div className='flex items-start justify-between gap-5 w-full'>
                            {CardData3.map((item, index) => (
                                <div key={index} className='flex flex-col gap-5'>

                                    <div className='w-6 overflow-hidden'>
                                        <img className='object-cover h-full w-full' src={item.image} alt="" />
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <div className='text-lg font-medium w-85'>
                                            {item.heading}
                                        </div>

                                        <div className='text-[#333333] font-light text-base w-90'>
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
                </div>
            </div>
        </div>
    )
}

export default AboutCompany
