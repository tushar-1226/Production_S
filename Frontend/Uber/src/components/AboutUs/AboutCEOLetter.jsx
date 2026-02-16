import React from 'react'
import UberCEO from '../../assets/UberCEO.png'

const AboutCEOLetter = () => {
    return (
        <div className='w-full h-150 flex items-center justify-center'>
            <div className='w-full h-full bg-cover bg-center bg-no-repeat pl-40' style={{ backgroundImage: `url(${UberCEO})` }}>
                <div className='flex flex-col h-full  justify-center gap-8 w-110'>
                    <h1 className='text-[55px] font-bold text-white flex flex-col leading-15'>
                            A letter from our CEO
                    </h1>

                    <div className='text-white'>
                        Read about our team’s commitment to provide everyone on our global platform with the technology that can help them move ahead.
                    </div>

                    <div>
                        <button className='bg-black py-3 px-6 rounded-[7px] text-white font-medium'>
                            Read Dara's Letter
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AboutCEOLetter
