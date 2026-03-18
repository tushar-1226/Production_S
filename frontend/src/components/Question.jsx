import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';
import Line from './Line'

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I have a lost item delivered to me?",
      answer: "Yes, you can use the Uber app to arrange for a lost item to be returned to you. Go to the menu in your app, select 'Your Trips', find the trip where you lost the item, and select 'Find lost item'."
    },
    {
      question: "Can I rent a car using Uber?",
      answer: "Yes, in select cities you can use Uber Rent to rent a car directly through the Uber app. Just tap the 'Rentals' icon to browse available vehicles."
    },
    {
      question: "Can I request a ride that picks up a friends in different locations?",
      answer: "Yes, you can add up to 2 extra stops to your trip. This allows you to pick up friends along the way. Just tap the '+' icon next to the destination box when requesting your ride."
    },
    {
      question: "Can I request a taxi on Uber?",
      answer: "In certain cities, you can use the Uber app to request a local taxi. When you enter your destination, look for the 'Taxi' option among the available rides."
    },
    {
      question: "Is there an Uber ride option for 5 peoples?",
      answer: "Yes, UberXL provides rides for up to 6 people. It's a great option for larger groups or if you have extra luggage."
    }
  ];

  return (
    <div className='pb-16 w-full h-auto flex flex-col gap-13 px-5 lg:px-40'>
      <div className='text-4xl font-bold text-[#333333]'>
        Frequently asked questions
      </div>
      <div className='flex flex-col h-full'>
        {faqs.map((faq, index) => (
          <div key={index} className='w-full flex flex-col'>
            <button 
              onClick={() => toggleQuestion(index)}
              className='w-full flex justify-between items-center hover:cursor-pointer py-4'
            >
              <span className='font-semibold text-base text-left pr-4'>{faq.question}</span> 
              <span className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <ChevronDown strokeWidth={4} size={18} />
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}
            >
              <p className='text-gray-600 text-sm pr-10'>
                {faq.answer}
              </p>
            </div>
            <Line/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question
