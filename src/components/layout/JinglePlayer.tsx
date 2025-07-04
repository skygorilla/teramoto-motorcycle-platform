
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import jsmediatags, { type TagType } from 'jsmediatags';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Trash2,
  ListMusic,
  UploadCloud,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TrackMetadata {
  title: string;
  artist: string;
  albumArt: string;
}

interface Track {
  id: string;
  url: string;
  name: string;
  metadata: TrackMetadata;
}

const defaultMetadata: TrackMetadata = {
  title: "TERAMOTO Radio",
  artist: "Drag & drop jingles to play",
  albumArt: "https://placehold.co/64x64.png"
};

const PLAYLIST_LIMIT = 100;

export function JinglePlayer() {
  const { toast } = useToast();
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [metadata, setMetadata] = useState<TrackMetadata>(defaultMetadata);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effect to handle play/pause state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying && currentTrackIndex !== null) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Effect to handle track changes
  useEffect(() => {
    if (currentTrackIndex === null || playlist.length === 0) {
      setIsPlaying(false);
      setMetadata(defaultMetadata);
      if (audioRef.current) audioRef.current.src = "";
      return;
    }

    const track = playlist[currentTrackIndex];
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    }
    setMetadata(track.metadata);
  }, [currentTrackIndex, playlist]);


  const handleFiles = useCallback(async (files: FileList) => {
    let audioFiles = Array.from(files).filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length === 0) return;

    if (playlist.length >= PLAYLIST_LIMIT) {
      toast({ variant: "destructive", title: "Playlist full", description: "You cannot add more than 100 jingles." });
      return;
    }

    if (playlist.length + audioFiles.length > PLAYLIST_LIMIT) {
      const slotsAvailable = PLAYLIST_LIMIT - playlist.length;
      toast({
          variant: "destructive",
          title: "Playlist Limit Reached",
          description: `Only adding the first ${slotsAvailable} jingles. The limit is ${PLAYLIST_LIMIT}.`,
      });
      audioFiles = audioFiles.slice(0, slotsAvailable);
    }
    
    if (audioFiles.length === 0) return;

    toast({ title: `Processing ${audioFiles.length} file(s)...` });

    const newTracks: Track[] = [];
    for (const file of audioFiles) {
        const url = URL.createObjectURL(file);
        const metadata: TrackMetadata = await new Promise((resolve) => {
            jsmediatags.read(file, {
                onSuccess: (tag: TagType) => {
                    const { title, artist, picture } = tag.tags;
                    let albumArt = defaultMetadata.albumArt;
                    if (picture) {
                        const base64String = btoa(String.fromCharCode.apply(null, picture.data as any));
                        albumArt = `data:${picture.format};base64,${base64String}`;
                    }
                    resolve({
                        title: title || file.name.replace(/\.[^/.]+$/, "") || 'Unknown Title',
                        artist: artist || 'Unknown Artist',
                        albumArt,
                    });
                },
                onError: (error) => {
                    console.log('Could not read metadata for', file.name, error);
                    resolve({
                        title: file.name.replace(/\.[^/.]+$/, "") || 'Unknown Title',
                        artist: 'Unknown Artist',
                        albumArt: defaultMetadata.albumArt,
                    });
                }
            });
        });
        
        newTracks.push({
            id: `${file.name}-${file.lastModified}`,
            url,
            name: file.name,
            metadata,
        });
    }

    setPlaylist(prev => {
        const updatedPlaylist = [...prev, ...newTracks];
        if (prev.length === 0 && updatedPlaylist.length > 0) {
            setCurrentTrackIndex(0);
            setIsPlaying(true);
        }
        return updatedPlaylist;
    });

    toast({ title: "Jingles added to playlist!" });
  }, [playlist, toast]);

  const handlePlayPause = () => {
    if (currentTrackIndex === null && playlist.length > 0) {
      setCurrentTrackIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = useCallback(() => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    let nextIndex;
    if (isShuffle) {
        nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
        nextIndex = (currentTrackIndex + 1) % playlist.length;
    }
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  }, [playlist.length, currentTrackIndex, isShuffle]);

  const playPrevTrack = () => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
     let prevIndex;
     if (isShuffle) {
        prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
        prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    }
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };
  
  const deleteTrack = (trackId: string) => {
    const trackIndexToDelete = playlist.findIndex(t => t.id === trackId);
    if(trackIndexToDelete === -1) return;

    URL.revokeObjectURL(playlist[trackIndexToDelete].url);

    const newPlaylist = playlist.filter(t => t.id !== trackId);
    setPlaylist(newPlaylist);

    if (currentTrackIndex === null) return;

    if (trackIndexToDelete === currentTrackIndex) {
        if (newPlaylist.length === 0) {
            setCurrentTrackIndex(null);
        } else {
            setCurrentTrackIndex(trackIndexToDelete % newPlaylist.length);
        }
    } else if (trackIndexToDelete < currentTrackIndex) {
        setCurrentTrackIndex(prev => prev! - 1);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
        audioRef.current.currentTime = value[0];
        setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  }

  const handleTrackEnd = () => {
    if(isRepeat && audioRef.current){
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    } else {
        playNextTrack();
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 h-20 bg-card/95 backdrop-blur-sm border-t border-border/40 p-2 text-card-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.5)] transition-colors",
        isDragging && "bg-primary/20"
      )}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept="audio/*" multiple className="hidden" />
      {isDragging && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-primary text-primary">
              <UploadCloud className="h-8 w-8" />
              <p className="font-semibold">Drop your jingles here</p>
          </div>
      )}
        <audio 
            ref={audioRef} 
            preload="metadata" 
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            onEnded={handleTrackEnd}
            onVolumeChange={() => {
              if (audioRef.current) setVolume(audioRef.current.volume);
            }}
        />
        <div className="container mx-auto flex h-full items-center justify-between gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-3 w-[25%] min-w-0">
                <Image 
                    src={metadata.albumArt} 
                    alt={metadata.title}
                    width={48} 
                    height={48} 
                    className="rounded-md h-12 w-12 object-cover"
                    data-ai-hint="radio microphone"
                />
                <div className="min-w-0">
                    <h4 className="font-bold truncate text-sm">{metadata.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{metadata.artist}</p>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center gap-1 flex-grow">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground hidden sm:inline-flex", isShuffle && "text-primary")} onClick={() => setIsShuffle(!isShuffle)}>
                        <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={playPrevTrack} disabled={playlist.length < 2}>
                        <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={handlePlayPause} disabled={playlist.length === 0}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={playNextTrack} disabled={playlist.length < 2}>
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground hidden sm:inline-flex", isRepeat && "text-primary")} onClick={() => setIsRepeat(!isRepeat)}>
                        <Repeat className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2 w-full max-w-xl">
                    <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(currentTime)}</span>
                    <Slider
                        value={[currentTime]}
                        max={duration || 1}
                        step={0.1}
                        onValueChange={handleSliderChange}
                        className="w-full"
                        disabled={!playlist.length}
                    />
                    <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume and Other Controls */}
            <div className="flex items-center justify-end gap-2 w-[25%]">
                 <Volume2 className="h-5 w-5 text-muted-foreground" />
                 <Slider value={[volume]} max={1} step={0.05} className="w-24 hidden md:flex" onValueChange={handleVolumeChange}/>
                 <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <ListMusic className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Playlist ({playlist.length}/{PLAYLIST_LIMIT})</SheetTitle>
                      </SheetHeader>
                      <div className='py-4'>
                        <Button className="w-full" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={playlist.length >= PLAYLIST_LIMIT}>
                          <UploadCloud className='mr-2 h-4 w-4'/> Add Jingles
                        </Button>
                      </div>
                      <ScrollArea className="h-[calc(100vh-150px)]">
                        {playlist.length > 0 ? (
                           <div className="flex flex-col gap-2 pr-4">
                            {playlist.map((track, index) => (
                              <div key={track.id} className={cn(
                                "flex items-center gap-3 p-2 rounded-md transition-colors",
                                currentTrackIndex === index ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                              )}>
                                <Image src={track.metadata.albumArt} alt={track.metadata.title} width={40} height={40} className="rounded-md" />
                                <div className='flex-grow min-w-0'>
                                  <p className='font-semibold truncate'>{track.metadata.title}</p>
                                  <p className='text-sm text-muted-foreground truncate'>{track.metadata.artist}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => deleteTrack(track.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                           </div>
                        ) : (
                          <div className='text-center text-muted-foreground pt-10 space-y-2'>
                            <ListMusic className="h-10 w-10 mx-auto opacity-50" />
                            <p className='font-semibold'>Your playlist is empty.</p>
                            <p className="text-sm">Drag & drop MP3 files onto the player to add them.</p>
                          </div>
                        )}
                      </ScrollArea>
                    </SheetContent>
                 </Sheet>
            </div>
        </div>
    </div>
  );
}
