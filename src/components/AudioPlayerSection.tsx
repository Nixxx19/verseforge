import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Download } from "lucide-react";
import { useState } from "react";

const AudioPlayerSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    {
      title: "Midnight Dreams",
      artist: "AI Composer",
      genre: "Ambient Electronic",
      duration: "3:42",
      likes: 2847,
      description: "A dreamy ambient piece created from the prompt 'peaceful night in the forest'",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    },
    {
      title: "Urban Pulse",
      artist: "Beat Generator",
      genre: "Hip Hop",
      duration: "2:58",
      likes: 4521,
      description: "High-energy hip hop track generated from 'city lights and late night energy'",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    },
    {
      title: "Acoustic Soul",
      artist: "String Theory AI",
      genre: "Folk Acoustic",
      duration: "4:15",
      likes: 1893,
      description: "Warm acoustic guitar melody inspired by 'coffee shop on a rainy day'",
      waveform: Array.from({ length: 40 }, () => Math.random() * 100)
    }
  ];

  const currentSong = tracks[currentTrack];

  return (
    <section id="showcase" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
      
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
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-12 h-12 bg-white rounded-full animate-pulse" />
                  </div>
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

                {/* Premium Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
                      className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      <SkipBack className="w-6 h-6" />
                    </Button>
                    
                    <Button
                      variant="create"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 rounded-full shadow-glow hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentTrack(Math.min(tracks.length - 1, currentTrack + 1))}
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
                  0:00 / {currentSong.duration}
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
                onClick={() => setCurrentTrack(index)}
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
                    <div className="text-base text-muted-foreground font-medium">{track.duration}</div>
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