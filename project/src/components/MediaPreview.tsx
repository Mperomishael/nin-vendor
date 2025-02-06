import React from 'react';
import { motion } from 'framer-motion';
import { Download, Clock, Video } from 'lucide-react';
import { cn } from '../lib/utils';

interface MediaPreviewProps {
  title: string;
  thumbnail: string;
  duration: string;
  quality: string;
  size?: string;
  onDownload: () => void;
  isLoading?: boolean;
}

export function MediaPreview({
  title,
  thumbnail,
  duration,
  quality,
  size,
  onDownload,
  isLoading = false
}: MediaPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/90 backdrop-blur-md rounded-lg p-6 mt-6 border border-gray-800 shadow-xl"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-72 h-48 rounded-lg overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md text-xs flex items-center">
            <Clock size={12} className="mr-1" />
            {duration}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-300">
              <Video size={16} className="mr-2" />
              Quality: <span className="ml-1 text-blue-400">{quality}</span>
            </div>
            {size && (
              <div className="text-sm text-gray-300">
                Size: <span className="text-blue-400">{size}</span>
              </div>
            )}
          </div>

          <button
            onClick={onDownload}
            disabled={isLoading}
            className={cn(
              "mt-6 inline-flex items-center px-6 py-3 rounded-lg",
              "bg-blue-600 hover:bg-blue-700 text-white transition-colors",
              "shadow-lg shadow-blue-600/20",
              "transform hover:scale-105 transition-transform duration-200",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <Download size={20} className="mr-2" />
            {isLoading ? 'Processing...' : 'Download Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}