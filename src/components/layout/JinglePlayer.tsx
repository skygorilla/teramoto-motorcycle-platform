
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
  Repeat1,
  Volume2,
  ListMusic,
  Music2,
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
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  artist: "No audio in playlist",
  albumArt: "https://placehold.co/64x64.png"
};

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
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch playlist from the server on initial load
  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch('/api/playlist');
        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }
        const audioUrls: string[] = await response.json();

        if (audioUrls.length === 0) {
          setPlaylist([]);
          return;
        }

        toast({ title: `Loading ${audioUrls.length} audio file(s)...` });

        const tracks: Track[] = await Promise.all(
          audioUrls.map(url =>
            new Promise<Track>(resolve => {
              const name = url.split('/').pop()?.replace(/%20/g, " ") || 'Unknown Track';
              jsmediatags.read(url, {
                onSuccess: (tag: TagType) => {
                  const { title, artist, picture } = tag.tags;
                  let albumArt = defaultMetadata.albumArt;
                  if (picture) {
                    const base64String = btoa(String.fromCharCode.apply(null, picture.data as any));
                    albumArt = `data:${picture.format};base64,${base64String}`;
                  }
                  resolve({
                    id: url,
                    url: url,
                    name: name,
                    metadata: {
                      title: title || name.replace(/\.[^/.]+$/, ''),
                      artist: artist || 'TERAMOTO Radio',
                      albumArt,
                    },
                  });
                },
                onError: () => {
                  resolve({
                    id: url,
                    url: url,
                    name: name,
                    metadata: {
                      title: name.replace(/\.[^/.]+$/, ''),
                      artist: 'TERAMOTO Radio',
                      albumArt: defaultMetadata.albumArt,
                    },
                  });
                },
              });
            })
          )
        );
        setPlaylist(tracks);
        if (tracks.length > 0 && currentTrackIndex === null) {
          setCurrentTrackIndex(0);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        toast({
          variant: 'destructive',
          title: 'Could not load playlist',
          description: 'The audio player may not function correctly.',
        });
      }
    }
    fetchPlaylist();
  }, [toast]);


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
  }, [currentTrackIndex, playlist, isPlaying]);


  const handlePlayPause = () => {
    if (currentTrackIndex === null && playlist.length > 0) {
      setCurrentTrackIndex(0);
    }
    setIsPlaying(!isPlaying);
  };
  
  const playNextTrack = useCallback((forceWrap = false) => {
    if (playlist.length === 0 || currentTrackIndex === null) return;
    
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = currentTrackIndex + 1;
    }

    if (nextIndex >= playlist.length) {
      if (repeatMode === 'all' || forceWrap) {
        nextIndex = 0; // Wrap around
      } else {
        setIsPlaying(false); // Stop at the end of the playlist
        return;
      }
    }
    
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  }, [playlist.length, currentTrackIndex, isShuffle, repeatMode]);

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
    if (repeatMode === 'one' && audioRef.current){
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    } else {
        playNextTrack();
    }
  }
  
  const toggleRepeatMode = () => {
    const modes: typeof repeatMode[] = ['all', 'one', 'off'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 h-20 bg-card/95 backdrop-blur-sm border-t border-border/40 p-2 text-card-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.5)]"
      )}
    >
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
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => playNextTrack(true)} disabled={playlist.length < 2}>
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground hidden sm:inline-flex", repeatMode !== 'off' && "text-primary")} onClick={toggleRepeatMode}>
                        <RepeatIcon className="h-4 w-4" />
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
                        <SheetTitle>Playlist ({playlist.length})</SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                        {playlist.length > 0 ? (
                           <div className="flex flex-col gap-2 pr-4">
                            {playlist.map((track, index) => (
                              <div key={track.id} className={cn(
                                "flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer",
                                currentTrackIndex === index ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                              )}
                              onClick={() => setCurrentTrackIndex(index)}
                              >
                                <Image src={track.metadata.albumArt} alt={track.metadata.title} width={40} height={40} className="rounded-md" />
                                <div className='flex-grow min-w-0'>
                                  <p className='font-semibold truncate'>{track.metadata.title}</p>
                                  <p className='text-sm text-muted-foreground truncate'>{track.metadata.artist}</p>
                                </div>
                              </div>
                            ))}
                           </div>
                        ) : (
                          <div className='text-center text-muted-foreground pt-10 space-y-2'>
                            <Music2 className="h-10 w-10 mx-auto opacity-50" />
                            <p className='font-semibold'>The playlist is empty.</p>
                            <p className="text-sm">Audio files can be added to the `public/audio` folder.</p>
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
