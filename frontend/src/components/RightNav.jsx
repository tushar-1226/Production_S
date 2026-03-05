import React from 'react'
import { Globe } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import {useAuth} from '../context/AuthContext'

const RightNav = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    if (user) {
        return (
            <div>
                <ul className="flex items-center lg:gap-6 gap-3 text-sm font-medium text-white">
                    <li className='lg:block hidden'>
                        <a href="" className="text-white flex items-center gap-2">
                            <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>EN</span>
                        </a>
                    </li>

                    <li className='lg:block hidden'>
                        <a href="" className="text-white">
                            Help
                        </a>
                    </li>

                    <li>
                        <button onClick={() => { navigate('/me') }} className="bg-white text-black rounded-full px-3 py-2  lg:px-4 lg:py-2 lg:text-sm hover:cursor-pointer hover:bg-gray-200">
                            {user.firstName}
                        </button>
                    </li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <ul className="flex items-center lg:gap-6 gap-3 text-sm font-medium text-white">
                    <li className='lg:block hidden'>
                        <a href="" className="text-white flex items-center gap-2">
                            <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>EN</span>
                        </a>
                    </li>

                    <li className='lg:block hidden'>
                        <a href="" className="text-white">
                            Help
                        </a>
                    </li>

                    <li className='rounded-full'>
                        <Link to="/login" className="text-white text-sm hover:bg-white/10 rounded-full px-3 py-2">
                            Log in
                        </Link>
                    </li>

                    <li>
                        <button onClick={() => { navigate('/signup') }} className="bg-white text-black rounded-full px-3 py-2  lg:px-4 lg:py-2 lg:text-sm hover:cursor-pointer hover:bg-gray-200">
                            Sign up
                        </button>
                    </li>


                </ul>
            </div>
        )
    }
}

export default RightNav
