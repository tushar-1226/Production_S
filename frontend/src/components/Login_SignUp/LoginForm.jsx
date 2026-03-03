import React, { useState, useRef, useEffect } from 'react';
import google from '../../assets/google.png';
import apple from '../../assets/apple.png';
import { QrCode, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';

const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [tempEmailOtp, setTempEmailOtp] = useState('');
  const [page, setPage] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tempToken, settempToken] = useState(null)
  const otpInputs = useRef([]);
  const [Error, setError] = useState("")
  const [Loading, setLoading] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [nextLoading, setnextLoading] = useState(false);
  const [Varified, setVarified] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setTempEmailOtp(otp.join(""));
    console.log(tempEmailOtp)
  }, [otp])

  const handleNext = (e) => {
    setPage((prev) => prev + 1);
    setError("")
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

  // Error Setting function 
  const handleError = (err) => {
    return err.response?.data?.message || "Something went wrong"
  }

  async function pageOneContinue(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:3003/api/auth/send-email-otp",
        { email: emailOrPhone },
        { withCredentials: true }
      )
      settempToken(res.data.tempToken)
      handleNext()
      setTimer(30)
    }
    catch (err) {
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  }

  async function resendOtp(e) {
    if (timer > 0) return;
    setResendLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3003/api/auth/send-email-otp",
        { email: emailOrPhone },
        { withCredentials: true }
      );

      settempToken(res.data.tempToken);
      setTimer(30); // restart cooldown
      setShowResend(false);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setResendLoading(false);
    }
  }

  async function pageTwoNext(e) {
    e.preventDefault()
    setnextLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:3003/api/auth/verify-email-otp",
        { tempToken, tempemailOtp: tempEmailOtp },
        { withCredentials: true }
      );
      console.log(res.data.message)
      setVarified(true)
      handleNext()
    } catch (err) {
      setError(handleError(err))
    } finally {
      setnextLoading(false)
    }

  }

  async function pageThreeNext(e){
    e.preventDefault()
    setnextLoading(true)
    try{
      const res = await axios.post(
        "http://localhost:3003/api/auth/save-name",
        {tempToken, firstName, lastName},
        { withCredentials:true}
      )
      console.log(firstName, lastName)
      console.log(res.data.message)
      handleNext()
    }
    catch(err){
      setError(handleError(err))
    }
    finally{
      setnextLoading(false)
    }
  }

  async function pageFourNext(e){
    e.preventDefault()
    setnextLoading(true)
    try{
      const res = await axios.post(
        "http://localhost:3003/api/auth/terms-condition",
        {tempToken, isTermsAccepted:termsAccepted},
        { withCredentials:true}
      )
      console.log(res.data.message)
      console.log(termsAccepted)
      handleNext()
    }
    catch(err){
      setError(handleError(err))
    }
    finally{
      setnextLoading(false)
    }
  }

  async function pageFiveNext(e){
    e.preventDefault()
    setnextLoading(true)
    try{
      const res = await axios.post(
        "http://localhost:3003/api/auth/terms-condition",
        {tempToken, isTermsAccepted:termsAccepted},
        { withCredentials:true}
      )
      console.log(res.data.message)
      console.log(termsAccepted)
      handleNext()
    }
    catch(err){
      setError(handleError(err))
    }
    finally{
      setnextLoading(false)
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

                {Error && <span className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{Error}</span>}

                <div>
                  <button
                    disabled={Loading}
                    type='submit'
                    className={`bg-black py-3 px-4 text-white rounded-[7px] w-full font-medium hover:opacity-85 cursor-pointer transition-all duration-300 ${Loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
                  >
                    {Loading ? "Sending OTP..." : " Continue"}
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
          <div className='h-100 w-82 flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl font-medium'>Enter the 4-digit code sent to you at {emailOrPhone}</div>
              <form className='flex flex-col gap-3'>
                <div className='flex justify-center gap-2'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      className='w-10 h-10 text-center text-2xl bg-[#F3F3F3] border-2 rounded-[7px] focus:border-black border-transparent focus:outline-none focus:bg-white'
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

            {Error && <span className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{Error}</span>}

            <div>
              <button onClick={() => setShowResend(true)} className='px-2 py-2 bg-[#F3F3F3] rounded-full text-sm font-medium cursor-pointer hover:bg-[#EAEAEA]'>
                Resend
              </button>
            </div>


            <div className='flex justify-between items-center w-full mt-4'>
              <button
                onClick={handleBack}
                className='h-12 w-12 rounded-full bg-[#F3F3F3] flex items-center justify-center hover:bg-[#EAEAEA] cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>
              <button onClick={pageTwoNext} disabled={nextLoading} className={`flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer ${nextLoading ? "bg-gray-400 cursor-not-allowed" : ""}`}>
                {nextLoading ? "Verifying..." : <>Next <ArrowRight size={20} /></>}
              </button>
            </div>
          </div>
        </div>

        {/* Page 3 (Name) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82 flex flex-col gap-4'>
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

            {Error && <span className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{Error}</span>}

            <div className='flex justify-between items-center w-full'>
              <button
                onClick={handleBack}
                className='h-12 w-12 rounded-full bg-[#F3F3F3] flex items-center justify-center hover:bg-[#EAEAEA] cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>
              <button type='submit' onClick={pageThreeNext} disabled={nextLoading} className={`flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer ${nextLoading ? "bg-gray-400 cursor-not-allowed" : ""}`}>
                Next <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Page 4 (Terms & Privacy) */}
        <div className='w-full flex-shrink-0 flex items-center justify-center h-full'>
          <div className='h-100 w-82'>
            <div className='flex flex-col gap-3'>
              <div className='text-2xl font-semibold'>Accept ubers terms & review privacy notice</div>
              <div className='text-[#5E5E5E]'>
                By selecting 'I Agree' below, I have reviewed and agree to the terms of use and acknowledge the privacy notice. I am at least 18 years of age.
              </div>
              <div className='h-[1px] w-full bg-gray-500'></div>
              <div className='flex items-center gap-2'>
                <input 
                checked = {termsAccepted}
                onChange={(e)=>{setTermsAccepted(e.target.checked)}}
                type='checkbox' 
                id='agree' 
                className='w-5 h-5 accent-black cursor-pointer' 
                />
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
              <button type='submit' onClick={pageFourNext} disabled={nextLoading} className={`flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-85 cursor-pointer ${nextLoading ? "bg-gray-400 cursor-not-allowed" : ""}`}>
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

      {/* Resend OTP Modal */}
      <div className={`absolute inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-500 ${showResend ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`bg-white w-[85%] max-w-[350px] p-6 rounded-xl shadow-lg flex flex-col gap-4 transition-all duration-500 ease-out transform ${showResend ? 'translate-y-0 opacity-100' : 'translate-y-[100vh] opacity-0'}`}>
          <div className='text-xl font-medium'>Resend code?</div>
          <div className='text-[#5E5E5E]'>
            Send code again to {emailOrPhone}?
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <button disabled={resendLoading} onClick={resendOtp} className={`bg-black text-white py-3 rounded-lg font-medium w-full hover:opacity-90 transition-opacity ${resendLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}>{resendLoading ? "Sending OTP..." : " Send"}</button>
            <button onClick={() => setShowResend(false)} className='bg-[#F3F3F3] text-black py-3 rounded-lg font-medium w-full hover:bg-[#EAEAEA] transition-colors'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
