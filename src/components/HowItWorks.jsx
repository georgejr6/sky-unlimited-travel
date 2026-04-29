import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Map, ThumbsUp } from 'lucide-react';
import BookingProcessModal from '@/components/BookingProcessModal';

const HowItWorks = () => {
  const steps = [
    {
      icon: Plane,
      title: 'Explore Destinations',
      description: 'Browse our curated travel destinations, designed for American and Canadian travelers. Each option comes with detailed info, photos, and exclusive deals from Sky Unlimited Travel Inc.'
    },
    {
      icon: Map,
      title: 'Customize Your Trip',
      description: 'Pick your destination and tailor your travel package by selecting flights, accommodations, and activities. Our platform and expert consultants make personalizing your trip easy.'
    },
    {
      icon: ThumbsUp,
      title: 'Travel With Confidence',
      description: 'Book securely online with transparent pricing. Once confirmed, you\'ll receive all travel documents and tips to ensure a seamless journey from start to finish.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-[#1a2947] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#1a2947] rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1a2947] mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <BookingProcessModal>
            <button
              className="inline-block bg-white text-black font-semibold px-8 py-3 rounded border-2 border-black hover:bg-gray-100 transition-all duration-300"
            >
              Book Now
            </button>
          </BookingProcessModal>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;