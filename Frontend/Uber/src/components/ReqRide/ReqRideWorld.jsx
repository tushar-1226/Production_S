import React, { useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import ReqRideCardforWorld from './ReqRideCardforWorld'
import calwclock from '../../assets/calwclock.png'
import carkey from '../../assets/carkey.png'
import yellowtaxi from '../../assets/yellowtaxi.png'
import greencar from '../../assets/greencar.png'
import uberx from '../../assets/uberx.png'
import hourly from '../../assets/hourly.png'
import uberxshare from '../../assets/uberxshare.png'
import ubertransit from '../../assets/ubertransit.png'
import uberintercity from '../../assets/uberintercity.png'
import bikereq from '../../assets/bikereq.png'
import greenbike from '../../assets/greenbike.png'
import greenscooter from '../../assets/greenscooter.png'
import yellowauto from '../../assets/yellowauto.png'
import uberblack from '../../assets/uberblack.png'
import blacksuv from '../../assets/blacksuv.png'
import uberxl from '../../assets/uberxl.png'
import uberwav from '../../assets/uberwav.png'

const ReqRideWorld = () => {

    const [IsActive, setIsActive] = useState('features')
    const [TotalPage, setTotalPage] = useState(3)
    const [PageNum, setPageNum] = useState(1)

    const FeaturesRef = useRef(null);
    const WheelsRef = useRef(null);
    const ExtraRef = useRef(null);

    const moveClasses = {
        features: "left-0 w-25",
        wheels: "left-24 w-27",
        extra: "left-55 w-25",
    }

    const FeaturesArray = [
        {
            image: calwclock,
            heading: "Uber Reserve",
            desc: "Book a ride in advance",
            anchor: `Learn more about`
        },
        {
            image: carkey,
            heading: "Uber Rent",
            desc: "Pick a car. See the price. Get moving.",
            anchor: `Learn more about`
        },
        {
            image: yellowtaxi,
            heading: "Uber Taxi",
            desc: "Local taxi cabs at the tap of a button",
            anchor: `Learn more about`
        },
        {
            image: greencar,
            heading: "Uber Green",
            desc: "Sustainable rides in electric vehicles and hybrid vehicles",
            anchor: `Learn more about`
        },
        {
            image: uberx,
            heading: "UberX",
            desc: "Affordable rides, all to yourself",
            anchor: `Learn more about`
        },
        {
            image: hourly,
            heading: "Hourly",
            desc: "As many stops as you need in one car",
            anchor: `Learn more about`
        },
        {
            image: uberxshare,
            heading: "UberX Share",
            desc: "Share the ride with up to one co-rider at a time",
            anchor: `Learn more about`
        },
        {
            image: ubertransit,
            heading: "Uber Transit",
            desc: "Real-time public transit information in the Uber app",
            anchor: `Learn more about`
        },
        {
            image: uberintercity,
            heading: "Uber Intercity",
            desc: "Go city to city",
            anchor: `Learn more about`
        }
    ]

    const WheelsArray = [
        {
            image: bikereq,
            heading: "Uber Bike",
            desc: "Motorcycles for one rider",
            anchor: `Learn more about`
        },
        {
            image: greenbike,
            heading: "Bikes",
            desc: "On-demand electric bikes that allow you to go further",
            anchor: `Learn more about`
        },
        {
            image: greenscooter,
            heading: "Scooters",
            desc: "Electric scooters to help you get around your city",
            anchor: `Learn more about`
        },
        {
            image: yellowauto,
            heading: "Auto",
            desc: "Auto rickshaws at the tap of a button",
            anchor: `Learn more about`
        }
    ]

    const ExtraArray = [
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
            image: blacksuv,
            heading: "Uber Black SUV",
            desc: "Premium rides for 6 in luxury SUVs",
            anchor: `Learn more about`
        },
        {
            image: uberxl,
            heading: "UberXL",
            desc: "Affordable rides for groups up to 6",
            anchor: `Learn more about`
        },
        {
            image: uberwav,
            heading: "Uber WAV",
            desc: "Ride assistance for seniors and people with disabilities",
            anchor: `Learn more about`
        }
    ]

    function ScrollRight() {
        const activeRef = IsActive === 'features' ? FeaturesRef : IsActive === 'wheels' ? WheelsRef : ExtraRef;
        activeRef.current?.scrollBy({
            left: 1200,
            behavior: 'smooth'
        });
        if (IsActive === 'features') {
            setTotalPage(3)
            if (PageNum < TotalPage) {
                setPageNum(PageNum + 1)
            }
        }
        if (IsActive === 'wheels') {
            setTotalPage(2)
            if (PageNum < TotalPage) {
                setPageNum(PageNum + 1)
            }
        }
        if (IsActive === 'extra') {
            setTotalPage(2)
            if (PageNum < TotalPage) {
                setPageNum(PageNum + 1)
            }
        }

    }

    function ScrollLeft() {
        const activeRef = IsActive === 'features' ? FeaturesRef : IsActive === 'wheels' ? WheelsRef : ExtraRef;
        activeRef.current?.scrollBy({
            left: -1200,
            behavior: 'smooth'
        });
        if (IsActive === 'features') {
            setTotalPage(3)
            if (PageNum > 1) {
                setPageNum(PageNum - 1)
            }
        }
        if (IsActive === 'wheels') {
            setTotalPage(2)
            if (PageNum > 1) {
                setPageNum(PageNum - 1)
            }
        }
        if (IsActive === 'extra') {
            setTotalPage(2)
            if (PageNum > 1) {
                setPageNum(PageNum - 1)
            }
        }
    }

    return (
        <div className='w-full py-30 flex flex-col gap-8'>
            <div className='text-4xl font-semibold text-[#333333]'>
                Rides around the world
            </div>
            <div className='w-185 text-[#333333]'>
                There’s more than one way to move with Uber, no matter where you are or where you’re headed next. Check the app to see which ride options are available near you.*
            </div>
            <div className='relative flex gap-8 pl-4 h-10 text-sm font-semibold'>
                <div onClick={() => {
                    setIsActive('features')
                    setPageNum(1)
                    setTotalPage(3)
                }}
                    className='cursor-pointer'>
                    Features
                </div>
                <div onClick={() => {
                    setIsActive('wheels')
                    setPageNum(1)
                    setTotalPage(2)
                }}
                    className='cursor-pointer'>
                    2 or 3 wheels
                </div>
                <div onClick={() => {
                    setIsActive('extra')
                    setPageNum(1)
                    setTotalPage(2)
                }}
                    className='cursor-pointer'>
                    Extra room
                </div>
                <div className={`absolute bottom-0 z-10 h-[6px] ${moveClasses[IsActive] ?? ""} bg-black transition-all duration-400 ease-out`}></div>
                <div className='h-[6px] w-full bg-gray-300 absolute bottom-0 left-0'></div>
            </div>
            <div className='flex flex-col gap-20 '>
                {/* features */}
                <div className={IsActive === "features" ? "block" : "hidden"} >
                    <ReqRideCardforWorld ArrayObject={FeaturesArray} ScrollRef={FeaturesRef} />
                </div>
                {/* wheels */}
                <div className={IsActive === "wheels" ? "block" : "hidden"} >
                    <ReqRideCardforWorld ArrayObject={WheelsArray} ScrollRef={WheelsRef} />
                </div>
                {/* Extra */}
                <div className={IsActive === "extra" ? "block" : "hidden"}>
                    <ReqRideCardforWorld ArrayObject={ExtraArray} ScrollRef={ExtraRef} />
                </div>
                <div className='relative w-full'>
                    <div className='flex gap-5 items-center absolute right-0'>
                        <div className=''>
                            {PageNum}/{TotalPage}
                        </div>
                        <div className='rounded-full bg-gray-300 h-13 w-13 flex items-center justify-center hover:bg-gray-400 duration-150 cursor-pointer' onClick={ScrollLeft} >
                            <ChevronLeft strokeWidth={3} className={`${PageNum === 1? "text-gray-500": "text-black"}`} />
                        </div>
                        <div className='rounded-full bg-gray-300 h-13 w-13 flex items-center justify-center cursor-pointer hover:bg-gray-400 duration-150' onClick={ScrollRight}>
                            <ChevronRight strokeWidth={3} className={`${PageNum === TotalPage? "text-gray-500": "text-black"}`} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReqRideWorld
