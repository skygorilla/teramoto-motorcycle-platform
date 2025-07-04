"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  ListMusic
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export function JinglePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
        setDuration(audioRef.current.duration);
    }
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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.volume = volume;

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-24 bg-card/95 backdrop-blur-sm border-t border-border/40 p-2 text-card-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.5)]">
        <audio ref={audioRef} src="/audio/jingle.mp3" preload="metadata" />
        <div className="container mx-auto flex h-full items-center justify-between gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-3 w-[25%] min-w-0">
                <Image 
                    src="https://placehold.co/64x64.png" 
                    alt="Jingle Art" 
                    width={56} 
                    height={56} 
                    className="rounded-md"
                    data-ai-hint="radio microphone"
                />
                <div className="min-w-0">
                    <h4 className="font-bold truncate text-sm">TERAMOTO Jingle</h4>
                    <p className="text-xs text-muted-foreground truncate">Announcements</p>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center gap-2 flex-grow">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                        <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:inline-flex">
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
                    <ListMusic className="h-5 w-5" />
                 </Button>
            </div>
        </div>
    </div>
  );
}
