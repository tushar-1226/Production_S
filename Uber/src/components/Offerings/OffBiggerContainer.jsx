import React from 'react'
import OffBiggerCards from './OffBiggerCards'
import big1 from '../../assets/big1.jpeg'
import big2 from '../../assets/big2.png'
import big3 from '../../assets/big3.jpeg'
import big4 from '../../assets/big4.jpeg'
import big5 from '../../assets/big5.jpeg'
import big6 from '../../assets/big6.jpeg'
import big7 from '../../assets/big7.jpeg'
import big8 from '../../assets/big8.jpeg'


const OffBiggerContainer = () => {

    const ArrayObject1 = [
        {
            image: big1,
            heading: "Uber Eats",
            desc: "Order from your favorite restaurants and grocery stores, online or with the Uber app. The merchant will prepare your order, and a nearby delivery person will deliver it to your door.",
            anchor: `Visit Uber Eats`
        },
        {
            image: big2,
            heading: "Restaurants",
            desc: "Uber Eats makes a real impact on your restaurant business. When your food is featured in the app, new customers can discover it and loyal customers can enjoy it more often. Delivery people using the Uber app deliver the food fast, maintaining the best possible food quality.",
            anchor: `Patner with Uber Eats`
        }
    ]

    const ArrayObject2 = [
        {
            image: big3,
            heading: "Drive with Uber",
            desc: "Make the most of your time on the road on the platform with the largest network of active riders.",
            anchor: `Sign up to drive`
        },
        {
            image: big4,
            heading: "Dilivery with Uber",
            desc: "Make money by delivering food orders that people crave, and other items using the Uber Eats app—all while exploring your city.",
            anchor: `Sign up to diliver `
        }
    ]

    const ArrayObject3 = [
        {
            image: big5,
            heading: "Helping to improve public transportation for all",
            desc: "Uber is committed to helping cities around the world make public transportation more accessible, equitable, and efficient.",
            anchor: `Learn more about Uber Transit`
        },
        {
            image: big6,
            heading: "Providing access to care for those in need",
            desc: "We’ve partnered with healthcare organizations to provide their members and patients with access to care by offering them flexible ride-scheduling options. Healthcare professionals can schedule rides for patients and caregivers going to and from the care they need, all from a single dashboard.",
            anchor: `Visit Uber Health `
        }
    ]

    const ArrayObject4 = [
        {
            image: big7,
            heading: "Uber Freight",
            desc: "Uber Freight is a free app that matches carriers with shippers. Shippers tap a button to instantly book the loads they want to haul. And thanks to upfront pricing, carriers always know how much they’ll get paid.",
            anchor: `Visit Uber Freight`
        },
        {
            image: big8,
            heading: "Uber for Business",
            desc: "Whether it’s employee travel or customer rides, Uber for Business gives you an easy way to manage your ground transportation needs. Built for work, it offers a clear view into employee trip activity with automated billing, expensing, and reporting.",
            anchor: `Visit Uber for Business`
        }
    ]



    return (
        <div>
            <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center w-full py-15'>
                <div className='lg:text-4xl text-2xl w-full font-bold'>
                    Food delivery on demand
                </div>
                <OffBiggerCards ArrayObject={ArrayObject1} />
            </div>
            <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center w-full py-15'>
                <div className='lg:text-4xl text-2xl w-full font-bold'>
                    Earn money with Uber
                </div>
                <OffBiggerCards ArrayObject={ArrayObject2} />
            </div>
            <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center w-full py-15'>
                <div className='lg:text-4xl text-2xl w-full font-bold'>
                    Moving cities forward, together
                </div>
                <OffBiggerCards ArrayObject={ArrayObject3} />
            </div>
            <div className='lg:pt-30 pt-15 flex flex-col gap-10 items-center w-full py-15'>
                <div className='lg:text-4xl text-2xl w-full font-bold'>
                    Helping businesses move ahead
                </div>
                <OffBiggerCards ArrayObject={ArrayObject4} />
            </div>
        </div>
    )
}

export default OffBiggerContainer
