import React, { useState } from 'react';
import axios from 'axios';
import { Youtube, Download, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    const encodedParams = new URLSearchParams();
    encodedParams.set('url', url);

    try {
      const response = await axios.request({
        method: 'POST',
        url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
        headers: {
          'x-rapidapi-key': '337dd3ad08msh0b7cd9496cafb68p16b557jsn2996a562586c',
          'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
      });
      setVideoInfo(response.data);
      toast.success('Video information retrieved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch video information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center mb-12">
            <Youtube className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-4xl font-bold">YouTube Downloader</h1>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here..."
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Video Information */}
          {videoInfo && (
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <div className="flex gap-6">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-48 h-auto rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{videoInfo.title}</h2>
                  <p className="text-gray-400 mb-4">{videoInfo.description?.slice(0, 150)}...</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-semibold">{videoInfo.duration}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Views</p>
                      <p className="font-semibold">{videoInfo.views?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Download Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoInfo.formats?.map((format: any, index: number) => (
                    <a
                      key={index}
                      href={format.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{format.quality}</p>
                        <p className="text-sm text-gray-400">{format.ext}</p>
                      </div>
                      <Download className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">How to use</h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Copy the YouTube video URL you want to download</li>
              <li>Paste the URL in the input field above</li>
              <li>Click the Download button to fetch video information</li>
              <li>Choose your preferred format and quality to download</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;