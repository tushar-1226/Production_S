import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';
import Line from '../Line'

const AirportQuestion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How much will my airport ride cost?",
      answer: "The cost of an Uber airport ride depends on factors like the type of ride you request, the estimated length and duration of the trip, tolls, and current demand for rides. You can see an estimate of the price before you request by entering your pickup spot and destination in the app. Then, when you request a ride, you'll see your actual price based on real-time factors."
    },
    {
      question: "What vehicles are available for airport trips?",
      answer: "We offer a variety of options to fit your needs, from budget-friendly choices like UberX to premium rides like Uber Black. The exact vehicle options vary depending on the specific airport."
    },
    {
      question: "Will all of my luggage fit in the car?",
      answer: "Luggage capacity varies by Uber ride type. For example, an UberX ride can typically hold 2 suitcases while an UberXL ride can usually hold 3-4 suitcases. If you have a lot of luggage, consider requesting an UberXL."
    },
    {
      question: "Can I reserve a ride with Uber to and from the airport?",
      answer: "Yes, you can schedule a ride to or from the airport up to 90 days in advance. To schedule an airport ride, simply tap the Reserve icon in the app."
    },
    {
      question: "At what point after I've landed should I request a ride?",
      answer: "It's best to request your ride after you have retrieved your luggage from baggage claim and are ready to head outside."
    },
    {
      question: "How long will my driver wait for me at the airport?",
      answer: "Grace periods vary by airport and ride option. Generally, drivers will wait for a few minutes. If you need more time, you can message or call your driver through the app."
    }
  ];

  return (
    <div className='pb-16 w-full h-auto flex flex-col gap-13'>
      <div className='text-4xl font-bold text-[#333333]'>
        Top questions about airport rides
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

export default AirportQuestion
