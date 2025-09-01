import OpenAI from "openai";

// Check if API key is available
if (!process.env.OPENROUTER_API_KEY && !process.env.OPENAI_API_KEY) {
  console.error("Error: OPENROUTER_API_KEY or OPENAI_API_KEY environment variable is required");
  console.log("Please set your API key:");
  console.log("export OPENROUTER_API_KEY=your_api_key_here");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1",
});

async function generateLyrics(artist, theme, temperature = 0.8) {
const systemPrompt = `
You are a creative song lyrics generator. Write a complete song based on the user's input.
• If the user specifies an artist or style, replicate that artist's lyrical voice, flow, vocabulary, rhyme schemes, themes, and tone with 90 to 95 perecent stylistic accuracy, while keeping the lyrics fully original. Prioritize their cadence, mood, and recurring motifs over generic songwriting.
• If no artist is specified, create the song in a versatile, creative style.
• Always structure the song with verses, a catchy and repeatable chorus, and an optional bridge/outro.
• Use vivid imagery, clever wordplay, emotional depth, and natural rhythmic phrasing so the lyrics feel authentic when sung or rapped.
• Follow the user's prompt closely, respecting the requested creativity level (temperature).
• Output only the lyrics with clear section labels (e.g., Verse 1, Chorus, Verse 2, Bridge, Outro).
• Goal: The output should feel indistinguishable from a new, authentic song by the requested artist, not just loosely inspired by them.
`;
    

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-3.3-8b-instruct:free", 
    temperature: temperature,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Write a song in the style of ${artist} about ${theme}.` },
    ],
  });

  return response.choices[0].message.content;
}

// Example usage:
generateLyrics("Drake", "Late-night reflection on success, loneliness, and trust issues with friends & relationships.").then((lyrics) =>
  console.log(lyrics)
);
