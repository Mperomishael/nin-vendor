import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;
    const encodedParams = new URLSearchParams();
    encodedParams.set('url', url);

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

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ error: 'Failed to fetch video details' });
  }
}