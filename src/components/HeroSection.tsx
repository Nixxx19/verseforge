import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const prompts = [
    { genre: "Travis Scott", text: "Watering Plants" },
    { genre: "Drake", text: "Late Night" },
    { genre: "The Weeknd", text: "City Lights" },
    { genre: "Post Malone", text: "Summer Vibes" },
    { genre: "Billie Eilish", text: "Dark Thoughts" },
    { genre: "Dua Lipa", text: "Nostalgic Memories"},
    { genre: "Ariana Grande", text: "Heartbreak" },
    { genre: "Tyler", text: "Creative Freedom" },
    { genre: "Lana Del Rey", text: "Bad Energy" },
    { genre: "Kanye West", text: "Self Reflection" },
    { genre: "Taylor Swift", text: "Storytelling" },
    { genre: "Frank Ocean", text: "Ocean Waves" },
    { genre: "Doja Cat", text: "Fun And Playful" },
    { genre: "Bad Bunny", text: "Latin Rhythms" }
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [displayArtist, setDisplayArtist] = useState("");
  const [displayMiddle, setDisplayMiddle] = useState("");
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);
  const [displayInitialText, setDisplayInitialText] = useState("");

  useEffect(() => {
    // Show initial prompt for 8 seconds
    if (showInitialPrompt) {
      const initialText = "Make any song you can imagine";
      
      if (displayInitialText.length < initialText.length) {
        // Type the initial text letter by letter
        const timer = setTimeout(() => {
          setDisplayInitialText(initialText.slice(0, displayInitialText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        // Wait 8 seconds after typing is complete
        const timer = setTimeout(() => {
          setShowInitialPrompt(false);
          setDisplayText("");
          setDisplayArtist("");
          setDisplayMiddle("");
          setIsTyping(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [showInitialPrompt, displayInitialText]);

  useEffect(() => {
    if (showInitialPrompt) return; // Don't run the prompt loop while showing initial prompt

    const currentPrompt = prompts[currentPromptIndex];
    const fullText = currentPrompt.text;
    const artistName = currentPrompt.genre;
    const middleText = " song about ";

    let timeoutId: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayArtist.length < artistName.length) {
        // Type artist name first
        timeoutId = setTimeout(() => {
          setDisplayArtist(artistName.slice(0, displayArtist.length + 1));
        }, 50);
      } else if (displayMiddle.length < middleText.length) {
        // Then type middle text
        timeoutId = setTimeout(() => {
          setDisplayMiddle(middleText.slice(0, displayMiddle.length + 1));
        }, 50);
      } else if (displayText.length < fullText.length) {
        // Finally type the prompt text
        timeoutId = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 500);
      }
    } else {
      if (displayText.length > 0) {
        // Delete prompt text first
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else if (displayMiddle.length > 0) {
        // Then delete middle text
        timeoutId = setTimeout(() => {
          setDisplayMiddle(displayMiddle.slice(0, -1));
        }, 50);
      } else if (displayArtist.length > 0) {
        // Then delete artist name
        timeoutId = setTimeout(() => {
          setDisplayArtist(displayArtist.slice(0, -1));
        }, 50);
      } else {
        // Move to next prompt and reset state
        timeoutId = setTimeout(() => {
          setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
          setIsTyping(true);
          setDisplayText("");
          setDisplayArtist("");
          setDisplayMiddle("");
        }, 100);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, displayArtist, displayMiddle, isTyping, currentPromptIndex, prompts, showInitialPrompt]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden flex items-center justify-center pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main content */}
      <div className="container mx-auto px-12 text-center relative z-10">
        <div className="h-48 flex items-center justify-center mb-8">
          <h1 className="font-sans text-6xl md:text-[79px] font-bold text-white leading-tight max-w-6xl mx-auto">
            {showInitialPrompt ? (
              <>
                {displayInitialText}
                <span className={`${showCursor ? 'opacity-60' : 'opacity-0'} transition-opacity duration-100 text-4xl md:text-[66px] font-extralight inline-block leading-none text-white`}>|</span>
              </>
            ) : (
              <>
                Create a {displayArtist || ""} {displayMiddle || ""} {displayText || ""}
                <span className={`${showCursor ? 'opacity-70' : 'opacity-0'} transition-opacity duration-100 text-4xl md:text-[66px] font-extralight inline-block leading-none text-white`}>|</span>
              </>
            )}
          </h1>
        </div>
        
        <p className="text-white/90 text-xl md:text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          The world's most advanced AI music creation platform. Transform any idea into professional-quality music in seconds.
        </p>

        {/* Premium Search Input */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative flex items-center gap-4 bg-white/10 backdrop-blur-glass border border-white/30 rounded-2xl p-4 shadow-glass hover:border-white/50 transition-all duration-300">
            <Music className="text-white/80 w-6 h-6 ml-3" />
            <Input 
              placeholder="Describe your musical vision..."
              className="flex-1 bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-xl font-light"
            />
            <Button variant="create" size="lg" className="px-12 rounded-xl font-semibold text-lg shadow-glow hover:scale-105 transition-all duration-300">
              Generate
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              0 songs created today
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              15s average generation time
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="secondary" className="rounded-full px-8 py-4 text-lg font-medium">
            🎧 Show Me Examples
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;