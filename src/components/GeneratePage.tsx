import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swords, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import UserProfileDropdown from "./UserProfileDropdown";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import MySongsSection from "./MySongsSection";
import StatisticsSection from "./StatisticsSection";
import Footer from "./Footer";

const GeneratePage = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const location = useLocation();
  const [generationData, setGenerationData] = useState(location.state?.generationData || null);
  const [prompt, setPrompt] = useState(location.state?.prompt || '');
  const [temperature, setTemperature] = useState(location.state?.temperature || 1.7);
  const [balance, setBalance] = useState(location.state?.balance || 0.7);
  const [bpm, setBpm] = useState(location.state?.bpm || 120);
  const [isGenerating, setIsGenerating] = useState(location.state?.isGenerating !== false);
  const [generationStatus, setGenerationStatus] = useState('Initializing...');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [backendInfo, setBackendInfo] = useState('');
  const [currentVariant, setCurrentVariant] = useState(0);
  
  // Update user profile visibility when authentication state changes
  useEffect(() => {
    if (isLoaded) {
      const shouldShowProfile = isSignedIn && !!user;
      setShowUserProfile(shouldShowProfile);
    }
  }, [isSignedIn, isLoaded, user]);

  // Start generation when component mounts with generation state
  useEffect(() => {
    if (isGenerating && prompt) {
      startGeneration();
    }
  }, [isGenerating, prompt]);

  // Function to start backend generation
  const startGeneration = async () => {
    if (!prompt) return;

    try {
      setGenerationStatus('Initializing...');
      setProgressPercentage(5);

      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: prompt,
          temperature: temperature,
          bpm: bpm,
          balance: balance,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setGenerationStatus('GENERATING');
      setProgressPercentage(30);

      const data = await response.json();

      if (data.error) {
        console.error('Generation failed:', data.error);
        alert('Generation failed: ' + data.error);
        setIsGenerating(false);
        return;
      }

      setGenerationStatus('DECOMPRESSING');
      setProgressPercentage(70);

      // Simulate the final stages based on backend logs
      setTimeout(() => {
        setGenerationStatus('SAVING');
        setProgressPercentage(90);
      }, 2000);

      setTimeout(() => {
        setGenerationStatus('SUCCESS');
        setProgressPercentage(100);
        
        setGenerationData(data);
        setIsGenerating(false);
        
        // Store result in sessionStorage for persistence
        sessionStorage.setItem('generationResult', JSON.stringify({
          generationData: data,
          prompt: prompt
        }));
      }, 4000);

    } catch (error) {
      console.error('Error calling backend:', error);
      alert('Error connecting to server. Please try again.');
      setIsGenerating(false);
    }
  };

  // Check for generation result from sessionStorage
  useEffect(() => {
    const storedResult = sessionStorage.getItem('generationResult');
    if (storedResult) {
      const result = JSON.parse(storedResult);
      setGenerationData(result.generationData);
      setPrompt(result.prompt);
      setIsGenerating(false);
      sessionStorage.removeItem('generationResult'); // Clear after reading
    }
  }, []);

  // If no generation data and not generating, show loading state
  if (!generationData && !isGenerating) {
    return (
      <section className="min-h-screen bg-gradient-hero relative overflow-hidden pt-14">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] pt-20 pb-20">
          <div className="text-center max-w-4xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
              No Generation Data
            </h1>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Please go back and generate a song first.
            </p>
            <Button variant="create" className="rounded-full px-8 py-4 text-base" onClick={() => window.location.href = '/'}>
              Go Back
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden pt-14">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Header with navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                VerseForge
              </span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <button 
                className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus:visible:ring-0"
                onClick={() => window.location.href = '/'}
                onMouseEnter={(e) => {
                  const button = e.currentTarget;
                  const underline = button.querySelector('.underline') as HTMLElement;
                  if (underline) {
                    underline.style.width = '80%';
                    underline.style.left = '50%';
                    underline.style.boxShadow = '0 4px 12px -2px rgba(102, 126, 234, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  const button = e.currentTarget;
                  const underline = button.querySelector('.underline') as HTMLElement;
                  if (underline) {
                    underline.style.width = '0%';
                    underline.style.left = '50%';
                    underline.style.boxShadow = '';
                  }
                }}
              >
                Home
                <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
              </button>
              <button 
                className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus:visible:ring-0"
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById('my-songs');
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight - -43;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }}
                onMouseEnter={(e) => {
                  const button = e.currentTarget;
                  const underline = button.querySelector('.underline') as HTMLElement;
                  if (underline) {
                    underline.style.width = '83%';
                    underline.style.left = '50%';
                    underline.style.boxShadow = '0 4px 12px -2px rgba(102, 126, 234, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  const button = e.currentTarget;
                  const underline = button.querySelector('.underline') as HTMLElement;
                  if (underline) {
                    underline.style.width = '0%';
                    underline.style.left = '50%';
                    underline.style.boxShadow = '';
                  }
                }}
              >
                VerseVault
                <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
              </button>
              <button 
                className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus:visible:ring-0"
                onMouseEnter={(e) => {
                  const button = e.currentTarget;
                  const underline = button.querySelector('.underline') as HTMLElement;
                  if (underline) {
                    underline.style.width = '85%';
                    underline.style.left = '50%';
                    underline.style.boxShadow = '0 4px 12px -2px rgba(102, 126, 234, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  const button = e.currentTarget;
                  const underline = button.querySelector('.underline') as HTMLElement;
                  if (underline) {
                    underline.style.width = '0%';
                    underline.style.left = '50%';
                    underline.style.boxShadow = '';
                  }
                }}
              >
                Add Reviews
                <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <UserProfileDropdown tempEmail={null} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] pt-14 pb-20">
        <div className="text-center max-w-4xl">
          {isGenerating ? (
            <>
              <Badge className="bg-gradient-create text-white border-0 px-6 py-2 mb-8 text-sm font-medium">
                Generation in Progress
              </Badge>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
                Creating Your
                <br />
                <span className="bg-gradient-warm bg-clip-text text-transparent">
                  Masterpiece
                </span>
              </h1>
              
              <p className="text-white/80 text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Our AI is working on your musical vision. This usually takes 15-30 seconds.
              </p>

              {/* Progress Section */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-2xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-create rounded-full flex items-center justify-center animate-pulse">
                    <Plus className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white text-xl font-semibold mb-2">{generationStatus}</h3>
                    <p className="text-white/70 text-base">
                      {backendInfo || 'Working on your musical vision'}
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-4 mb-6">
                  <div 
                    className="bg-gradient-create h-4 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <p className="text-white/60 text-base">Estimated time: {progressPercentage < 50 ? '20 seconds' : '10 seconds'}</p>
              </div>
            </>
          ) : (
            <>
              <Badge className="bg-green-500 text-white border-0 px-6 py-2 mb-8 text-sm font-medium">
                Generation Complete
              </Badge>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">
                Your Song is
                <br />
                <span className="bg-gradient-warm bg-clip-text text-transparent">
                  Ready!
                </span>
              </h1>
              
              <p className="text-white/80 text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Your AI-generated song has been created successfully!
              </p>

              {/* Song Output Section */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-4xl mx-auto mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-white text-xl font-semibold mb-4">Song Generated Successfully</h3>
                  <p className="text-white/70 text-base mb-6">
                    Your song has been created and saved. You can find it in your VerseVault.
                  </p>
                </div>

                {/* Audio Players Slider */}
                {generationData?.audioFiles && generationData.audioFiles.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-white text-lg font-semibold mb-4 text-center">Generated Audio</h4>
                    <div className="relative">
                      {/* Navigation Arrows */}
                      <button
                        onClick={() => setCurrentVariant(prev => prev === 0 ? generationData.audioFiles.length - 1 : prev - 1)}
                        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-200"
                        disabled={generationData.audioFiles.length <= 1}
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      
                      <button
                        onClick={() => setCurrentVariant(prev => prev === generationData.audioFiles.length - 1 ? 0 : prev + 1)}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-200"
                        disabled={generationData.audioFiles.length <= 1}
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>

                      {/* Current Audio Player */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mx-12">
                        <h5 className="text-white text-base font-medium mb-3 text-center">
                          Song Variant {currentVariant + 1} of {generationData.audioFiles.length}
                        </h5>
                        <audio 
                          controls 
                          className="w-full"
                          controlsList="nodownload"
                          key={currentVariant} // Force re-render when variant changes
                        >
                          <source src={`http://localhost:3001/audio/${generationData.audioFiles[currentVariant]}`} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>

                      {/* Dots Indicator */}
                      {generationData.audioFiles.length > 1 && (
                        <div className="flex justify-center mt-4 gap-2">
                          {generationData.audioFiles.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentVariant(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentVariant 
                                  ? 'bg-white' 
                                  : 'bg-white/30 hover:bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Generated Lyrics */}
                {generationData?.lyrics && (
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-4 text-center">Generated Lyrics</h4>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-h-60 overflow-y-auto">
                      <pre className="text-white/90 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {generationData.lyrics}
                      </pre>
                    </div>
                  </div>
                )}

                {/* TTS Lyrics if available */}
                {generationData?.ttsLyrics && (
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-4 text-center">TTS Lyrics</h4>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-h-40 overflow-y-auto">
                      <pre className="text-white/90 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {generationData.ttsLyrics}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 mt-2">
            {isGenerating ? (
              <Button variant="secondary" className="rounded-full px-8 py-4 text-base" onClick={() => {
                setIsGenerating(false);
                navigate('/');
              }}>
                Cancel Generation
              </Button>
            ) : (
              <Button variant="create" className="rounded-full px-8 py-4 text-base" onClick={() => window.location.href = '/?focus=true'}>
                <Plus className="w-5 h-5 mr-3" />
                Create Another
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* My Songs Section */}
      <MySongsSection />
      
      {/* Statistics Section */}
      <StatisticsSection />
      
      {/* Footer */}
      <Footer />
    </section>
  );
};

export default GeneratePage;
