import React, { useState, useRef } from 'react';
import google from '../../assets/google.png';
import apple from '../../assets/apple.png';
import { QrCode, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';


git add . && git commit -m "updated" && git push



const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [page, setPage] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tempToken, settempToken] = useState(null)
  const otpInputs = useRef([]);

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setPage((prev) => prev + 1);
  };

  const handleBack = () => {
    setPage((prev) => prev - 1);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  async function pageOneContinue(e) {
    console.log(emailOrPhone)
    e.preventDefault()
    if (!emailOrPhone) alert("Email is required");
    try {

      const res = await axios.post(
        "http://localhost:3003/api/auth/send-email-otp",
        { email:emailOrPhone },
        { withCredentials: true }
      )
      settempToken(res.data.tempToken)
      console.log(res.data.tempToken)
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='relative h-[calc(100vh_-_64px)] w-full overflow-hidden'>
      <div
        className='flex transition-transform duration-500 ease-in-out h-full'
        style={{ transform: `translateX(-${(page - 1) * 100}%)`, width: '100%' }}
      >
        {/* Page 1 (Sending OTP) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl'>What's your phone number or email?</div>
              <form onSubmit={pageOneContinue} className='flex flex-col gap-3'>
                <div className='w-full box-border'>
                  <input
                    value={emailOrPhone}
                    className='w-full bg-[#F3F3F3] border-2 rounded-[7px] px-4 py-3 focus:border-black border-transparent focus:outline-none box-border'
                    type='text'
                    placeholder='Enter email'
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type='submit'
                    className='bg-black py-3 px-4 text-white rounded-[7px] w-full font-medium hover:opacity-85 cursor-pointer transition-all duration-300'
                  >
                    Continue
                  </button>
                </div>
              </form>
              <div className='flex gap-1 items-center'>
                <div className='h-[1px] w-full bg-gray-500'></div>
                <div>or</div>
                <div className='h-[1px] w-full bg-gray-500'></div>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <button className='bg-[#F3F3F3] w-full py-3 flex items-center rounded-[7px] gap-2 justify-center hover:bg-[#EAEAEA] transition-all duration-300 cursor-pointer'>
                  <div className='w-5'>
                    <img className='object-cover h-full w-full' src={google} alt='' />
                  </div>
                  <span className='text-base font-medium'>Continue with google</span>
                </button>
                <button className='bg-[#F3F3F3] hover:bg-[#EAEAEA] w-full py-3 flex items-center rounded-[7px] gap-2 justify-center transition-all duration-300 cursor-pointer'>
                  <div className='w-5'>
                    <img className='object-cover h-full w-full' src={apple} alt='' />
                  </div>
                  <span className='text-base font-medium'>Continue with apple</span>
                </button>
              </div>
              <div className='flex gap-1 items-center'>
                <div className='h-[1px] w-full bg-gray-500'></div>
                <div>or</div>
                <div className='h-[1px] w-full bg-gray-500'></div>
              </div>
              <div>
                <button className='bg-[#F3F3F3] w-full py-3 flex items-center rounded-[7px] gap-2 justify-center hover:bg-[#EAEAEA] transition-all duration-300 cursor-pointer'>
                  <QrCode />
                  <span className='text-base font-medium'>Log in with QR code</span>
                </button>
              </div>
              <div className='text-xs w-full text-[#5E5E5E]'>
                By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 (Verifying the OTP) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl'>Enter the 4-digit code sent to you at {emailOrPhone}</div>
              <form className='flex flex-col gap-3'>
                <div className='flex justify-center gap-2'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      className='w-14 h-14 text-center text-2xl bg-[#F3F3F3] border-2 rounded-[7px] focus:border-black border-transparent focus:outline-none'
                      type='text'
                      maxLength='1'
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>
              </form>
            </div>
            <div className='flex justify-between items-center w-full mt-4'>
              <button
                onClick={handleBack}
                className='h-12 w-12 rounded-full bg-[#F3F3F3] flex items-center justify-center hover:bg-[#EAEAEA] cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>
              <button onClick={handleNext} className='flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer'>
                Next <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Page 3 (Name) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl'>What's your name?</div>
              <p className='text-[#5E5E5E]'>Let us know how to properly address you</p>
              <form className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                  <input
                    value={firstName}
                    className='w-full bg-[#F3F3F3] border-2 rounded-[7px] px-4 py-3 focus:border-black border-transparent focus:outline-none box-border'
                    type='text'
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    value={lastName}
                    className='w-full bg-[#F3F3F3] border-2 rounded-[7px] px-4 py-3 focus:border-black border-transparent focus:outline-none box-border'
                    type='text'
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className='flex justify-between items-center w-full mt-4'>
              <button
                onClick={handleBack}
                className='h-12 w-12 rounded-full bg-[#F3F3F3] flex items-center justify-center hover:bg-[#EAEAEA] cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>
              <button onClick={handleNext} className='flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer'>
                Next <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Page 4 (Terms & Privacy) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl'>Accept ubers terms & review privacy notice</div>
              <div className='text-[#5E5E5E]'>
                By selecting 'I Agree' below, I have reviewed and agree to the terms of use and acknowledge the privacy notice. I am at least 18 years of age.
              </div>
              <div className='h-[1px] w-full bg-gray-500'></div>
              <div className='flex items-center gap-2'>
                <input type='checkbox' id='agree' className='w-5 h-5 accent-black cursor-pointer' />
                <label htmlFor='agree' className='text-base font-medium cursor-pointer'>I Agree</label>
              </div>
            </div>
            <div className='flex justify-between items-center w-full mt-4'>
              <button
                onClick={handleBack}
                className='h-12 w-12 rounded-full bg-[#F3F3F3] flex items-center justify-center hover:bg-[#EAEAEA] cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>
              <button onClick={handleNext} className='flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer'>
                Next <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Page 5 (Password) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl'>Choose a password</div>
              <form className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3'>
                  <input
                    value={password}
                    className='w-full bg-[#F3F3F3] border-2 rounded-[7px] px-4 py-3 focus:border-black border-transparent focus:outline-none box-border'
                    type='password'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    value={confirmPassword}
                    className='w-full bg-[#F3F3F3] border-2 rounded-[7px] px-4 py-3 focus:border-black border-transparent focus:outline-none box-border'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className='flex justify-between items-center w-full mt-4'>
              <button
                onClick={handleBack}
                className='h-12 w-12 rounded-full bg-[#F3F3F3] flex items-center justify-center hover:bg-[#EAEAEA] cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>
              <button className='flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer'>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
