import OpenAI from "openai";
import axios from "axios";
import 'dotenv/config';
import fs from "fs";

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
    bpm = 135,
    balanceStrength = 0.9,
    promptStrength = 1.56,
    outputFormat = "mp3",
  }) {
    const sonaApiKey = process.env.SUNAOTO_API_KEY;
    if (!sonaApiKey) throw new Error("Set your SUNAOTO_API_KEY environment variable!");
  
    try {
      const instrumental = balanceStrength < 0.1;

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
  
// --- Full pipeline ---
async function main() {
  // User settings
  const userInput = "Taylor Swift song about coffee";
  const userTemperature = 0.8;   // controls lyrics creativity
  const userBpm = 140;           // user BPM for TTS
  const userBalance = 0.95;      // balance strength for TTS

  // Step 1: Generate lyrics
  const lyrics = await generateLyrics(userInput, userTemperature);
  console.log("Original LLaMA Lyrics (reference):\n", lyrics);

  // Step 2: Build combined TTS prompt (user input + lyrics)
  const ttsPrompt = `${userInput}\n\nLyrics:\n${lyrics}`;

  // 🔹 NEW LOG: show exactly what is sent to TTS
  console.log("\n=== Prompt sent to TTS ===\n", ttsPrompt);

  // Step 3: Generate audio
  const ttsLyrics = await generateAudioWithSonauto({
    prompt: ttsPrompt,
    bpm: userBpm,
    balanceStrength: userBalance,
  });

  if (userBalance < 0.1) {
    console.log("\n=== Karaoke Lyrics (from LLaMA) ===\n", lyrics);
  } else {
    console.log("\n=== TTS Generated Lyrics ===\n", ttsLyrics);
  }
}

main();
