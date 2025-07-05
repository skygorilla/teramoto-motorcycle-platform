import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { fileName } = await request.json();
    
    if (!fileName) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    const audioDirectory = path.join(process.cwd(), 'public/audio');
    const filePath = path.join(audioDirectory, fileName);
    
    // Check if file exists and delete it
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      
      return NextResponse.json({ 
        message: 'File deleted successfully',
        fileName
      });
    } catch (error) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}