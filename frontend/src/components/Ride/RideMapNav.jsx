import React, { useState } from 'react'
import wlogo from '../../assets/wlogo.png'
import car from '../../assets/car.png'
import key from '../../assets/key.png'
import { useAuth } from '../../context/AuthContext'
import eat from '../../assets/eat.png'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const RideMapNav = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <div className='w-20 h-10 flex items-center justify-center overflow-hidden'>
                  <img className='object-contain h-full' src={wlogo} alt="" />
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className='p-2 hover:bg-gray-100 rounded-full'>
                  <X size={24} />
                </button>
              </div>
              <div className='flex flex-col p-4 gap-2'>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className='flex items-center gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors'
                >
                  <div className='w-8'><img className='object-cover w-full' src={car} alt="" /></div>
                  <span className='font-medium text-lg'>Ride</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className='flex items-center gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors'
                >
                  <div className='w-8'><img className='object-cover w-full' src={key} alt="" /></div>
                  <span className='font-medium text-lg'>Rent</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='flex items-center gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors'
                >
                  <div className='w-8'><img className='object-cover w-full' src={eat} alt="" /></div>
                  <span className='font-medium text-lg'>Eat</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if(user){
    return (
    <div className='h-16 border-b-4 border-gray-200 fixed left-0 top-0 z-[1000] w-full overflow-hidden flex items-center px-4 lg:px-16 justify-between bg-white'>
      <Sidebar />
      {/* left section */}
      <div className='flex items-center gap-4 lg:gap-20'>
        <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden p-2 hover:bg-gray-100 rounded-full'>
          <Menu size={24} />
        </button>
        <div className={isSidebarOpen === true ?'h-0 w-0':`w-20`}>
          <img className='object-contain h-full' src={wlogo} alt="" />
        </div>
        <div className='hidden lg:flex gap-3'>
          <div className='flex items-center'>
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={car} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>
              Ride
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={key} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>
              Rent
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={eat} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>
              Eat
            </span>
          </div>
        </div>
      </div>
      {/* right section */}
      <div>
        <div className='flex gap-2'>
          <button className='flex gap-1 py-2 px-3 rounded-full items-center bg-black text-white cursor-pointer text-sm font-medium'>
            {user.firstName}
          </button>
        </div>
      </div>
    </div>
  )
  }

  return (
    <div className='h-16 border-b-4 border-gray-200 fixed left-0 top-0 z-[1000] w-full overflow-hidden flex items-center px-4 lg:px-16 justify-between bg-white'>
      <Sidebar />
      {/* left section */}
      <div className='flex items-center gap-4 lg:gap-20'>
        <button onClick={() => setIsSidebarOpen(true)} className='lg:hidden p-2 hover:bg-gray-100 rounded-full'>
          <Menu size={24} />
        </button>
        <div className='h-12'>
          <img className='object-contain h-full' src={wlogo} alt="" />
        </div>
        <div className='hidden lg:flex gap-3'>
          <div className='flex items-center'>
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={car} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>
              Ride
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={key} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>
              Rent
            </span>
          </div>
          <div className='flex items-center'>
            <div className='w-8 lg:w-10'><img className='object-cover w-full h-full' src={eat} alt="" /></div>
            <span className='text-xs lg:text-sm font-medium'>
              Eat
            </span>
          </div>
        </div>
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

          <button onClick={() => { navigate('/signup') }} className='flex gap-1 py-2 px-3 rounded-full items-center bg-black text-white cursor-pointer text-sm font-medium'>
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default RideMapNav
