
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
  UploadCloud,
  Trash2,
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
import { useAuth } from '@/hooks/useAuth';

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
  isLocal?: boolean;
}

const defaultMetadata: TrackMetadata = {
  title: "TERAMOTO Radio",
  artist: "Playlist is empty",
  albumArt: "https://placehold.co/64x64.png"
};

const MAX_PLAYLIST_SIZE = 100;

export function JinglePlayer() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = !authLoading && user?.email === adminEmail;

  const [publicPlaylist, setPublicPlaylist] = useState<Track[]>([]);
  const [localPlaylist, setLocalPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [metadata, setMetadata] = useState<TrackMetadata>(defaultMetadata);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  const [isDragging, setIsDragging] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const combinedPlaylist = [...publicPlaylist, ...localPlaylist];

  const urlToTrack = (url: string, isLocal = false): Promise<Track> => {
    return new Promise<Track>(resolve => {
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
                  id: url, url, name, isLocal,
                  metadata: { title: title || name.replace(/\.[^/.]+$/, ''), artist: artist || 'TERAMOTO Radio', albumArt },
              });
          },
          onError: () => {
              resolve({
                  id: url, url, name, isLocal,
                  metadata: { title: name.replace(/\.[^/.]+$/, ''), artist: 'TERAMOTO Radio', albumArt: defaultMetadata.albumArt },
              });
          },
      });
    });
  };

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch('/api/playlist');
        if (!response.ok) throw new Error('Failed to fetch playlist');
        const audioUrls: string[] = await response.json();
        if (audioUrls.length > 0) {
          const tracks = await Promise.all(audioUrls.map(url => urlToTrack(url, false)));
          setPublicPlaylist(tracks);
        }
      } catch (error) {
        console.error("Error fetching public playlist:", error);
      }
    }
    fetchPlaylist();
  }, []);

  useEffect(() => {
    if (combinedPlaylist.length > 0 && currentTrackIndex === null) {
      setCurrentTrackIndex(0);
    }
    if (combinedPlaylist.length === 0) {
      setCurrentTrackIndex(null);
    }
  }, [combinedPlaylist, currentTrackIndex]);

  useEffect(() => {
    if (currentTrackIndex === null || combinedPlaylist.length === 0) {
      setIsPlaying(false);
      setMetadata(defaultMetadata);
      if (audioRef.current) audioRef.current.src = "";
      return;
    }
    const track = combinedPlaylist[currentTrackIndex];
    if (audioRef.current && audioRef.current.src !== track.url) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    }
    setMetadata(track.metadata);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, combinedPlaylist]);

  const handleFileProcessing = async (files: FileList) => {
    if (!isAdmin) return;
    const audioFiles = Array.from(files).filter(file => file.type.startsWith('audio/'));
    if (audioFiles.length === 0) return;

    if (combinedPlaylist.length + audioFiles.length > MAX_PLAYLIST_SIZE) {
        toast({
            variant: 'destructive',
            title: 'Playlist Limit Reached',
            description: `You can only have up to ${MAX_PLAYLIST_SIZE} songs.`,
        });
        return;
    }

    const newTracks = await Promise.all(
        audioFiles.map(file => urlToTrack(URL.createObjectURL(file), true))
    );

    setLocalPlaylist(prev => [...prev, ...newTracks]);

    if (currentTrackIndex === null) {
        setCurrentTrackIndex(publicPlaylist.length);
        setIsPlaying(true);
    }
    toast({
        title: "Track(s) Added for Preview",
        description: `To make a track permanent, add it to the 'public/audio' folder.`
    });
  };

  const handlePlayPause = () => {
    if (combinedPlaylist.length === 0) return;
    if (currentTrackIndex === null) setCurrentTrackIndex(0);
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play().catch(e => console.error(e));
    setIsPlaying(!isPlaying);
  };
  
  const playNextTrack = useCallback(() => {
    if (combinedPlaylist.length < 1 || currentTrackIndex === null) return;
    if (repeatMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * combinedPlaylist.length);
    } else {
      nextIndex = currentTrackIndex + 1;
    }
    if (nextIndex >= combinedPlaylist.length) {
      if (repeatMode === 'all') nextIndex = 0;
      else { setIsPlaying(false); return; }
    }
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  }, [combinedPlaylist, currentTrackIndex, isShuffle, repeatMode]);

  const playPrevTrack = () => {
    if (combinedPlaylist.length < 2 || currentTrackIndex === null) return;
    if ((audioRef.current?.currentTime ?? 0) > 3) {
      audioRef.current!.currentTime = 0;
      return;
    }
    let prevIndex = isShuffle
      ? Math.floor(Math.random() * combinedPlaylist.length)
      : (currentTrackIndex - 1 + combinedPlaylist.length) % combinedPlaylist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const removeTrack = (trackId: string) => {
    setLocalPlaylist(prev => prev.filter(t => t.id !== trackId));
    if (currentTrackIndex !== null) {
      const currentTrack = combinedPlaylist[currentTrackIndex];
      if (currentTrack?.id === trackId) {
        if (combinedPlaylist.length > 1) playNextTrack();
        else setCurrentTrackIndex(null);
      }
    }
  };

  const handleTimeUpdate = () => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedData = () => { if (audioRef.current) setDuration(audioRef.current.duration); };
  const handleSliderChange = (value: number[]) => { if (audioRef.current) audioRef.current.currentTime = value[0]; };
  const handleVolumeChange = (value: number[]) => { if (audioRef.current) audioRef.current.volume = value[0]; };
  const handleTrackEnd = () => { playNextTrack(); };

  const toggleRepeatMode = () => { setRepeatMode(prev => prev === 'all' ? 'one' : prev === 'one' ? 'off' : 'all'); };
  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;
  return (
    <div
      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); if(isAdmin) setIsDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); if(isAdmin) setIsDragging(false); }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onDrop={(e) => {
        e.preventDefault(); e.stopPropagation();
        if(isAdmin) {
          setIsDragging(false);
          handleFileProcessing(e.dataTransfer.files);
        }
      }}
      className={cn("fixed bottom-0 left-0 right-0 z-50 h-20 bg-card/95 backdrop-blur-sm border-t border-border/40 p-2 text-card-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.5)]")}
    >
        {isDragging && (
          <div className="absolute inset-0 bg-primary/20 border-2 border-dashed border-primary flex flex-col items-center justify-center pointer-events-none">
            <UploadCloud className="h-8 w-8 text-primary" />
            <p className="font-semibold text-primary">Drop audio files here</p>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleFileProcessing(e.target.files)} multiple accept="audio/*" className="hidden"/>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedData={handleLoadedData} onEnded={handleTrackEnd} onVolumeChange={() => { if (audioRef.current) setVolume(audioRef.current.volume); }}/>
        
        <div className="container mx-auto flex h-full items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-[25%] min-w-0">
                <Image src={metadata.albumArt} alt={metadata.title} width={48} height={48} className="rounded-md h-12 w-12 object-cover" data-ai-hint="radio microphone"/>
                <div className="min-w-0">
                    <h4 className="font-bold truncate text-sm">{metadata.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{metadata.artist}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 flex-grow">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground hidden sm:inline-flex", isShuffle && "text-primary")} onClick={() => setIsShuffle(!isShuffle)} disabled={combinedPlaylist.length < 2}> <Shuffle className="h-4 w-4" /> </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={playPrevTrack} disabled={combinedPlaylist.length < 2}> <SkipBack className="h-5 w-5" /> </Button>
                    <Button variant="default" size="icon" className="h-10 w-10 rounded-full" onClick={handlePlayPause} disabled={combinedPlaylist.length === 0}> {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />} </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={playNextTrack} disabled={combinedPlaylist.length < 2}> <SkipForward className="h-5 w-5" /> </Button>
                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground hidden sm:inline-flex", repeatMode !== 'off' && "text-primary")} onClick={toggleRepeatMode} disabled={combinedPlaylist.length === 0}> <RepeatIcon className="h-4 w-4" /> </Button>
                </div>
                <div className="flex items-center gap-2 w-full max-w-xl">
                    <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(currentTime)}</span>
                    <Slider value={[currentTime]} max={duration || 1} step={0.1} onValueChange={handleSliderChange} className="w-full" disabled={!combinedPlaylist.length} />
                    <span className="text-xs text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 w-[25%]">
                 <Volume2 className="h-5 w-5 text-muted-foreground" />
                 <Slider value={[volume]} max={1} step={0.05} className="w-24 hidden md:flex" onValueChange={handleVolumeChange}/>
                 <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"> <ListMusic className="h-5 w-5" /> </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader className="flex-row justify-between items-center">
                        <SheetTitle>Playlist ({combinedPlaylist.length})</SheetTitle>
                        {isAdmin && <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}><UploadCloud className="mr-2 h-4 w-4"/>Add</Button>}
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-120px)] mt-4">
                        {combinedPlaylist.length > 0 ? (
                           <div className="flex flex-col gap-2 pr-4">
                            {combinedPlaylist.map((track, index) => (
                              <div key={track.id} className={cn("group flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer", currentTrackIndex === index ? "bg-accent text-accent-foreground" : "hover:bg-accent/50")} onClick={() => setCurrentTrackIndex(index)}>
                                <Image src={track.metadata.albumArt} alt={track.metadata.title} width={40} height={40} className="rounded-md" />
                                <div className='flex-grow min-w-0'>
                                  <p className='font-semibold truncate'>{track.metadata.title}</p>
                                  <p className='text-sm text-muted-foreground truncate'>{track.metadata.artist}</p>
                                </div>
                                {isAdmin && track.isLocal && (
                                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 opacity-50 group-hover:opacity-100" onClick={(e) => {e.stopPropagation(); removeTrack(track.id);}}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                              </div>
                            ))}
                           </div>
                        ) : (
                          <div className='text-center text-muted-foreground pt-10 space-y-2'>
                            <Music2 className="h-10 w-10 mx-auto opacity-50" />
                            <p className='font-semibold'>The playlist is empty.</p>
                            {isAdmin ? <p className="text-sm">Drag and drop audio files anywhere on the page to add them.</p> : <p className="text-sm">The site administrator can add tracks.</p>}
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
