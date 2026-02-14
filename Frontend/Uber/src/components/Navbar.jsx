import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { ChevronDown, ChevronRight } from 'lucide-react';
import RightNav from "./RightNav";

const Navbar = () => {

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAirportOpen, setIsAirportOpen] = useState(false);
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const [isIntercityOpen, setIsIntercityOpen] = useState(false);
  const [isPopularOpen, setIsPopularOpen] = useState(false);
  const [isTaxiOpen, setIsTaxiOpen] = useState(false);


  return (
    <div className="lg:px-22 md:px-6 w-full h-16 flex flex-row items-center bg-black px-5 justify-between fixed top-0 left-0 z-100000000000000000000">
      {/* left section of navbar */}
      <div className="flex items-center gap-7">
        <a href="">
          <div className="lg:h-15 lg:w-15 h-14 w-14 flex items-center">
            <img className="object-cover w-full h-full" src={logo} alt="logo" />
          </div>
        </a>
        <ul className=" flex items-center gap-2 text-sm font-medium text-white">
          <li>
            <a href="/ride" className="text-white hidden lg:block hover:bg-white/10 rounded-full px-3 py-2 cursor-pointer">
              Ride
            </a>
          </li>

          <li>
            <a href="" className="text-white hidden lg:block hover:bg-white/10 rounded-full px-3 py-2">
              Drive
            </a>
          </li>

          <li>
            <a href="/business" className="text-white hidden lg:block hover:bg-white/10 cursor-pointer rounded-full px-3 py-2">
              Business
            </a>
          </li>

          <li className="relative hidden lg:block hover:bg-white/10 cursor-pointer rounded-full px-3 py-2">
            <button onClick={() => setIsAboutOpen(!isAboutOpen)} className="text-white flex items-center gap-2 cursor-pointer">
              <span>About</span> <ChevronDown className={`${isAboutOpen ? "rotate-180" : ""}`} size={15} strokeWidth={4} />
            </button>
            <div className={`absolute top-12.5  flex flex-col justify-between left-0 bg-white rounded-b-[8px] text-black w-48 z-50 transition-all duration-100  ${isAboutOpen ? "h-103 pt-1 pb-1.5 shadow-lg opacity-100 visible" : "h-0 shadow-none opacity-0 invisible"}`}>
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
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                  className="w-full px-4 py-2 text-gray-500 hover:bg-gray-100 font-light flex items-center justify-between cursor-pointer"
                >
                  Explore <ChevronRight size={17} />
                </button>

                <div
                  className={`absolute top-0 left-3 lg:left-50 bg-white rounded-[10px] py-3 text-black shadow-lg z-50 transition-all ease-in-out ${isExploreOpen ? "w-48 opacity-100" : "w-0 opacity-0"}`}
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  <a href="" className="block px-4 py-2 flex justify-between  text-gray-500 hover:bg-gray-100 font-light"
                    onMouseEnter={() => setIsAirportOpen(true)}
                    onMouseLeave={() => setIsAirportOpen(false)}>
                    Airports <ChevronRight size={17} />
                    <div
                      className={`absolute top-0 left-3 lg:left-50 bg-white rounded-[10px] py-3 text-black shadow-lg z-50 transition-all ease-in-out ${isAirportOpen ? "w-48 opacity-100" : "w-0 opacity-0"}`}>
                      <a href="" className="block px-4 py-2 flex justify-between  text-gray-500 hover:bg-gray-100 font-light">
                        Mumbai Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Delhi Airpor
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Bengluru Airports
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Hydrabad Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Kolkata Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Pune Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Chennai Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Ahmedabad Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Cochin Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Jaipur Airport
                      </a>
                    </div>
                  </a>
                  <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light"
                    onMouseEnter={() => setIsCourierOpen(true)}
                    onMouseLeave={() => setIsCourierOpen(false)}
                  >
                    Courier services <ChevronRight size={17} />
                    <div
                      className={`absolute top-0 left-3 lg:left-50 bg-white rounded-[10px] py-3 text-black shadow-lg z-50 transition-all ease-in-out ${isCourierOpen ? "w-68 opacity-100" : "w-0 opacity-0"}`}>
                      <a href="" className="block px-4 py-2 flex justify-between  text-gray-500 hover:bg-gray-100 font-light">
                        Couries services
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Mumbai (Suburban)
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Bangalore North
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Hydrabad Airport
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Haveli
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Hyderabad
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Kolkata
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Chennai
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Ahmadabad City
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Jaipur
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Courier services Lucknow
                      </a>
                    </div>
                  </a>
                  <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light"
                    onMouseEnter={() => setIsIntercityOpen(true)}
                    onMouseLeave={() => setIsIntercityOpen(false)}
                  >
                    Intercity routes <ChevronRight size={17} />
                    <div
                      className={`absolute top-0 left-3 lg:left-50 bg-white rounded-[10px] py-3 text-black shadow-lg z-50 transition-all ease-in-out ${isIntercityOpen ? "w-68 opacity-100" : "w-0 opacity-0"}`}>
                      <a href="" className="block px-4 py-2 flex justify-between  text-gray-500 hover:bg-gray-100 font-light">
                        Pune to Mumbai
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-Taxi">
                        Lucknow to Kanpur
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Mumbai to Pune
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Delhi to Sonipat
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Delhi to Mathura
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Pune to Mumbai
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Pune to Mumbai
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Delhi to Rohtak
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Mumbai to Pune
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Mumbai to Pune
                      </a>
                    </div>
                  </a>
                  <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light"
                    onMouseEnter={() => setIsPopularOpen(true)}
                    onMouseLeave={() => setIsPopularOpen(false)}
                  >
                    Popular routes <ChevronRight size={17} />
                    <div
                      className={`absolute top-0 left-3 lg:left-50 bg-white rounded-[10px] py-3 text-black shadow-lg z-50 transition-all ease-in-out ${isPopularOpen ? "w-68 opacity-100" : "w-0 opacity-0"}`}>
                      <a href="" className="block px-4 py-2 flex justify-between  text-gray-500 hover:bg-gray-100 font-light">
                        New Delhi to DEL
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Mumbai (Suburban) to BOM
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        S.A.S.Nagar (Mohali) to Chandigarh
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Malkajgiri to Hyderabad
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Bangalore North to BLR
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Haveli to PNQ
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Ahmadabad City to AMD
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Kolkata to CCU
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Chennai to MAA
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Lucknow to BakshiKa Talab
                      </a>
                    </div>
                  </a>
                  <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light"
                    onMouseEnter={() => setIsTaxiOpen(true)}
                    onMouseLeave={() => setIsTaxiOpen(false)}
                  >
                    Taxis <ChevronRight size={17} />
                    <div
                      className={`absolute top-0 left-3 lg:left-50 bg-white rounded-[10px] py-3 text-black shadow-lg z-50 transition-all ease-in-out ${isTaxiOpen ? "w-68 opacity-100" : "w-0 opacity-0"}`}>
                      <a href="" className="block px-4 py-2 flex justify-between  text-gray-500 hover:bg-gray-100 font-light">
                        Taxi New Delhi
                      </a>
                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Mumbai (Suburban)
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Bangalore North
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Haveli
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Hyderabad
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Kolkata
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Chennai
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Ahmadabad City
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Kanayannur
                      </a>

                      <a href="" className="block px-4 py-2 flex justify-between text-gray-500 hover:bg-gray-100 font-light">
                        Taxi Jaipur
                      </a>

                    </div>
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
