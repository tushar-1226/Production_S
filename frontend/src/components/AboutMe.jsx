import React from 'react'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Lock, ArrowLeft, Shield, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutMe = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleReload = () => {
        window.location.reload()
    }

    const handleLogout = () => {
        logout();
        navigate('/');
        handleReload();
    }

    if (!user) {
        return (
            <div className="w-full h-screen flex items-center justify-center pt-16">
                <div className="text-xl font-semibold">Please log in to view your profile.</div>
            </div>
        )
    }

    return (
        <div className="w-full pt-24 px-5 lg:px-40 pb-20 bg-[#F6F6F6] min-h-screen">
            <Link to="/" className="fixed top-6 left-6 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors z-50">
                <ArrowLeft size={24} className="text-black" />
            </Link>
            <div className="max-w-3xl mx-auto flex flex-col gap-6">

                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-[#333333]">Account Info</h1>
                    <p className="text-gray-600 mt-2">Manage your profile details and security.</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 flex flex-col gap-8">

                    {/* Avatar & Name */}
                    <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
                        <div className="h-20 w-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-medium">
                            {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                            <span className="text-gray-500">User Profile</span>
                        </div>
                    </div>

                    {/* Basic Info Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">First Name</label>
                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <User size={18} className="text-gray-400" />
                                <span className="font-medium text-gray-800">{user.firstName}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">Last Name</label>
                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <User size={18} className="text-gray-400" />
                                <span className="font-medium text-gray-800">{user.lastName}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-600">Email Address</label>
                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <Mail size={18} className="text-gray-400" />
                                <span className="font-medium text-gray-800">{user.email}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-600">Role</label>
                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                <Shield size={18} className="text-gray-400" />
                                <span className="font-medium text-gray-800 capitalize">{user.roles?.join(', ') || 'User'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security / Password Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Lock className="text-black" size={24} />
                        <h3 className="text-xl font-bold">Security</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">Current Password</label>
                            <input type="password" placeholder="Enter current password" className="bg-white px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">New Password</label>
                                <input type="password" placeholder="Enter new password" className="bg-white px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Confirm New Password</label>
                                <input type="password" placeholder="Confirm new password" className="bg-white px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer w-fit">
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-[#F3F3F3] text-black font-medium py-4 rounded-xl hover:bg-[#EAEAEA] transition-colors w-full cursor-pointer border border-gray-200"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default AboutMe
// push-1
// console.log('hello') - push 1
// push-2
// console.log('hello') - push 2
// push-3
// console.log('hello') - push 3
// push-4
// console.log('hello') - push 4
// push-5
// console.log('hello') - push 5
// push-6
// console.log('hello') - push 6
// push-7
// console.log('hello') - push 7
// push-8
// console.log('hello') - push 8
// push-9
// console.log('hello') - push 9
// push-10
// console.log('hello') - push 10
// push-11
// console.log('hello') - push 11
