import OpenAI from "openai";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// --- OpenAI client setup ---
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// --- Lyrics generation function ---
async function generateLyrics(userInput, temperature = 0.8) {
  const systemPrompt = `
You are an expert song lyrics generator with a deep understanding of musical styles, artist voices, and lyrical structures. Your goal is to write complete, original, and emotionally engaging songs based on the user's input. Follow these instructions carefully:

1. Detect if the user mentioned an artist. If so, emulate their lyrical voice, flow, vocabulary, rhyme schemes, recurring themes, cadence, and tone with 90-95% stylistic accuracy.
2. Identify the main theme, topic, or mood of the song from the user's input.
3. You should follow a structure like [Chorus] [Post-Chorus] [Verse 2] [Pre-Chorus] [Chorus] [Post-Chorus]. You can swap out the [Post-Chorus] with a [Drop] if you are doing EDM. The Post-Chorus should be 2 short lines and everything else should be 4 lines.
4. Make lyrics simple, rhythmic, and easy to sing. Avoid long sentences or overly complex phrasing that may be hard for TTS to vocalize.
5. Use repetition in choruses and post-choruses to make it melodic and catchy.
6. Use vivid imagery, clever wordplay, and relatable emotions, but prioritize singability over literary complexity.
7. Ensure each line has a natural syllable flow suitable for singing.
8. Pay attention to the temperature parameter (range 0.0 - 1.0) for lyrical creativity:
   - 0.0 - 0.2: extremely safe, predictable, very structured.
   - 0.3 - 0.5: mildly creative, slightly varied rhymes and metaphors.
   - 0.6 - 0.8: balanced creativity, imaginative and engaging, but still singable.
   - 0.9 - 1.0: highly creative, experimental, surprising, with unusual wordplay or phrasing.
9. Output only the lyrics with clear section labels, no explanations or commentary.
`;

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-3.3-8b-instruct:free",
    temperature,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `User input: "${userInput}"` },
    ],
  });

  return response.choices[0].message.content;
}

// --- TTS function ---
async function generateAudioWithSonauto({
    prompt,
    bpm = 120,
    balanceStrength = 0.8,
    promptStrength = 1.56,
    outputFormat = "mp3",
  }, sendStatus = null) {
    const sonaApiKey = process.env.SUNAOTO_API_KEY;
    if (!sonaApiKey) throw new Error("Set your SUNAOTO_API_KEY environment variable!");
  
    try {
      const instrumental = balanceStrength <= 0.15;

      // 🔹 Add random suffix to avoid style caching between generations
      const cacheBuster = `\n\n[SessionID:${Date.now()}-${Math.floor(Math.random() * 10000)}]`;

      const payload = {          
        prompt: prompt + cacheBuster,         
        instrumental,
        balance_strength: balanceStrength,
        bpm,
        prompt_strength: promptStrength,
        num_songs: 2
      };
  
      const response = await axios.post(
        "https://api.sonauto.ai/v1/generations",
        payload,
        {
          headers: {
            "Authorization": `Bearer ${sonaApiKey}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      const taskId = response.data.task_id;
      console.log("Sonauto task ID:", taskId);
  
      let songUrls = [];
      let finalLyrics = null;
  
      while (songUrls.length === 0) {
        await new Promise(res => setTimeout(res, 3000));
        const statusRes = await axios.get(
          `https://api.sonauto.ai/v1/generations/${taskId}`,
          { headers: { "Authorization": `Bearer ${sonaApiKey}` } }
        );
  
        const status = statusRes.data.status;
        console.log("Status:", status);
        
        // Send status updates to frontend
        if (sendStatus) {
          let progress = 50; // Base progress for audio generation
          let message = 'Generating audio...';
          
          switch (status) {
            case 'PROMPT':
              progress = 50;
              message = 'Processing prompt...';
              break;
            case 'TASK_SENT':
              progress = 55;
              message = 'Task sent to audio engine...';
              break;
            case 'GENERATING':
              progress = 60;
              message = 'Generating audio...';
              break;
            case 'DECOMPRESSING':
              progress = 80;
              message = 'Processing audio...';
              break;
            case 'SAVING':
              progress = 90;
              message = 'Saving audio files...';
              break;
            case 'SUCCESS':
              progress = 95;
              message = 'Audio generation complete!';
              break;
            case 'FAILURE':
              progress = 0;
              message = 'Audio generation failed';
              break;
          }
          
          sendStatus(status, progress, message);
        }
  
        if (status === "SUCCESS") {
          songUrls = statusRes.data.song_paths;
          finalLyrics = statusRes.data.lyrics;
          console.log("Final tags used:", statusRes.data.tags);
  
          // Save all generated songs
          for (let i = 0; i < songUrls.length; i++) {
            const audioResponse = await axios.get(songUrls[i], { responseType: "arraybuffer" });
            fs.writeFileSync(`song_${i + 1}.mp3`, audioResponse.data);
            console.log(`Audio saved as song_${i + 1}.mp3`);
          }
        } else if (status === "FAILURE") {
          throw new Error("Sonauto generation failed: " + statusRes.data.error_message);
        }
      }

      return finalLyrics;

    } catch (err) {
      console.error("Error generating audio with Sonauto:", err.response?.data || err.message);
    }
  }

// --- API Endpoints ---

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'VerseForge API is running' });
});

