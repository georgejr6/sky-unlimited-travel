import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ConfirmationPage = () => {
  return (
    <>
      <Helmet>
        <title>Payment Received - Sky Unlimited Travel</title>
        <meta name="description" content="Thank you for your payment. Sky Unlimited Travel will be in contact shortly." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        
        <div className="flex items-center justify-center min-h-screen px-4 pt-20">
          <motion.div 
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl w-full text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a2947] mb-4">
              Thank You!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your payment has been successfully received. We are thrilled to help you plan your next getaway!
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-10 text-left">
              <h3 className="font-bold text-[#1a2947] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                What happens next?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                A Sky Unlimited Travel consultant will review your details and contact you shortly via email or phone to schedule your personalized consultation.
              </p>
            </div>
            
            <a 
              href="/"
              className="inline-flex items-center gap-2 bg-[#1a2947] text-white font-bold px-8 py-3 rounded-full hover:bg-[#2c426e] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;