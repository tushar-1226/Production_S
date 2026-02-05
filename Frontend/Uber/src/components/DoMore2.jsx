
import Qr from '../assets/Qr.png'
import { ArrowRight } from 'lucide-react';
import logo from "../assets/logo.svg";

const DoMore2 = () => {
    return (
        <div className='lg:hidden block pt-10'>
            <div className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
                Do more in the app
            </div>
            <div className='w-full lg:w-auto'>
                    <div className='flex flex-col sm:flex-row justify-between items-center p-5 sm:p-8 h-auto sm:h-50 bg-white w-full lg:w-140 group gap-4 sm:gap-0' >
                        <div className='flex items-center gap-3 sm:gap-5 w-full sm:w-auto'>
                            <div className='h-28 sm:h-38 w-28 sm:w-38 bg-blue-200 flex-shrink-0'>
                                <img className='object-cover h-full w-full' src={logo} />
                            </div>

                            <div className='flex flex-col'>
                                <span className='text-lg sm:text-2xl font-semibold' >Download the Uber app</span>
                                <span className='text-xs sm:text-sm'>Scan to download</span>
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
