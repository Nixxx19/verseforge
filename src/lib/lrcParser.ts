export interface LyricLine {
  time: number; // Time in seconds
  text: string; // The actual lyric line
}

export interface ParsedLRC {
  title?: string;
  artist?: string;
  lyrics: LyricLine[];
}

export function parseLRC(lrcContent: string): ParsedLRC {
  const lines = lrcContent.split('\n');
  const result: ParsedLRC = { lyrics: [] };
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Parse metadata tags
    if (trimmedLine.startsWith('[') && trimmedLine.includes(':')) {
      const match = trimmedLine.match(/^\[([^:]+):([^\]]+)\]/);
      if (match) {
        const [, tag, value] = match;
        switch (tag.toLowerCase()) {
          case 'ti':
            result.title = value;
            break;
          case 'ar':
            result.artist = value;
            break;
        }
      }
      continue;
    }
    
    // Parse timestamped lyrics
    const timestampMatch = trimmedLine.match(/^\[(\d{2}):(\d{2})\.(\d{2})\](.+)$/);
    if (timestampMatch) {
      const [, minutes, seconds, centiseconds, text] = timestampMatch;
      const timeInSeconds = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(centiseconds) / 100;
      
      result.lyrics.push({
        time: timeInSeconds,
        text: text.trim()
      });
    }
  }
  
  // Sort lyrics by time
  result.lyrics.sort((a, b) => a.time - b.time);
  
  return result;
}

export async function loadLRCFile(filePath: string): Promise<ParsedLRC> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load LRC file: ${response.statusText}`);
    }
    
    const lrcContent = await response.text();
    return parseLRC(lrcContent);
  } catch (error) {
    console.error('Error loading LRC file:', error);
    return { lyrics: [] };
  }
}
