import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Music, ChevronRight, Sparkles, Volume2 } from "lucide-react";
import { useState } from "react";

const CreateSection = () => {
  const [lyrics, setLyrics] = useState("");
  const [selectedMode, setSelectedMode] = useState("Auto");

  return (
    <section id="create" className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Turn any idea into a song
            </h2>
            <p className="text-white/80 text-xl">
              Beat, lyrics, or both
            </p>
          </div>

          <div className="bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
            {/* Lyrics Input */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-premium rounded-2xl flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">Describe your lyrics</span>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <Button
                    variant={selectedMode === "Auto" ? "create" : "glass"}
                    size="sm"
                    onClick={() => setSelectedMode("Auto")}
                    className="text-sm font-medium px-4 py-2 rounded-xl"
                  >
                    Auto
                  </Button>
                  <Button
                    variant={selectedMode === "Write Lyrics" ? "create" : "glass"}
                    size="sm"
                    onClick={() => setSelectedMode("Write Lyrics")}
                    className="text-sm font-medium px-4 py-2 rounded-xl"
                  >
                    Write Lyrics
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Textarea
                  placeholder="Describe your lyrics"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="min-h-40 bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none focus:border-primary transition-all duration-300 rounded-2xl text-lg backdrop-blur-sm shadow-inner"
                />
                <div className="absolute inset-0 bg-gradient-card opacity-0 hover:opacity-100 rounded-2xl pointer-events-none transition-opacity duration-300" />
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base font-medium">Generate Lyrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-glow"></div>
                  <span className="text-white text-base font-medium">Instrumental</span>
                </div>
              </div>
            </div>

            {/* Styles */}
            <div className="mb-8">
              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-premium rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">Styles</span>
                </div>
                <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>

            {/* Audio */}
            <div className="mb-10">
              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">Audio</span>
                </div>
                <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>

            {/* Create Button */}
            <Button 
              variant="create" 
              size="lg" 
              className="w-full text-xl py-6 rounded-2xl font-bold shadow-warm hover:shadow-[0_20px_40px_-12px_rgba(255,107,53,0.6)] transition-all duration-300 hover:scale-[1.02]"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateSection;