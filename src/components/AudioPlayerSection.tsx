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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [timerKey, setTimerKey] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      title: "Blue Hours",
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
      title: "Half of Me",
      artist: "Taylor Swift",
      genre: "Pop",
      duration: "0:00",
      likes: 4521,
      description: "Emotional pop ballad with heartfelt storytelling and melodic hooks",
      audioFile: "/audio/taylorswift.mp3",
      albumCover: "/covers/taylor_cover.jpg",
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
      albumCover: "/covers/drake_cover.jpg",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    },
    {
      title: "Ride With You",
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

  // Auto-slide main player every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        const nextTrack = (currentTrack + 1) % tracks.length;
        changeTrack(nextTrack);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentTrack, isPlaying, tracks.length]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentSlide((prev) => (prev + 1) % tracks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tracks.length, timerKey]);

  // Get current song
  const getCurrentSong = () => {
    return tracks[currentSlide];
  };

  // Handle navigation with direction and timer reset
  const handleSlideChange = (direction: 'left' | 'right') => {
    setSlideDirection(direction);
    if (direction === 'right') {
      setCurrentSlide((prev) => (prev + 1) % tracks.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
    
    // Reset the auto-slide timer
    setTimerKey(prev => prev + 1);
  };

  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="showcase" className="py-24 bg-background relative overflow-hidden scroll-mt-40">
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
        <div className="text-center mb-8">
          <Badge className="bg-gradient-create text-white border-0 px-6 py-2 mb-4 text-sm font-medium">
            Listen & Experience
          </Badge>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            AI-Generated
            <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed py-4">
            Explore songs created by our AI that showcase the incredible potential of artificial intelligence in music
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Left Arrow */}
          <button
            onClick={() => {
              const prevTrack = (currentTrack - 1 + tracks.length) % tracks.length;
              changeTrack(prevTrack);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 group"
          >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const nextTrack = (currentTrack + 1) % tracks.length;
              changeTrack(nextTrack);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-20 group"
          >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Player - Apple Music Style */}
          <div className="bg-glass-card backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-glass hover:shadow-glass-hover transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Album Art */}
              <div className="relative flex-shrink-0">
                <div className="w-64 h-64 bg-gradient-hero rounded-3xl flex items-center justify-center shadow-glow mx-auto lg:mx-0 overflow-hidden">
                  {currentSong.albumCover ? (
                    <img src={currentSong.albumCover} alt={currentSong.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-10 h-10 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <Badge className="absolute -top-2 -right-2 bg-gradient-premium text-white border-0 px-3 py-1 rounded-full shadow-premium text-xs">
                  AI Generated
                </Badge>
              </div>

              {/* Track Info & Controls */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {currentSong.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-2">
                    by {currentSong.artist}
                  </p>
                  <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">
                    {currentSong.genre}
                  </Badge>
                </div>

                <p className="text-foreground/90 leading-relaxed text-base">
                  {currentSong.description}
                </p>

                {/* Enhanced Waveform */}
                <div className="flex items-end gap-1.5 h-16 bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                  {currentSong.waveform.map((height, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-create rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{
                        height: `${height}%`,
                        width: '6px',
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
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevTrack}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    
                    <Button
                      variant="create"
                      size="icon"
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full shadow-glow hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextTrack}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayerSection;