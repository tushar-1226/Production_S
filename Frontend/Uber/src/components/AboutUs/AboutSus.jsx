import React from 'react'
import sus from '../../assets/sus.png'
import rideandbeyond from '../../assets/rideandbeyond.png'
import safety from '../../assets/safety.svg'

const AboutSus = () => {

    const DataArray = [
        {
            image: sus,
            heading: "Sustainability",
            desc: "Uber is committing to becoming a fully electric, zero-emission platform by 2040, with 100% of rides taking place in zero-emission vehicles, on public transit, or with micromobility. It is our responsibility as the largest mobility platform in the world to more aggressively tackle the challenge of climate change. We will do this by offering riders more ways to ride green, helping drivers go electric, making transparency a priority and partnering with NGOs and the private sector to help expedite a clean and just energy transition.",
            button: "Learn more"
        },
        {
            image: rideandbeyond,
            heading: "Rides and beyond",
            desc: "In addition to helping riders find a way to go from point A to point B, we're helping people order food quickly and affordably, removing barriers to healthcare, creating new freight-booking solutions, and helping companies provide a seamless employee travel experience. And always helping drivers and couriers earn.",
            button: "How to use the Uber app",
            button2: "Our offerings"
        },
        {
            image: safety,
            heading: "Your safety drives us",
            desc: "Whether you’re in the back seat or behind the wheel, your safety is essential. We are committed to doing our part, and technology is at the heart of our approach. We partner with safety advocates and develop new technologies and systems to help improve safety and help make it easier for everyone to get around.",
            button: "Learn more"
        }
    ]

    return (
        <div className='px-40 py-16 flex flex-col gap-20'>
            {DataArray.map((item, index) => {
                return (
                    <div key={index} className={`flex ${index === 2 ? 'flex-row-reverse' : 'flex-row'   } items-center gap-24 mb-24 last:mb-0`}>
                        <div className='flex-1'>
                            <img src={item.image} alt={item.heading} className='w-full h-auto object-cover' />
                        </div>
                        <div className='flex-1 flex flex-col gap-6'>
                            <h2 className='text-4xl font-bold text-[#333333]'>
                                {item.heading}
                            </h2>
                            <p className='text-base font-light leading-7 text-[#333333]'>
                                {item.desc}
                            </p>
                            <div className='flex gap-6'>
                                <button className='border-b border-[#333333] pb-1 font-light text-[#333333] hover:opacity-70'>
                                    {item.button}
                                </button>
                                {item.button2 && (
                                    <button className='border-b border-[#333333] pb-1 font-light text-[#333333] hover:opacity-70'>
                                        {item.button2}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AboutSus