// Song generation endpoint with SSE
app.post('/generate', async (req, res) => {
  try {
    const { userInput, temperature = 0.8, bpm = 135, balance = 1.0 } = req.body;
    
    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required' });
    }

    console.log('Starting song generation with:', { userInput, temperature, bpm, balance });

    // Set up SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });

    const sendStatus = (status, progress, message = '') => {
      res.write(`data: ${JSON.stringify({ status, progress, message })}\n\n`);
    };

    // Step 1: Generate lyrics
    sendStatus('GENERATING_LYRICS', 10, 'Creating lyrics with AI...');
    const lyrics = await generateLyrics(userInput, temperature);
    console.log("Generated lyrics:", lyrics);
    sendStatus('LYRICS_COMPLETE', 30, 'Lyrics generated successfully!');

    // Step 2: Build combined TTS prompt
    const ttsPrompt = `${userInput}\n\nLyrics:\n${lyrics}`;
    sendStatus('PREPARING_AUDIO', 40, 'Preparing audio generation...');

    // Step 3: Generate audio with real-time status updates
    const ttsLyrics = await generateAudioWithSonauto({
      prompt: ttsPrompt,
      bpm: bpm,
      balanceStrength: balance,
    }, sendStatus);

    // Final success
    sendStatus('SUCCESS', 100, 'Song generation complete!');
    res.write(`data: ${JSON.stringify({ 
      lyrics: lyrics, 
      ttsLyrics: ttsLyrics, 
      audioFiles: ['song_1.mp3', 'song_2.mp3'],
      complete: true 
    })}\n\n`);
    
    res.end();

  } catch (error) {
    console.error('Error in song generation:', error);
    res.write(`data: ${JSON.stringify({ 
      error: 'Failed to generate song', 
      details: error.message,
      complete: true 
    })}\n\n`);
    res.end();
  }
});

// Serve generated audio files
app.get('/audio/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `./${filename}`;
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath, { root: '.' });
  } else {
    res.status(404).json({ error: 'Audio file not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`VerseForge API server running on port ${PORT}`);
});

// --- Legacy main function (for testing) ---
async function main() {
  // User settings
  const userInput = "jazz song about christmas";
  const userTemperature = 0.8;  // controls lyrics creativity
  const userBpm = 135;         // user BPM for TTS
  const userBalance = 1.0;    // balance strength for TTS

  // Step 1: Generate lyrics
  const lyrics = await generateLyrics(userInput, userTemperature);
  console.log("Original LLaMA Lyrics (reference):\n", lyrics);

  // Step 2: Build combined TTS prompt (user input + lyrics)
  const ttsPrompt = `${userInput}\n\nLyrics:\n${lyrics}`;

  // 🔹 NEW LOG: show exactly what is sent to TTS
  console.log("\n=== Prompt & Lyrcis sent to TTS ===\n", ttsPrompt);

  // Step 3: Generate audio
  const ttsLyrics = await generateAudioWithSonauto({
    prompt: ttsPrompt, // lyrcis and prompt togther sent to TTS so output is more accurate and better
    bpm: userBpm,
    balanceStrength: userBalance,
  });

  if (userBalance < 0.1) {
    console.log("\n=== Karaoke Lyrics (from LLaMA) ===\n", lyrics);
  } else {
    console.log("\n=== TTS Generated Lyrics ===\n", ttsLyrics);
  }
}

// Uncomment to run main function for testing
// main();