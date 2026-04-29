import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import UnitedStatesSection from '@/components/UnitedStatesSection';
import CaribbeanSection from '@/components/CaribbeanSection';
import MexicoSection from '@/components/MexicoSection';
import EuropeSection from '@/components/EuropeSection';
import CanadaSection from '@/components/CanadaSection';
import ContactSection from '@/components/ContactSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Sky Unlimited Travel - Your Dream Vacation Awaits</title>
        <meta name="description" content="Premium travel booking services for US, Canada, Europe, Caribbean, and Mexico. Experience the world with Sky Unlimited Travel." />
      </Helmet>
      
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
        <Navbar />
        
        <main>
          <HeroSection />
          <div id="destinations">
            <UnitedStatesSection />
            <CaribbeanSection />
            <MexicoSection />
            <EuropeSection />
            <CanadaSection />
          </div>
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </main>

        <footer className="bg-[#1a2947] text-white py-8 text-center border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <p className="opacity-60 text-sm">© {new Date().getFullYear()} Sky Unlimited Travel Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;