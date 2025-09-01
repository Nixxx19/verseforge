import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swords, Plus } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import UserProfileDropdown from "./UserProfileDropdown";
import { useState, useEffect } from "react";
import MySongsSection from "./MySongsSection";
import StatisticsSection from "./StatisticsSection";
import Footer from "./Footer";

const GeneratePage = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  // Update user profile visibility when authentication state changes
  useEffect(() => {
    if (isLoaded) {
      const shouldShowProfile = isSignedIn && !!user;
      setShowUserProfile(shouldShowProfile);
    }
  }, [isSignedIn, isLoaded, user]);

 

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
                className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
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
                className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
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
                className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
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
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] pt-20 pb-20">
        <div className="text-center max-w-4xl">
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
          
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Our AI is working on your musical vision. This usually takes 15-30 seconds.
          </p>

          {/* Progress Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-create rounded-full flex items-center justify-center animate-pulse">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-xl font-semibold mb-2">Processing...</h3>
                <p className="text-white/70 text-base">Analyzing your prompt</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-4 mb-6">
              <div className="bg-gradient-create h-4 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            
            <p className="text-white/60 text-base">Estimated time: 20 seconds</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <Button variant="secondary" className="rounded-full px-8 py-4 text-base">
              Cancel Generation
            </Button>
            <Button variant="create" className="rounded-full px-8 py-4 text-base" onClick={() => window.location.href = '/?focus=true'}>
              <Plus className="w-5 h-5 mr-3" />
              Create Another
            </Button>
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
