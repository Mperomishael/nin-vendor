import React, { useState } from 'react';
import { MessageCircle, X, Send, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string; type: 'user' | 'bot'}>>([
    {
      type: 'bot',
      text: 'Hi! Would you like to:'
    }
  ]);

  const handleOptionClick = (option: 'learn' | 'create') => {
    const message = option === 'learn' 
      ? 'Hi, I want to learn web development!'
      : 'Hi, I want to create my own website!';
    
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    const whatsappUrl = `https://wa.me/2347086757575?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setMessage('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages(prev => [...prev, { type: 'user', text: `Uploaded: ${file.name}` }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 mb-2 bg-gray-900 rounded-lg shadow-xl w-80 border border-gray-800"
          >
            <div className="h-96 flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <button
                    onClick={() => handleOptionClick('learn')}
                    className="w-full text-left px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    Learn Web Development
                  </button>
                  <button
                    onClick={() => handleOptionClick('create')}
                    className="w-full text-left px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    Create Your Own Website
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer text-gray-400 hover:text-gray-200">
                    <Upload size={20} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}