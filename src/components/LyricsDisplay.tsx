import React from 'react';

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
  if (!isVisible || !lyrics.length) return null;

  // Find the current lyric line based on time
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });

  const currentLine = currentLineIndex >= 0 ? lyrics[currentLineIndex] : null;
  const nextLine = currentLineIndex >= 0 && currentLineIndex < lyrics.length - 1 ? lyrics[currentLineIndex + 1] : null;

  return (
    <div className="mt-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Lyrics</h4>
      
      {/* Previous line (faded) */}
      {currentLineIndex > 0 && (
        <p className="text-sm text-muted-foreground/60 mb-2 transition-all duration-300">
          {lyrics[currentLineIndex - 1]?.text}
        </p>
      )}
      
      {/* Current line (highlighted) */}
      {currentLine && (
        <p className="text-lg font-medium text-foreground mb-2 transition-all duration-300">
          {currentLine.text}
        </p>
      )}
      
      {/* Next line (preview) */}
      {nextLine && (
        <p className="text-sm text-muted-foreground/60 transition-all duration-300">
          {nextLine.text}
        </p>
      )}
      
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
