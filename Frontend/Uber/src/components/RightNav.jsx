import React from 'react'
import { Globe } from 'lucide-react';


const RightNav = () => {
    return (
        <div>
            <ul className="flex items-center gap-6 text-sm font-medium text-white">
                <li>
                    <a href="" className="text-white flex items-center gap-2">
                        <Globe className="rotate-130" size={15} strokeWidth={3.5} /><span>EN</span>
                    </a>
                </li>

                <li>
                    <a href="" className="text-white">
                        Help
                    </a>
                </li>

                <li>
                    <a href="" className="text-white">
                        Log in
                    </a>
                </li>

                <li>
                    <button className="bg-white text-black px-3 py-2 rounded-full">
                        Sign up
                    </button>
                </li>
            </ul>


        </div>
    )
}

export default RightNav
