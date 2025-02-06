import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UrlInput } from './components/UrlInput';
import { ChatButton } from './components/ChatButton';
import { MediaPreview } from './components/MediaPreview';
import { SupportModal } from './components/SupportModal';
import { Download } from 'lucide-react';
import { getMediaInfo } from './lib/api';

interface MediaInfo {
  title: string;
  thumbnail: string;
  duration: string;
  quality: string;
  size?: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleUrlSubmit = async (submittedUrl: string) => {
    setUrl(submittedUrl);
    setIsLoading(true);
    try {
      const info = await getMediaInfo(submittedUrl);
      setMediaInfo(info);
    } catch (error) {
      console.error('Error:', error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!url) return;
    
    try {
      setIsLoading(true);
      // TODO: Implement download logic with RapidAPI
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const blob = await response.blob();
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = mediaInfo?.title || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6bTEyIDEyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptLTI0IDBjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgc3Ryb2tlPSIjOTc5Nzk3IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] bg-repeat" />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              EMPIRE MEDIA DOWNLOADER
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Download TikTok, Instagram, Facebook, YouTube Videos for Free... More Platforms Coming Soon.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <UrlInput onUrlSubmit={handleUrlSubmit} />

            {mediaInfo && (
              <MediaPreview
                {...mediaInfo}
                onDownload={handleDownload}
                isLoading={isLoading}
              />
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Download className="mr-2" size={20} />
                Support Developer
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 w-full py-4 text-center text-gray-300">
        <p>
          Developed with ❤️ by{' '}
          <a
            href="https://www.fb.com/empiredigits"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Empire Digitals
          </a>
        </p>
      </footer>

      <ChatButton />
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
}

export default App;