import React, { useRef, useState } from 'react'
import OffPopCards from './OffPopCards'
import uberx from '../../assets/uberx.png'
import uberxshare from '../../assets/uberxshare.png'
import greenscooter from '../../assets/greenscooter.png'
import uberblack from '../../assets/uberblack.png'
import uberwav from '../../assets/uberwav.png'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import offSafety from '../../assets/offSafety.svg'
import offCities from '../../assets/offCities.svg'
import offAirport from '../../assets/offAirport.svg'




const OffPopular = () => {
    const ScrollRef = useRef(null)
    const [TotalPage, setTotalPage] = useState(2)
    const [PageNum, setPageNum] = useState(1)

    const ArrayObject = [
        {
            image: uberx,
            heading: "UberX",
            desc: "Affordable rides, all to yourself",
            anchor: `Learn more about`
        },
        {
            image: uberxshare,
            heading: "UberX Share",
            desc: "Share the ride with up to one co-rider at a time",
            anchor: `Learn more about`
        },
        {
            image: uberx,
            heading: "Uber Comfort",
            desc: "Newer cars with extra legroom",
            anchor: `Learn more about`
        },
        {
            image: uberblack,
            heading: "Uber Black",
            desc: "Premium rides in luxury cars",
            anchor: `Learn more about`
        },
        {
            image: greenscooter,
            heading: "Scooters",
            desc: "Electric scooters to help you get around your city",
            anchor: `Learn more about`
        },
        {
            image: uberwav,
            heading: "Uber WAV",
            desc: "Ride assistance for seniors and people with disabilities",
            anchor: `Learn more about`
        }
    ]

    const SmallerCards = [
        {
            image: offSafety,
            heading: "Safety",
            desc: "Peace of mind is designed into your experience.",
            anchor: `Learn more about safety`
        },
        {
            image: offCities,
            heading: "Cities",
            desc: "Available in 15,000+ cities.",
            anchor: `Find a city`
        },
        {
            image: offAirport,
            heading: "Airports",
            desc: "Access to rides at 700+ airports.",
            anchor: `See all airports`
        }
    ]

    function ScrollRight() {
        ScrollRef.current?.scrollBy({
            left: 1200,
            behavior: 'smooth'
        });
        if (PageNum < TotalPage) {
            setPageNum(PageNum + 1)
        }
    }

    function ScrollLeft() {
        ScrollRef.current?.scrollBy({
            left: -1200,
            behavior: 'smooth'
        });
        if (PageNum > 1) {
            setPageNum(PageNum - 1)
        }
    }

    return (
        <div className='w-full pb-20'>
            <section className='pt-16 flex flex-col gap-9'>
                <div className='text-[#333333] text-5xl font-semibold'>
                    Uber's most popular ride options
                </div>
                <div className='text-[#333333] font-light'>
                    Request a ride, hop in, and go.
                </div>
                <div className='flex gap-3'>
                    <span className='text-[#2f2f2f] font-lg'>
                        <u className='underline-offset-8 decoration-gray-200'>Download the app</u>
                    </span>
                    <span className='text-[#2f2f2f] font-lg'>
                        <u className='underline-offset-8 decoration-gray-200'>See more ride options</u>
                    </span>
                </div>
            </section>
            <div className='flex flex-col gap-20 w-full mt-10'>
                <OffPopCards ArrayObject={ArrayObject} ScrollRef={ScrollRef} cards='big' />
                <div className='relative w-full h-12'>
                    <div className='flex gap-5 items-center absolute right-0'>
                        <div className=''>
                            {PageNum}/{TotalPage}
                        </div>
                        <div className='rounded-full bg-gray-300 h-13 w-13 flex items-center justify-center hover:bg-gray-400 duration-150 cursor-pointer' onClick={ScrollLeft} >
                            <ChevronLeft strokeWidth={3} className={`${PageNum === 1 ? "text-gray-500" : "text-black"}`} />
                        </div>
                        <div className='rounded-full bg-gray-300 h-13 w-13 flex items-center justify-center cursor-pointer hover:bg-gray-400 duration-150' onClick={ScrollRight}>
                            <ChevronRight strokeWidth={3} className={`${PageNum === TotalPage ? "text-gray-500" : "text-black"}`} />
                        </div>
                    </div>
                </div>
                <div>
                    <OffPopCards ArrayObject={SmallerCards} cards='small' />
                </div>
            </div>
        </div>
    )
}

export default OffPopular
