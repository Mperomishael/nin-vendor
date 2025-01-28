import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

function App() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(true);
    window.location.href = 'https://fb.com/empiredigits';
  };

  return (
    <div className="min-h-screen bg-[#004d2b] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(https://i.ibb.co/zb6gbhC/n-jmk-k.jpg)',
          opacity: '0.2'
        }}
      />

      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/20 animate-ripple"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="absolute top-8 left-8">
          <CreditCard className="w-10 h-10 text-white" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Age Verification
            </h1>
            
            <div className="flex items-center justify-center space-x-3 cursor-pointer group"
                 onClick={handleCheckboxChange}>
              <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 ${isChecked ? 'bg-white' : 'group-hover:bg-white/20'}`}>
                {isChecked && <CheckCircle className="w-4 h-4 text-[#004d2b]" />}
              </div>
              <span className="text-white text-lg">
                Tap to continue if you're 18+
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;