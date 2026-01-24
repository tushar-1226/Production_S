import React from 'react'
import SuggCards from './SuggCards'

const Suggestion = () => {
    return (
        <div className='pt-16 flex flex-col gap-10'>
            <div className='text-4xl font-bold' style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Suggestions
            </div>
            <div>
                <SuggCards />
            </div>
        </div>
    )
}

export default Suggestion
