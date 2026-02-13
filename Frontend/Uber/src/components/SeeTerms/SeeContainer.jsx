import React, { useRef, useState } from 'react'
import SeeSmallCards from './SeeSmallCards'
import smallcard1 from '../../assets/smallcard1.png'
import smallcard2 from '../../assets/smallcard2.png'
import smallcard3 from '../../assets/smallcard3.png'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import smallcard4 from '../../assets/smallcard4.png'
import smallcard5 from '../../assets/smallcard5.png'
import smallcard6 from '../../assets/smallcard6.png'

const SeeContainer = () => {
    console.log(PageNum);
    console.log(TotalPage);
    console.log(ScrollRef);
    console.log(ArrayObject);
    console.log(ScrollLeft);
    console.log(ScrollRight);

    const ScrollRef = useRef(null);
    const [PageNum, setPageNum] = useState(1);
    const [TotalPage, setTotalPage] = useState(3);

    const ArrayObject = [
        {
            image: smallcard1,
            heading: "Rides to the airport",
        },
        {
            image: smallcard2,
            heading: "Business meetings"
        },
        {
            image: smallcard3,
            heading: "Dinner reservations"
        },
        {
            image: smallcard4,
            heading: "Commutes"
        },
        {
            image: smallcard5,
            heading: "Pickups in suburbs"
        },
        {
            image: smallcard6,
            heading: "Appointments"
        }

    ]

    function ScrollRight() {
        ScrollRef.current?.scrollBy({
            left: 1200,
            behavior: "smooth"
        });
        if (PageNum < TotalPage) setPageNum(PageNum + 1);
    }

    function ScrollLeft() {
        ScrollRef.current?.scrollBy({
            left: -1200,
            behavior: "smooth"
        });
        if (PageNum > 1) setPageNum(PageNum - 1);
    }

    return (
        <div className='py-30'>
            <div>
                <SeeSmallCards ArrayObject={ArrayObject} ScrollRef={ScrollRef} />
            </div>
            <div className='relative w-full'>
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
        </div>
    )
}

export default SeeContainer
