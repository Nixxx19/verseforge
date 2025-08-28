import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const AudioPlayerSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      title: "Ocean Waves",
      artist: "Frank Ocean",
      genre: "R&B",
      duration: "0:00",
      likes: 2847,
      description: "A dreamy R&B piece inspired by ocean waves and coastal vibes",
      audioFile: "/audio/frank.mp3",
      albumCover: "/covers/frank.jpeg",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    },
    {
      title: "Storytelling",
      artist: "Taylor Swift",
      genre: "Pop",
      duration: "0:00",
      likes: 4521,
      description: "Emotional pop ballad with heartfelt storytelling and melodic hooks",
      audioFile: "/audio/taylorswift.mp3",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    },
    {
      title: "Nothing But Wins",
      artist: "Drake",
      genre: "Hip Hop/R&B",
      duration: "0:00",
      likes: 3200,
      description: "Smooth hip hop and R&B fusion perfect for late night listening",
      audioFile: "/audio/Drake1.mp3",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    },
    {
      title: "Late Night Energy",
      artist: "Travis Scott",
      genre: "Hip Hop",
      duration: "0:00",
      likes: 1893,
      description: "High-energy hip hop track with atmospheric beats and autotune vocals",
      audioFile: "/audio/travis.mp3",
      albumCover: "/covers/travis.jpeg",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    }
  ];

  const currentSong = tracks[currentTrack];

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle track change
  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // Handle next/previous track
  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    changeTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    changeTrack(prevIndex);
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  // Update duration display when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="showcase" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong.audioFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge className="bg-gradient-create text-white border-0 px-6 py-2 mb-6 text-sm font-medium">
            Listen & Experience
          </Badge>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
            AI-Generated
            <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Explore songs created by our AI that showcase the incredible potential of artificial intelligence in music
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Player - Apple Music Style */}
          <div className="bg-glass-card backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-glass hover:shadow-glass-hover transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Album Art */}
              <div className="relative flex-shrink-0">
                <div className="w-72 h-72 bg-gradient-hero rounded-3xl flex items-center justify-center shadow-glow mx-auto lg:mx-0 overflow-hidden">
                  {currentSong.albumCover ? (
                    <img src={currentSong.albumCover} alt={currentSong.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-12 h-12 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <Badge className="absolute -top-3 -right-3 bg-gradient-premium text-white border-0 px-4 py-1 rounded-full shadow-premium">
                  AI Generated
                </Badge>
              </div>

              {/* Track Info & Controls */}
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="font-heading text-4xl font-bold text-foreground mb-3">
                    {currentSong.title}
                  </h3>
                  <p className="text-muted-foreground text-xl mb-2">
                    by {currentSong.artist}
                  </p>
                  <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">
                    {currentSong.genre}
                  </Badge>
                </div>

                <p className="text-foreground/90 leading-relaxed text-lg">
                  {currentSong.description}
                </p>

                {/* Enhanced Waveform */}
                <div className="flex items-end gap-1.5 h-20 bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                  {currentSong.waveform.map((height, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-create rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{
                        height: `${height}%`,
                        width: '8px',
                        opacity: index < 15 ? 0.9 : 0.4
                      }}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-create rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Premium Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevTrack}
                      className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      <SkipBack className="w-6 h-6" />
                    </Button>
                    
                    <Button
                      variant="create"
                      size="icon"
                      onClick={togglePlay}
                      className="w-20 h-20 rounded-full shadow-glow hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextTrack}
                      className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      <SkipForward className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <Heart className="w-4 h-4" />
                      {currentSong.likes.toLocaleString()}
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Playlist */}
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                  index === currentTrack 
                    ? 'bg-glass-card border-primary/30 shadow-glow' 
                    : 'bg-glass-card/50 hover:bg-glass-card border-white/5'
                } border rounded-2xl p-6 backdrop-blur-xl`}
                onClick={() => changeTrack(index)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center shadow-premium">
                    <div className="w-6 h-6 bg-white rounded-full" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-heading text-lg font-semibold text-foreground mb-1">{track.title}</h4>
                    <p className="text-muted-foreground text-base">{track.artist} • {track.genre}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-base text-muted-foreground font-medium">{formatTime(duration)}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Heart className="w-4 h-4" />
                      {track.likes.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayerSection;