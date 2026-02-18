import React from 'react'
import google from '../../assets/google.png'
import apple from '../../assets/apple.png'
import { QrCode } from 'lucide-react';

const LoginForm = () => {
  console.log("hello")

  
  return (
    <div className='h-[calc(100vh_-_64px)] w-full flex items-center justify-center '>
      <div className='h-100 w-82'>
        <div className='flex flex-col gap-3'>
          <div className='text-2xl'>
            What's your phone number or email?
          </div>
          <div className='w-full box-border'>
            <input className='w-full bg-[#F3F3F3] border-2 rounded-[7px] px-4 py-3 focus:border-black border-transparent focus:outline-none box-border' type="text" placeholder='Enter phone number or email' />
          </div>
          <div>
            <button className='bg-black py-3 px-4 text-white rounded-[7px] w-full font-medium hover:opacity-85 cursor-pointer transition-all duration-300'>
              Continue
            </button>
          </div>
          <div className='flex gap-1 items-center'>
            <div className='h-[1px] w-full bg-gray-500'></div>
            <div className=''>or</div>
            <div className='h-[1px] w-full bg-gray-500'></div>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <button className='bg-[#F3F3F3] w-full py-3 flex items-center rounded-[7px] gap-2 justify-center hover:bg-[#EAEAEA] transition-all duration-300 cursor-pointer'>
              <div className='w-5'>
                <img className='object-cover h-full w-full' src={google} alt="" />
              </div>
              <span className='text-base font-medium'>Continue with google</span>
            </button>
            <button className='bg-[#F3F3F3] hover:bg-[#EAEAEA] w-full py-3 flex items-center rounded-[7px] gap-2 justify-center transition-all duration-300 cursor-pointer'>
              <div className='w-5'>
                <img className='object-cover h-full w-full' src={apple} alt="" />
              </div>
              <span className='text-base font-medium'>Continue with apple</span>
            </button>
          </div>
          <div className='flex gap-1 items-center'>
            <div className='h-[1px] w-full bg-gray-500'></div>
            <div className=''>or</div>
            <div className='h-[1px] w-full bg-gray-500'></div>
          </div>
          <div>
            <button className='bg-[#F3F3F3] w-full py-3 flex items-center rounded-[7px] gap-2 justify-center hover:bg-[#EAEAEA] transition-all duration-300 cursor-pointer'>
              <QrCode/>
              <span className='text-base font-medium'>Log in with QR code</span>
            </button>
          </div>
          <div className='text-xs w-full text-[#5E5E5E]'>
            By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
