import React from 'react'
import SuggCards from './SuggCards'

const Suggestion = () => {
    return (
        <div className='pt-16 flex flex-col w-full gap-10'>
            <div className='text-4xl font-bold w-full' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Suggestions
            </div>
            <div className='flex items-center'>
                <SuggCards />
            </div>
        </div>
    )
}

export default Suggestion
