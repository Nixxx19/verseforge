# VerseForge - AI Music Generation Platform

## 🚀 Quick Start

### Option 1: Use the startup script (Recommended)
```bash
./start-dev.sh
```

### Option 2: Use npm script
```bash
npm run dev:full
```

### Option 3: Start servers manually

1. **Start Backend Server:**
```bash
cd backend
npm install
npm start
```

2. **Start Frontend Server (in a new terminal):**
```bash
npm install
npm run dev
```

## 🎵 How to Generate Songs

1. **Navigate to the homepage** - You'll see the main interface with a prompt input
2. **Enter your musical vision** - Describe the song you want to create (e.g., "Drake song about late night vibes")
3. **Adjust settings (optional):**
   - **Temperature**: Controls creativity (1.5-2.0)
   - **Balance**: Controls vocal balance (0-2.0)
   - **BPM**: Sets the tempo (120-300)
4. **Click "Generate"** - A modal will open with the Generator component
5. **Click "🎵 Generate" in the modal** - The system will:
   - Generate lyrics using AI
   - Create audio using Sonauto TTS
   - Display the results in the modal

## 🔧 Backend API

The backend server runs on `http://localhost:3001` and provides:

- `POST /generate` - Generate a new song
- `GET /audio/:filename` - Serve generated audio files
- `GET /health` - Health check endpoint

## 📁 Project Structure

```
verseforge/
├── backend/           # Express API server (port 3001)
│   ├── server.js      # Main server file
│   └── package.json   # Backend dependencies
├── src/               # React frontend
│   ├── components/   # React components
│   │   ├── Generator.tsx  # Simple song generator component
│   │   └── ...
│   └── ...
├── start-dev.sh       # Development startup script
└── vite.config.ts     # Vite configuration
```

## 🛠️ Environment Variables

Create a `.env` file in the `backend/` directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
SUNAOTO_API_KEY=your_sonauto_api_key
```

## 🎯 Features

- **AI Lyrics Generation**: Creates original lyrics based on your prompt
- **Text-to-Speech**: Converts lyrics to professional-quality audio
- **Multiple Versions**: Generates 2 different versions of each song
- **Simple Generator Modal**: Clean interface for song generation
- **User Authentication**: Secure user management with Clerk
- **Auto Backend Startup**: Backend starts automatically when needed

## 🔄 Development Flow

1. User enters prompt on homepage
2. User clicks "Generate" button
3. Generator modal opens with user's input
4. User clicks "🎵 Generate" in modal
5. Frontend calls backend API (`http://localhost:3001/generate`)
6. Backend generates lyrics with OpenAI/OpenRouter
7. Backend creates audio with Sonauto
8. Results displayed in modal

## 🚀 Automatic Backend Management

The system now automatically:
- Checks if backend is running on port 3001
- Starts backend if it's not running
- Provides clear error messages if backend fails to start
- Uses simple Generator component for easy testing

---

*The Generator component provides a simple, clean interface for testing song generation without complex UI.*
