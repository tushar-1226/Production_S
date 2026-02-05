import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import RightNav from "./RightNav";

const Navbar = () => {
  console.log("hello")
  console.log("hello")
  console.log("hello")
  console.log("hello")
  console.log("hello")
  console.log("hello")
  console.log("hello")
  console.log("hello")
  console.log("hello")

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <div className="lg:px-22 md:px-6 w-full h-16 flex flex-row items-center bg-black px-5 justify-between fixed top-0 left-0 z-10">
      {/* left section of navbar */}
      <div className="flex items-center gap-7">
        <a href="">
          <div className="lg:h-15 lg:w-15 h-14 w-14 flex items-center">
            <img className="object-cover w-full h-full" src={logo} alt="logo" />
          </div>
        </a>
        <ul className=" flex items-center gap-7 text-sm font-medium text-white">
          <li>
            <a href="" className="text-white hidden lg:block">
              Ride
            </a>
          </li>

          <li>
            <a href="" className="text-white hidden lg:block">
              Drive
            </a>
          </li>

          <li>
            <a href="" className="text-white hidden lg:block">
              Business
            </a>
          </li>

          <li className="relative hidden lg:block">
            <button onClick={() => setIsAboutOpen(!isAboutOpen)} className="text-white flex items-center gap-2">
              <span>About</span> <ChevronDown className={`${isAboutOpen ? "rotate-180" : ""}`} size={15} strokeWidth={4} />
            </button>
            <div className={`absolute top-10.5 flex flex-col justify-between bg-white left-0  text-black w-48 z-50 ${isAboutOpen ? "h-103 pt-1 pb-1.5 overflow-visible shadow-lg" : "h-0 overflow-hidden shadow-none"} transition-all duration-[0.03s] ease-in`}>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                About us
              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Our offering

              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                How Uber works

              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Sustainability
              </a>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsExploreOpen(!isExploreOpen)}
                  className="w-full px-4 py-2 text-gray-500 hover:bg-gray-100 font-light flex items-center justify-between"
                >
                  Explore <ChevronRight size={17} />
                </button>

                <div
                  className={`absolute top-0 left-full  bg-white text-black shadow-lg z-50 transition-all duration-200 ease-in-out ${isExploreOpen ? "w-48 opacity-100" : "w-0 opacity-0"}`}
                >
                  <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                    About us
                  </a>
                  <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                    Our offering
                  </a>
                  <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                    How Uber works
                  </a>
                  <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                    Sustainability
                  </a>
                </div>
              </div>

              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Newsroom
              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Invester relations
              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Autonomous
              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Blog
              </a>
              <a href="" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 font-light">
                Careers
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* right section of nav */}
      <RightNav />
    </div>
  );
};

export default Navbar;
