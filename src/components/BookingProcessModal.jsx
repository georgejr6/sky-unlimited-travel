import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Phone, CreditCard, ArrowRight } from 'lucide-react';
import { apiUrl } from '@/lib/api';

const steps = [
  {
    icon: CheckCircle2,
    title: 'Book with us',
    description: 'Initiate your travel request.',
    color: 'text-blue-500',
  },
  {
    icon: Calendar,
    title: 'We follow up',
    description: 'We will email or call you to schedule a consultation.',
    color: 'text-purple-500',
  },
  {
    icon: Phone,
    title: 'Consultation',
    description: 'Complete a detailed consultation over phone or video call.',
    color: 'text-green-500',
  },
  {
    icon: CreditCard,
    title: 'Payment',
    description: 'Securely finalize your booking.',
    color: 'text-orange-500',
  },
];

const STRIPE_URL = 'https://buy.stripe.com/9B63cx7II4vfev51iF3Ru01';

const BookingProcessModal = ({ children, destination }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleProceed = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(apiUrl('/api/inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, destination: destination || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
    } catch (err) {
      // Don't block the user from paying even if our DB has an issue
      console.error('Inquiry capture failed:', err.message);
    }

    window.location.href = STRIPE_URL;
  };

  return (
    <Dialog onOpenChange={() => { setStatus('idle'); setErrorMsg(''); setForm({ name: '', email: '', phone: '' }); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md md:max-w-lg bg-white p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-[#1a2947] p-6 text-white text-center">
          <DialogTitle className="text-2xl font-bold mb-2">Booking Process</DialogTitle>
          <DialogDescription className="text-blue-100">
            Your journey to a dream vacation starts here.
          </DialogDescription>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 relative"
              >
                {index !== steps.length - 1 && (
                  <div className="absolute left-6 top-10 bottom-[-24px] w-0.5 bg-gray-100"></div>
                )}
                <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 z-10 ${step.color}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-[#1a2947] text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lead capture form */}
          <form onSubmit={handleProceed} className="mt-8 space-y-3">
            <p className="text-sm font-semibold text-[#1a2947] mb-1">Your details to get started:</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name *"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a2947] transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a2947] transition-colors"
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email address *"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a2947] transition-colors"
            />

            {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full h-12 text-base bg-[#1a2947] hover:bg-[#2c426e] text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {status === 'loading' ? 'One moment...' : 'Proceed to Payment'}
              {status !== 'loading' && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
            <p className="text-xs text-center text-gray-400">Secure payment via Stripe</p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingProcessModal;
