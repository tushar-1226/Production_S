// AlreadyLog.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config/api';

const AlreadyLog = () => {
    const [email, setEmail] = useState('');
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [tempToken, settempToken] = useState(null);
    const [timer, setTimer] = useState(0);
    const [Otp, setOtp] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        setOtp(otpDigits.join(""));
    }, [otpDigits]);

    const handleOtpChange = (index, value) => {
        const newOtp = [...otpDigits];
        newOtp[index] = value;
        setOtpDigits(newOtp);

        if (value && index < otpDigits.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };

    const handleNext = (e) => {
        setPage((prev) => prev + 1);
        setError("")
    };

    function handleError(e) {
        return e.response?.data?.message || "Something went wrong"
    }

    const handleEmailNext = async (e) => {
        e.preventDefault()
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                `${BASE_URL}/api/auth/send-login-otp`,
                { email: email },
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
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                `${BASE_URL}/api/auth/verify-login-otp`,
                { tempToken, otp: Otp },
                { withCredentials: true }
            )
            // Assuming successful login returns necessary data or sets cookies
            navigate('/');
            console.log(res.data.message)
        }
        catch (err) {
            setError(handleError(err))
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        console.log('→ Starting Google Sign-In...');
        // Your Google OAuth trigger here
    };

    return (
        <div className="h-[calc(100vh-64px)] w-full overflow-hidden bg-white relative">
            <div
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${(page - 1) * 100}%)` }}
            >
                {/* Page 1: Email Input */}
                <div className={`w-full flex-shrink-0 flex flex-col items-center justify-center px-5 sm:px-6 transition-opacity duration-500 ${page === 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full max-w-md flex flex-col items-center pt-8 pb-16">

                        {/* Logo / Title area */}
                        <div className="mb-10">
                            <h1 className="text-5xl sm:text-6xl font-black text-black tracking-tight">
                                UBER
                            </h1>
                            <p className="text-center text-gray-500 text-sm mt-1.5 font-medium">
                                already with us?
                            </p>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-3">
                            Welcome back
                        </h2>

                        <p className="text-center text-gray-600 text-lg sm:text-xl mb-8 max-w-xs">
                            Log in to continue
                        </p>

                        {/* Email input + Next button form */}
                        <form onSubmit={handleEmailNext} className="w-full max-w-sm mb-6">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`
              w-full px-5 py-5 text-lg border border-gray-300 rounded-full
              focus:outline-none focus:border-black focus:ring-0
              placeholder-gray-500
            `}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`
              mt-4 w-full flex items-center justify-center gap-3
              bg-black text-white font-medium text-lg
              py-5 px-6 rounded-full
              hover:bg-gray-900 active:bg-gray-800
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-black/30
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
                            >
                                {loading ? 'Sending...' : 'Next'}
                                {!loading && (
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                            </button>
                        </form>

                        {/* OR divider */}
                        <div className="flex items-center w-full max-w-sm my-4">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="px-4 text-gray-500 text-sm font-medium">or</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        {/* Google button */}
                        <button
                            onClick={handleGoogleLogin}
                            className={`
            w-full max-w-sm flex items-center justify-center gap-4
            bg-white border border-gray-300
            hover:bg-gray-50 active:bg-gray-100
            text-black font-medium text-lg
            py-5 px-6 rounded-full
            shadow-sm transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-black/30
          `}
                        >
                            <FcGoogle className="text-3xl shrink-0" />
                            Continue with Google
                        </button>

                        {/* Legal text */}
                        <p className="text-center text-gray-500 text-xs mt-10 max-w-xs">
                            By continuing, you agree to our{' '}
                            <a href="#" className="underline hover:text-black">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="underline hover:text-black">
                                Privacy Policy
                            </a>.
                        </p>
                        {Error && <p className="text-red-500 text-sm mt-4">{Error}</p>}
                    </div>
                </div>

                {/* Page 2: OTP Verification */}
                <div className={`w-full flex-shrink-0 flex flex-col items-center justify-center px-5 sm:px-6 transition-opacity duration-500 ${page === 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full max-w-md flex flex-col gap-2 items-center pt-8 pb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-3">
                            Enter the 4-digit code
                        </h2>
                        <p className="text-center text-gray-600 text-lg mb-8">
                            Sent to {email}
                        </p>

                        <div className="flex gap-2 ">
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (otpInputs.current[index] = el)}
                                    className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg bg-gray-100 focus:border-black focus:outline-none"
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                />
                            ))}
                        </div>

                        {Error && <span className=" rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{Error}</span>}

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className={`
                                mb-4 w-full flex items-center justify-center gap-3
                                bg-black text-white font-medium text-lg
                                py-3 px-6 rounded-full
                                hover:bg-gray-900 active:bg-gray-800
                                transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-black/30
                                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                        >
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>

                        <button onClick={() => setPage(1)} className="text-sm underline hover:text-black cursor-pointer">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlreadyLog;