# 🎵 VerseForge - AI Music Generation Platform

<div align="center">

![VerseForge Logo](public/swords.svg)

**The world's most advanced AI music creation platform. Create professional songs, beats, and compositions with cutting-edge artificial intelligence.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express&logoColor=white)](https://expressjs.com/)

</div>

## 🌟 Overview

VerseForge is a cutting-edge AI-powered music generation platform that transforms your creative ideas into professional-quality songs. Using advanced artificial intelligence, it generates original lyrics and converts them into high-quality audio tracks with customizable parameters.

### ✨ Key Features

- 🎤 **AI Lyrics Generation** - Create original, artist-style lyrics using advanced language models
- 🎵 **Text-to-Speech Audio** - Convert lyrics into professional-quality audio tracks
- 🎨 **Custom Album Covers** - Upload and customize album artwork for each song variant
- 🎛️ **Advanced Controls** - Fine-tune creativity, vocal balance, and tempo
- 👤 **User Authentication** - Secure user management with Clerk
- 📱 **Responsive Design** - Beautiful, modern UI that works on all devices
- 🎧 **Audio Player** - Full-featured player with lyrics display and waveform visualization
- 🔄 **Multiple Variants** - Generate 2 different versions of each song
- 💾 **Session Persistence** - Your creations persist across page refreshes

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **API Keys** (see Environment Variables section)

### Installation & Setup

#### Step 1: Clone the Repository
```bash
# Clone the repository
git clone https://github.com/Nixxx19/verseforge.git
cd verseforge
```

#### Step 2: Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

#### Step 3: Start the Application
```bash
# Start backend server
cd backend
npm start
```

In a new terminal window:
```bash
# Start frontend server
npm run dev
```

## 🔬 How It Works

VerseForge uses a sophisticated multi-stage AI pipeline to transform your creative ideas into professional-quality music. Here's the technical breakdown of our advanced system:

### Stage 1: Custom LSTM Preprocessing
Before generating lyrics, we run your input through our custom LSTM (Long Short-Term Memory) neural network that has been specifically trained on music data:

- **Purpose**: Preprocesses and enhances your input to create "cloud words" and cleaned lyrics
- **Training Data**: Trained on extensive music datasets to understand lyrical patterns and structures
- **Output**: Refined, music-optimized input that's ready for the next stage

### Stage 2: Fine-Tuned Llama 3.3 Model
Our core lyrics generation is powered by Meta's open-source Llama 3.3 model, which we've fine-tuned specifically for music:

- **Base Model**: `meta-llama/llama-3.3-8b-instruct:free`
- **Fine-Tuning**: Custom fine-tuning on music-specific datasets
- **Specialization**: Trained to understand artist styles, lyrical structures, and musical themes
- **Output**: High-quality, artist-style lyrics that match your creative vision

### Stage 3: Advanced TTS with Custom Tags
The generated lyrics are then processed by Sunauto TTS, which we've enhanced with custom fine-tuning:

- **Custom Tags**: Created 1000+ specialized tags for better audio output
- **Fine-Tuning**: Custom training to optimize for music generation
- **Quality Enhancement**: Improved vocal synthesis and musical expression
- **Output**: Professional-quality audio tracks with natural-sounding vocals

### Technical Pipeline Flow

```
User Input → LSTM Preprocessing → Llama 3.3 Generation → Sunauto TTS → Final Audio
      ↓              ↓                    ↓                ↓
Eg: "Drake song"  → Cloud Words → Artist-style Lyrics → Professional Audio
```

### Why This Approach Works

1. **LSTM Preprocessing**: Ensures input is optimized for music generation
2. **Fine-Tuned Llama**: Leverages open-source power with music specialization
3. **Custom TTS Tags**: 1000+ tags provide precise control over audio output
4. **End-to-End Pipeline**: Each stage is optimized for the next, ensuring quality

This multi-stage approach allows us to generate music that's both creative and technically excellent, combining the power of open-source models with our specialized fine-tuning.

