"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Music, Volume2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface AudioFile {
  name: string;
  url: string;
}

export function AudioManager() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const isAdmin = user?.email === adminEmail;

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    try {
      const response = await fetch('/api/playlist');
      if (response.ok) {
        const urls: string[] = await response.json();
        const files = urls.map(url => ({
          name: url.split('/').pop()?.replace(/%20/g, ' ') || 'Unknown',
          url
        }));
        setAudioFiles(files);
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isAdmin) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only admins can upload audio files.",
      });
      return;
    }

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'audio/mpeg' || file.name.endsWith('.mp3')
    );

    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Files",
        description: "Please drop only MP3 files.",
      });
      return;
    }

    await uploadFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('audio', file);

      try {
        const response = await fetch('/api/playlist/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        
        toast({
          title: "File Uploaded",
          description: `${file.name} added to playlist.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: `Failed to upload ${file.name}.`,
        });
      }
    }

    setUploading(false);
    fetchPlaylist();
  };

  const deleteFile = async (fileName: string) => {
    try {
      const response = await fetch('/api/playlist/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) throw new Error('Delete failed');
      
      toast({
        title: "File Deleted",
        description: `${fileName} removed from playlist.`,
      });
      
      fetchPlaylist();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Failed to delete file.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Audio Playlist Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdmin && (
          <>
            {/* Drag & Drop Zone */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
                isDragOver 
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse" 
                  : "border-border hover:border-primary/50",
                "relative overflow-hidden"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragOver && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 animate-pulse" />
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".mp3,audio/mpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="relative z-10">
                <Upload className={cn("h-12 w-12 mx-auto mb-4", isDragOver ? "text-primary animate-bounce" : "text-muted-foreground")} />
                <p className={cn("text-lg font-medium mb-2", isDragOver ? "text-primary" : "text-foreground")}>
                  {isDragOver ? "Drop MP3 files here!" : "Drag & Drop MP3 Files"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Files will be added to the public playlist automatically
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className={cn(isDragOver && "border-primary text-primary")}
                >
                  {uploading ? "Uploading..." : "Or Click to Select"}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Playlist */}
        <div className="space-y-2">
          <h3 className="font-semibold">Current Playlist ({audioFiles.length})</h3>
          
          {audioFiles.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {audioFiles.map((file, index) => (
                <div key={file.url} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Music className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFile(file.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Music className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No audio files in playlist</p>
              {isAdmin && <p className="text-sm">Drag & drop MP3 files to add them</p>}
            </div>
          )}
        </div>

        {!isAdmin && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">Only administrators can manage the playlist</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
