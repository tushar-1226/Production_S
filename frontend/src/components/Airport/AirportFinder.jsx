import React, { useState } from 'react'
import { Search, MapPin, Plane } from 'lucide-react';

const AirportFinder = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const popularAirports = [
        { name: "Sardar Vallabhbhai Patel International Airport (AMD)", location: "Ahmedabad, India" },
        { name: "Sri Guru Ram Das Ji International Airport (ATQ)", location: "Amritsar, India" },
        { name: "Ayodhya Airport (AYJ)", location: "Ayodhya, India" },
        { name: "Biju Patnaik International Airport (BBI)", location: "Bhubaneswar, India" },
        { name: "Vadodara Airport (BDQ)", location: "Vadodara, India" },
        { name: "Bhopal Airport (BHO)", location: "Bhopal, India" },
        { name: "Kempegowda International Airport Bengaluru (BLR)", location: "Bengaluru, India" },
        { name: "Chhatrapati Shivaji International Airport (BOM)", location: "Mumbai, India" },
        { name: "Netaji Subhas Chandra Bose International Airport (CCU)", location: "Kolkata, India" },
        { name: "Coimbatore International Airport (CJB)", location: "Coimbatore, India" },
        { name: "Cochin International Airport (COK)", location: "Kochi, India" },
        { name: "Indira Gandhi International Airport (DEL)", location: "New Delhi, India" },
        { name: "Lokpriya Gopinath Bordoloi International Airport (GAU)", location: "Guwahati, India" },
        { name: "Dabolim Airport (GOI)", location: "Goa, India" },
        { name: "Manohar International Airport (GOX)", location: "Goa, India" },
        { name: "Rajiv Gandhi International Airport (HYD)", location: "Hyderabad, India" },
        { name: "Devi Ahilya Bai Holkar Airport (IDR)", location: "Indore, India" },
        { name: "Bagdogra Airport (IXB)", location: "Siliguri, India" },
        { name: "Chandigarh Airport (IXC)", location: "Chandigarh, India" },
        { name: "Mangalore International Airport (IXE)", location: "Mangalore, India" },
        { name: "Birsa Munda Airport (IXR)", location: "Ranchi, India" },
        { name: "Jaipur International Airport (JAI)", location: "Jaipur, India" },
        { name: "Jodhpur Airport (JDH)", location: "Jodhpur, India" },
        { name: "Kishangarh Airport (KQH)", location: "Ajmer, India" },
        { name: "Chaudhary Charan Singh International Airport (LKO)", location: "Lucknow, India" },
        { name: "Ludhiana Airport (LUH)", location: "Ludhiana, India" },
        { name: "Chennai International Airport (MAA)", location: "Chennai, India" },
        { name: "Mysore Airport (MYQ)", location: "Mysuru, India" },
        { name: "Dr. Babasaheb Ambedkar International Airport (NAG)", location: "Nagpur, India" },
        { name: "Jay Prakash Narayan International Airport (PAT)", location: "Patna, India" },
        { name: "Pune International Airport (PNQ)", location: "Pune, India" },
        { name: "Pondicherry Airport (PNY)", location: "Puducherry, India" },
        { name: "Swami Vivekananda Airport (RPR)", location: "Raipur, India" },
        { name: "Surat Airport (STV)", location: "Surat, India" },
        { name: "Trivandrum International Airport (TRV)", location: "Thiruvananthapuram, India" },
        { name: "Udaipur Airport (UDR)", location: "Udaipur, India" },
        { name: "Vijayawada International Airport (VGA)", location: "Vijayawada, India" },
        { name: "Lal Bahadur Shastri Airport (VNS)", location: "Varanasi, India" }
    ];

    const filteredAirports = popularAirports.filter(airport => 
        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='w-full flex flex-col gap-10 py-10'>
            <div className='text-4xl font-semibold'>
                Find your airport
            </div>
            <div className='flex gap-8 items-center max-w-3xl'>
                <div className='w-full'>
                    <input 
                        type="text" 
                        placeholder='Search for an airport' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-5 py-3 rounded-lg w-full bg-[#EFEFEF] outline-none focus:ring-2 focus:ring-black transition-all' 
                    />
                </div>
                <button className='bg-black p-3.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer'>
                  <Search color="white" size={20} strokeWidth={3}/>
                </button>
            </div>
            
            <div className='flex flex-col gap-6 mt-4 w-full max-w-3xl'>
                <h3 className="text-xl font-medium">{searchQuery ? 'Search Results' : 'Popular Airports'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAirports.length > 0 ? (
                        filteredAirports.map((airport, index) => (
                            <div key={index} className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all cursor-pointer group">
                                <div className="bg-gray-100 p-3 rounded-full mr-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Plane size={20} className="text-black" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 line-clamp-1">{airport.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{airport.location}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 text-gray-500 py-4">
                            No airports found matching "{searchQuery}"
                        </div>
                    )}
                </div>
                
                <button className="text-black font-semibold mt-4 underline underline-offset-4 hover:text-gray-600 transition-colors w-fit">
                    See all airports
                </button>
            </div>
        </div>
    )
}

export default AirportFinder
