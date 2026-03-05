import React from 'react'
import { Globe } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const RightNav = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    if (user) {
        return (
            <div>
                <ul className="flex items-center lg:gap-6 gap-3 text-sm font-medium text-white">
                    <li className='lg:block hidden'><span className="text-white">Hello, {user.firstName}</span></li>
                    <li>
                        <button onClick={handleLogout} className="bg-white text-black rounded-full px-3 py-2  lg:px-4 lg:py-2 lg:text-sm hover:cursor-pointer hover:bg-gray-200">
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
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
                    <a href="/login" target="_self" className="text-white text-sm hover:bg-white/10 rounded-full px-3 py-2">
                        Log in
                    </a>
                </li>

                <li>
                    <button onClick={()=>{navigate('/signup')}} className="bg-white text-black rounded-full px-3 py-2  lg:px-4 lg:py-2 lg:text-sm hover:cursor-pointer hover:bg-gray-200">
                        Sign up
                    </button>
                </li>

                
            </ul>
        </div>
    )
}

export default RightNav
