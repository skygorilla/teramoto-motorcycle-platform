import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const audioDirectory = path.join(process.cwd(), 'public/audio');
  
  try {
    const files = await fs.readdir(audioDirectory);
    const mp3s = files
      .filter(file => file.endsWith('.mp3'))
      .map(file => `/audio/${file}`);
    
    return NextResponse.json(mp3s);
  } catch (error) {
    // If the directory doesn't exist, return an empty playlist
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log("Audio directory not found. Returning empty playlist.");
      return NextResponse.json([]);
    }
    console.error("Failed to read playlist directory:", error);
    return NextResponse.json({ error: 'Failed to load playlist' }, { status: 500 });
  }
}
