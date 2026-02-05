import Qr from '../assets/Qr.png'
import { ArrowRight } from 'lucide-react';
import logo from "../assets/logo.svg";

const DoMore2 = () => {
    return (
        <div className='lg:hidden block pt-10 flex flex-col gap-9 '>
            <div className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
                Do more in the app
            </div>
            <div className='w-full border-gray-200 border-2 px-4 lg:w-auto '>
                    <div className='flex flex-row justify-between items-center lg:p-5 py-4 h-auto sm:h-50 bg-white w-full lg:w-140 group gap-4 sm:gap-0' >
                        <div className='flex items-center gap-3 sm:gap-5 w-full'>
                            <div className='lg:h-28 h-22 lg:w-28 w-22 flex-shrink-0'>
                                <img className='object-contain h-full w-full' src={logo} />
                            </div>

                            <div className=''>
                                <span className='lg:text-lg text-2xl font-semibold' >Download the Uber app</span>
                            </div>
                        </div>
                        
                        <div className='flex-shrink-0'>
                            <ArrowRight className='transition-transfrom duration-300 ease-in group-hover:translate-x-4 m-0  ' size={25} />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DoMore2
