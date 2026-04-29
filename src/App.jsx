import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ConfirmationPage from '@/pages/ConfirmationPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;