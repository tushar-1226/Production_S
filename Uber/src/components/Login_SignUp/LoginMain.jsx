import React from 'react'
import LoginNav from './LoginNav'
import LoginForm from './LoginForm'

const LoginMain = () => {
  return (
    <div className='h-screen w-full overflow-hidden'>
      <LoginNav/>
      <LoginForm/>
    </div>
  )
}

export default LoginMain
