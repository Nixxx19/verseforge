import React, { useEffect, useRef, useState } from 'react';

interface LyricLine {
  time: number; // Time in seconds
  text: string; // The actual lyric line
}

interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  isVisible: boolean;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics, currentTime, isVisible }) => {
  const [prevLineIndex, setPrevLineIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (!isVisible || !lyrics.length) return null;

  // Find the current lyric line based on time
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });

  const currentLine = currentLineIndex >= 0 ? lyrics[currentLineIndex] : null;
  const nextLine = currentLineIndex >= 0 && currentLineIndex < lyrics.length - 1 ? lyrics[currentLineIndex + 1] : null;

  // Update previous line index for smooth transitions
  useEffect(() => {
    if (currentLineIndex !== prevLineIndex && currentLineIndex >= 0) {
      setPrevLineIndex(currentLineIndex);
    }
  }, [currentLineIndex, prevLineIndex]);

  return (
    <div className="mt-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Lyrics</h4>
      
      {/* Spotify-style vertical scrolling lyrics container */}
      <div className="relative h-32 overflow-hidden">
        <div 
          ref={containerRef}
          className="absolute w-full transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${currentLineIndex >= 0 ? -currentLineIndex * 40 : 0}px)`
          }}
        >
          {/* Render all lyrics with proper spacing */}
          {lyrics.map((line, index) => (
            <div
              key={index}
              className={`h-10 flex items-center justify-center text-center transition-all duration-500 ${
                index === currentLineIndex
                  ? 'text-xl font-bold text-foreground scale-110' // Current line: bold, larger, scaled
                  : index === currentLineIndex - 1
                  ? 'text-lg text-foreground/80' // Previous line: slightly faded
                  : index === currentLineIndex + 1
                  ? 'text-lg text-foreground/60' // Next line: more faded
                  : index < currentLineIndex - 1
                  ? 'text-sm text-foreground/30' // Older lines: very faded
                  : 'text-sm text-foreground/40' // Future lines: faded
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
        <div 
          className="h-full bg-gradient-create rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: currentLine && nextLine 
              ? `${((currentTime - currentLine.time) / (nextLine.time - currentLine.time)) * 100}%`
              : '0%'
          }}
        />
      </div>
    </div>
  );
};

export default LyricsDisplay;
