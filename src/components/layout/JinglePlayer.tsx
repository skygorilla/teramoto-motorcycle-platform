"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import jsmediatags from 'jsmediatags';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Music2,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TrackMetadata {
  title: string;
  artist: string;
  albumArt: string;
}

const defaultMetadata: TrackMetadata = {
  title: "TERAMOTO Announcement",
  artist: "Radio",
  albumArt: "https://placehold.co/64x64.png"
};

export function JinglePlayer() {
  const { toast } = useToast();
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [metadata, setMetadata] = useState<TrackMetadata>(defaultMetadata);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch playlist on mount
  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch('/api/playlist');
        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }
        const data: string[] = await response.json();
        if (data.length > 0) {
          setPlaylist(data);
          setCurrentTrackIndex(0);
        } else {
          console.log("No audio files found in public/audio directory.");
        }
      } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Could not load playlist",
            description: "Please make sure the public/audio folder exists and contains MP3 files.",
        });
      }
    }
    fetchPlaylist();
  }, [toast]);

  // Effect to handle track changes and load metadata
  useEffect(() => {
    if (currentTrackIndex === null || playlist.length === 0) return;

    const trackUrl = playlist[currentTrackIndex];
    if (audioRef.current) {
        audioRef.current.src = trackUrl;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        }
    }

    // Reset metadata before fetching new
    setMetadata(defaultMetadata);

    jsmediatags.read(trackUrl, {
      onSuccess: (tag) => {
        const { title, artist, picture } = tag.tags;
        let albumArt = defaultMetadata.albumArt;
        if (picture) {
          const base64String = btoa(String.fromCharCode.apply(null, picture.data));
          albumArt = `data:${picture.format};base64,${base64String}`;
        }
        setMetadata({
            title: title || trackUrl.split('/').pop()?.replace('.mp3', '') || 'Unknown Title',
            artist: artist || 'Unknown Artist',
            albumArt,
        });
      },
      onError: (error) => {
        console.log('Could not read metadata for', trackUrl, error);
        setMetadata(prev => ({ ...prev, title: trackUrl.split('/').pop()?.replace('.mp3', '') || 'Unknown Title' }));
      }
    });

  }, [currentTrackIndex, playlist, isPlaying]);


  const handlePlayPause = () => {
    if (!audioRef.current || currentTrackIndex === null) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    if (isShuffle) {
        setCurrentTrackIndex(Math.floor(Math.random() * playlist.length));
    } else {
        setCurrentTrackIndex((prev) => (prev !== null ? (prev + 1) % playlist.length : 0));
    }
  };

  const playPrevTrack = () => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
     if (isShuffle) {
        setCurrentTrackIndex(Math.floor(Math.random() * playlist.length));
    } else {
        setCurrentTrackIndex((prev) => (prev !== null ? (prev - 1 + playlist.length) % playlist.length : 0));
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
    if(isRepeat){
        audioRef.current?.play();
    } else {
        playNextTrack();
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if(playlist.length === 0) {
      // Don't render player if there's no music.
      return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-card/95 backdrop-blur-sm border-t border-border/40 p-2 text-card-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.5)]">
        <audio 
            ref={audioRef} 
            preload="metadata" 
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            onEnded={handleTrackEnd}
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
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex" onClick={() => setIsShuffle(!isShuffle)} data-active={isShuffle}>
                        <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={playPrevTrack}>
                        <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={playNextTrack}>
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex" onClick={() => setIsRepeat(!isRepeat)} data-active={isRepeat}>
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
                    />
                    <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume and Other Controls */}
            <div className="flex items-center justify-end gap-2 w-[25%]">
                 <Volume2 className="h-5 w-5 text-muted-foreground" />
                 <Slider value={[volume]} max={1} step={0.05} className="w-24 hidden md:flex" onValueChange={handleVolumeChange}/>
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                    <Music2 className="h-5 w-5" />
                 </Button>
            </div>
        </div>
    </div>
  );
}
