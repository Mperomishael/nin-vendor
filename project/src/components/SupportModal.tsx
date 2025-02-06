import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useFlutterwave, closePaymentModal } from '@flutterwave/flutterwave-react-v3';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY as string,
    tx_ref: Date.now().toString(),
    amount: parseFloat(amount) || 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
    },
    customizations: {
      title: "Support Empire Media Downloader",
      description: "Thank you for supporting our project!",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop&auto=format",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !amount) {
      setError('Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 500) {
      setError('Amount must be at least 500 NGN');
      return;
    }

    try {
      setIsProcessing(true);
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          closePaymentModal();
          window.location.href = `/thank-you?service=Empire Media Downloader`;
        },
        onClose: () => {
          setIsProcessing(false);
        },
      });
    } catch (error) {
      setError('Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md relative border border-gray-800"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-white">Support Our Project</h2>
                <p className="text-gray-300 mt-1">Your support helps us maintain and improve the service</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-200">
                    Amount (NGN)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="500"
                    step="100"
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Minimum 500 NGN"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Support Now'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}