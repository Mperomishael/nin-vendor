import axios from 'axios';

interface MediaInfo {
  title: string;
  thumbnail: string;
  duration: string;
  quality: string;
  size?: string;
}

export async function getMediaInfo(url: string): Promise<MediaInfo> {
  const options = {
    method: 'GET',
    url: 'https://social-media-video-downloader.p.rapidapi.com/api/getSocialVideo',
    params: { url },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return {
      title: response.data.title,
      thumbnail: response.data.thumbnail,
      duration: response.data.duration,
      quality: response.data.quality,
      size: response.data.size
    };
  } catch (error) {
    console.error('Error fetching media info:', error);
    throw new Error('Failed to fetch media information');
  }
}

interface PaymentResponse {
  status: string;
  message: string;
  data?: {
    link: string;
  };
}

export async function initializePayment(email: string, amount: number): Promise<string> {
  try {
    const response = await axios.post<PaymentResponse>(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: `emp-${Date.now()}`,
        amount,
        currency: 'NGN',
        redirect_url: window.location.origin + '/thank-you',
        customer: {
          email,
        },
        customizations: {
          title: 'Support Empire Media Downloader',
          description: 'Thank you for your support!',
          logo: 'https://your-logo-url.com/logo.png'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY}`
        }
      }
    );

    if (response.data.status === 'success' && response.data.data?.link) {
      return response.data.data.link;
    }
    throw new Error('Payment initialization failed');
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error('Failed to initialize payment');
  }
}