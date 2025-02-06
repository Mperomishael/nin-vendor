import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// API endpoint to fetch video details
app.post('/api/video-details', async (req, res) => {
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

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ error: 'Failed to fetch video details' });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});