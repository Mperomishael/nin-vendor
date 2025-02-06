import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { getPlatformFromUrl, isValidUrl } from '../lib/utils';
import { Link, MessageCircle } from 'lucide-react';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

export function UrlInput({ onUrlSubmit }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setIsValid(null);
      setPlatform(null);
      return;
    }

    const valid = isValidUrl(url);
    setIsValid(valid);

    if (valid) {
      const detectedPlatform = getPlatformFromUrl(url);
      setPlatform(detectedPlatform);
    }
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && url) {
      onUrlSubmit(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <AnimatePresence>
          {isValid !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute inset-0 rounded-lg",
                "transition-colors duration-500",
                isValid ? "ring-2 ring-green-500/50" : "ring-2 ring-red-500/50"
              )}
            />
          )}
        </AnimatePresence>
        
        <div className="relative flex items-center">
          <Link className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your media URL here..."
            className={cn(
              "w-full px-12 py-4 bg-white/10",
              "rounded-lg border border-gray-200",
              "text-gray-900 placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              "transition-all duration-300"
            )}
          />
          {platform && (
            <span className="absolute right-4 px-2 py-1 text-sm bg-gray-100 rounded">
              {platform}
            </span>
          )}
        </div>
      </form>

      {isValid === false && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          Please enter a valid URL
        </motion.p>
      )}
    </motion.div>
  );
}