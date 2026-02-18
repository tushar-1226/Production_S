import React from 'react'
import logo from '../../assets/logo.svg'

const LoginNav = () => {
    return (
        <div className="lg:px-14 md:px-6 w-full h-16 bg-black px-5 flex items-center">
            <a href="">
                <div className=" lg:w-19 h-14 w-14 flex items-center overflow-hidden">
                    <img className="object-cover w-full h-full" src={logo} alt="logo" />
                </div>
            </a>
        </div>
    )
}

export default LoginNav
