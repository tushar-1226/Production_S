import React from 'react'
import off1 from '../../assets/off1.svg'
import off2 from '../../assets/off2.svg'
import off3 from '../../assets/off3.svg'
import off4 from '../../assets/off4.svg'
import off5 from '../../assets/off5.svg'
import off6 from '../../assets/off6.svg'


const OffHero = () => {

    
    console.log('OffHero')
    console.log('OffHero')

    const ArrayObject = [
        {
            image: off1,
            heading: "Ride options",
            desc: "Access to rides on demand.",
            anchor: `Learn more`
        },
        {
            image: off2,
            heading: "Uber Eats",
            desc: "Food delivery on demand.",
            anchor: `Learn more`
        },
        {
            image: off3,
            heading: "Earning with Uber",
            desc: "Opportunity is everywhere.",
            anchor: `Learn more`
        },
        {
            image: off4,
            heading: "Moving cities forward",
            desc: "Helping to improve public transportation and access to care for those in need.",
            anchor: `Learn more`
        },
        {
            image: off5,
            heading: "Helping businesses move ahead",
            desc: "See how Uber Freight and Uber for Business help organizations across the world.",
            anchor: `Learn more`
        },
        {
             image: off6,
            heading: "Same-day delivery",
            desc: "An easy delivery solution that allows people to send items the same day.",
            anchor: `Learn more`
        }
    ]

    return (
        <div className='flex flex-col gap-35 w-full'>
            <section className='pt-16 flex flex-col gap-9'>
                <div className='text-[#333333] text-5xl font-semibold'>
                    Uber’s technology offerings
                </div>
                <div className='text-[#333333] font-light'>
                    Changing how people can request rides and get from point A to point B is just the beginning.
                </div>
                <div className='text-white'>
                    <button className='bg-black py-3 px-5 rounded-[7px] font-medium'>Explore the app</button>
                </div>
            </section>
            <section className='w-full flex flex-col gap-20'>
                <div className='flex flex-col gap-10'>
                    <div className='text-[#333333] text-4xl font-bold'>Uber apps, products, and other offerings</div>
                    <div className='text-[#333333] font-light flex justify-between'>
                        <span className='w-133 '>
                            Uber is a technology company whose mission is to reimagine the way the world moves for the better. Our technology helps us develop and maintain multisided platforms that match consumers looking for rides and independent providers of ride services, as well as with other forms of transportation, including public transit, bikes, and scooters.
                        </span>
                        <span className='flex flex-col gap-5 w-135 '>
                            <span>
                                We also connect consumers and restaurants, grocers, and other merchants so they can buy and sell meals, groceries, and other items, then we match them with independent delivery service providers. Plus, Uber connects shippers and carriers in the freight industry.
                            </span>
                            <span>
                                Our technology helps people connect and move in over 70 countries and 15,000+ cities around the world.
                            </span>
                        </span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-y-10 justify-between overflow-hidden w-full'>
                    {ArrayObject.map((item, index) => (
                        <div key={index} className='flex flex-col justify-between gap-5 w-83'>

                            <div className='w-14 overflow-hidden'>
                                <img className='object-cover h-full w-full' src={item.image} alt="" />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <div className='text-lg font-medium'>
                                    {item.heading}
                                </div>

                                <div className='text-[#333333] font-light text-base'>
                                    {item.desc}
                                </div>
                            </div>

                            <div className='text-[#2f2f2f] font-lg'>
                                <u className='underline-offset-8 decoration-gray-300'>
                                    {item.anchor}
                                </u>
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default OffHero
