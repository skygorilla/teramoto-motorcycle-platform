import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('audio') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.includes('audio') && !file.name.endsWith('.mp3')) {
      return NextResponse.json({ error: 'Only MP3 files are allowed' }, { status: 400 });
    }

    const audioDirectory = path.join(process.cwd(), 'public/audio');
    
    // Create directory if it doesn't exist
    try {
      await fs.access(audioDirectory);
    } catch {
      await fs.mkdir(audioDirectory, { recursive: true });
    }

    // Save file
    const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
    const filePath = path.join(audioDirectory, fileName);
    
    const bytes = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      fileName,
      url: `/audio/${fileName}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}