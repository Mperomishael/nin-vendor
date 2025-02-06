import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getPlatformFromUrl(url: string): string | null {
  if (!isValidUrl(url)) return null;
  
  const platforms = {
    youtube: ['youtube.com', 'youtu.be'],
    facebook: ['facebook.com', 'fb.com'],
    instagram: ['instagram.com'],
    tiktok: ['tiktok.com'],
    spotify: ['spotify.com'],
    netflix: ['netflix.com']
  };

  const hostname = new URL(url).hostname.toLowerCase();
  
  for (const [platform, domains] of Object.entries(platforms)) {
    if (domains.some(domain => hostname.includes(domain))) {
      return platform;
    }
  }
  
  return null;
}