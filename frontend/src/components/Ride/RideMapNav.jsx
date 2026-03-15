import React, { useState } from 'react'
import wlogo from '../../assets/wlogo.png'
import car from '../../assets/car.png'
import key from '../../assets/key.png'
import { useAuth } from '../../context/AuthContext'
import eat from '../../assets/eat.png'
import { useNavigate, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const RideMapNav = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Ride');

  const tabs = [
    { name: 'Ride', icon: car },
    { name: 'Rent', icon: key },
    { name: 'Eat', icon: eat }
  ];

  const Sidebar = () => (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[2000]"
            onClick={() => setIsSidebarOpen(false)}
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-64 bg-white z-[2001] shadow-xl"
          >
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between p-4 border-b'>
                <Link to="/">
                  <div className=' h-8 overflow-hidden w-24 shrink-0 flex items-center justify-start'>
                    <img className='h-full w-full object-contain object-left' src={wlogo} alt="logo" />
                  </div>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className='p-2 hover:bg-gray-100 rounded-full'>
                  <X size={24} />
                </button>
              </div>
              <div className='flex flex-col p-4 gap-2'>
                {tabs.map((tab, index) => (
                  <motion.div 
                    key={tab.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    onClick={() => { setActiveTab(tab.name); setIsSidebarOpen(false); }}
                    className={`flex items-center gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors ${activeTab === tab.name ? 'bg-gray-100' : ''}`}
                  >
                    <div className='w-8'><img className='object-cover w-full' src={tab.icon} alt="" /></div>
                    <span className='font-medium text-lg'>{tab.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if(user){
    return (
    <div className='h-16 border-b-4 border-gray-200 fixed left-0 top-0 z-[1000] w-full flex items-center px-4 lg:px-16 justify-between bg-white'>
      <Sidebar />
      {/* left section */}
      <div className='flex items-center gap-4'>
        <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden p-2 hover:bg-gray-100 rounded-full'>
          <Menu size={24} />
        </button>
        <Link to="/">
          <div className={`h-8 lg:h-14 w-24 lg:w-40 shrink-0 items-center justify-start overflow-hidden hidden lg:flex`}>
            <img className='max-h-full max-w-full object-contain object-left' src={wlogo} alt="logo" />
          </div>
        </Link>
      </div>
      {/* center section */}
      <div className='hidden lg:flex items-center gap-8 absolute left-1/2 top-0 h-full -translate-x-1/2'>
        {tabs.map((tab) => (
          <div 
            key={tab.name} 
            onClick={() => setActiveTab(tab.name)}
            className={`relative h-full flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 transition-colors ${activeTab === tab.name ? 'text-black' : 'text-gray-600'}`}
          >
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={tab.icon} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>{tab.name}</span>
            {activeTab === tab.name && (
              <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-1 bg-black" />
            )}
          </div>
        ))}
      </div>
      {/* right section */}
      <div>
        <div className='flex gap-2'>
          <button onClick={() => navigate('/me')} className='flex gap-1 py-2 px-3 rounded-full items-center bg-black text-white cursor-pointer text-sm font-medium'>
            {user.firstName}
          </button>
        </div>
      </div>
    </div>
  )
  }

  return (
    <div className='h-16 border-b-4 border-gray-200 fixed left-0 top-0 z-[1000] w-full flex items-center px-4 lg:px-16 justify-between bg-white'>
      <Sidebar />
      {/* left section */}
      <div className='flex items-center gap-4 overflow-hidden h-15'>
        <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden p-2 hover:bg-gray-100 rounded-full'>
          <Menu size={24} />
        </button>
        <Link to="/">
          <div className={`h-8 w-24 lg:h-20 lg:w-24 overflow-hidden shrink-0 items-center justify-start lg:flex hidden`}>
            <img className='max-h-full max-w-full object-contain object-left' src={wlogo} alt="logo" />
          </div>
        </Link>
      </div>
      {/* center section */}
      <div className='hidden lg:flex items-center gap-8 absolute left-1/2 top-0 h-full -translate-x-1/2'>
        {tabs.map((tab) => (
          <div 
            key={tab.name} 
            onClick={() => setActiveTab(tab.name)}
            className={`relative h-full flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 transition-colors ${activeTab === tab.name ? 'text-black' : 'text-gray-600'}`}
          >
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={tab.icon} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>{tab.name}</span>
            {activeTab === tab.name && (
              <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-1 bg-black" />
            )}
          </div>
        ))}
      </div>
      {/* right section */}
      <div>
        <div className='flex gap-2'>
          <button onClick={() => { navigate('/login') }} className='flex gap-2 py-1 px-2 hover:bg-gray-200 rounded-full items-center cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            <span className='text-sm font-medium'>Login</span>
          </button>

          <button onClick={() => { navigate('/signup') }} className='whitespace-nowrap gap-1 py-2 px-3 rounded-full items-center bg-black text-white cursor-pointer text-sm font-medium'>
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default RideMapNav
