import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { ChevronDown } from 'lucide-react';
import { Globe } from 'lucide-react';

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  console.log("hello world");

  return (
    <div className="lg:px-22 w-full h-16 flex flex-row items-center bg-black px-6 justify-between">
      {/* left section of navbar */}
      <div className="flex items-center gap-7">
        <a href="">
          <img height={50} width={64} src={logo} alt="logo" />
        </a>
        <ul className="flex items-center gap-7 text-sm font-medium text-white">
          <li>
            <a href="" className="text-white">
              Ride
            </a>
          </li>

          <li>
            <a href="" className="text-white">
              Drive
            </a>
          </li>

          <li>
            <a href="" className="text-white">
              Business
            </a>
          </li>

          <li className="relative">
            <button onClick={() => setIsAboutOpen(!isAboutOpen)} className="text-white flex items-center gap-2">
              <span>About</span> <ChevronDown className={`${isAboutOpen ? "rotate-180" : ""}`} size={15} strokeWidth={4}/>
            </button>
            <div className={`absolute top-10.5 bg-white left-0  text-black shadow-lg  w-48 z-50 ${isAboutOpen ? "block" : "hidden"}`}>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-normal">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">Our offerings</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
              <a href="" className="block px-4 py-2 hover:bg-gray-100 font-extralight">About us</a>
            </div>
          </li>
        </ul>
      </div>
      {/* right section of nav */}
      <div>
        <ul className="flex items-center gap-6 text-sm font-medium text-white">
          <li>
            <a href="" className="text-white flex items-center gap-2">
              <Globe className="rotate-130" size={15} strokeWidth={3.5}/><span>EN</span>
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
    </div>
  );
};

export default Navbar;
