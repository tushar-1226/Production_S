import React from 'react'
import AuntWithDaut from '../../assets/AuntWithDaut.png'

const AboutHero = () => {
  return (
    <div className='w-full h-175 flex items-center justify-center'>
        <div className='w-full h-full bg-cover bg-center bg-no-repeat relative' style={{ backgroundImage: `url(${AuntWithDaut})` }}>
            <h1 className='text-[53px] font-bold text-white absolute bottom-16 left-39 '>About us </h1>
        </div>
    </div>
  )
}

export default AboutHero
