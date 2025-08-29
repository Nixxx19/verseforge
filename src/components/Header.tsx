import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swords, Menu } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import SignInDialog from "./SignInDialog";
import UserProfileDropdown from "./UserProfileDropdown";

const Header = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [tempUserEmail, setTempUserEmail] = useState<string | null>(null);

  // Update user profile visibility when authentication state changes
  useEffect(() => {
    console.log("Header - Auth state changed:", { isSignedIn, isLoaded, hasUser: !!user });
    if (isLoaded) {
      const shouldShowProfile = isSignedIn && !!user;
      setShowUserProfile(shouldShowProfile);
      console.log("Header - Setting showUserProfile to:", shouldShowProfile);
      
      // Clear temporary email when real user data is loaded
      if (user && tempUserEmail) {
        setTempUserEmail(null);
      }
    }
  }, [isSignedIn, isLoaded, user, tempUserEmail]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Height of the fixed header (h-20 = 80px)
      let extraOffset = -25; // Default negative offset to scroll further into the section
      
      // Special case for showcase - scroll even further down
      if (sectionId === 'showcase') {
        extraOffset = -70; // Much more negative offset for showcase
      }
      
      // Special case for reviews - scroll even further down
      if (sectionId === 'testimonials') {
        extraOffset = -36; // Much more negative offset for testimonials
      }
      
      // Special case for my-songs - scroll even further down
      if (sectionId === 'my-songs') {
        extraOffset = -40; // Much more negative offset for my-songs
      }
      
      const elementPosition = element.offsetTop - headerHeight - extraOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToCreate = () => {
    const element = document.getElementById('create');
    if (element) {
      const headerHeight = 10; // Height of the fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Force refresh when dialog closes
  const handleSignInDialogClose = () => {
    console.log("Header - Sign in dialog closed");
    setIsSignInDialogOpen(false);
    // Force a small delay to ensure Clerk state is updated
    setTimeout(() => {
      console.log("Header - Checking auth state after dialog close:", { isSignedIn, isLoaded });
    }, 100);
  };

  // Handle successful authentication
  const handleAuthSuccess = (email?: string) => {
    console.log("Header - Authentication attempt started, showing user profile immediately");
    setIsSignInDialogOpen(false);
    // Set temporary user email for immediate visual feedback
    if (email) {
      setTempUserEmail(email);
    }
    // Immediately show user profile when OTP is submitted
    setShowUserProfile(true);
    // Force immediate state check
    setTimeout(() => {
      console.log("Header - Auth success - checking state:", { isSignedIn, isLoaded, hasUser: !!user });
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
            <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              VerseForge
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
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
              Features
              <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
            </button>
            <button 
              onClick={() => scrollToSection('showcase')} 
              className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
              onMouseEnter={(e) => {
                const button = e.currentTarget;
                const underline = button.querySelector('.underline') as HTMLElement;
                if (underline) {
                  underline.style.width = '82%';
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
              Showcase
              <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
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
              Reviews
              <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
            </button>

          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoaded && showUserProfile ? (
            <UserProfileDropdown tempEmail={tempUserEmail} />
          ) : (
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex text-white font-medium px-3.5 h-11 border border-white/10 backdrop-blur-sm transition-all duration-300 rounded-md focus:outline-none focus:ring-0 focus-visible:ring-0"
              onClick={() => setIsSignInDialogOpen(true)}
              onMouseEnter={(e) => {
                const button = e.currentTarget;
                button.style.borderColor = '#667eea';
                button.style.background = 'transparent';
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget;
                button.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                button.style.background = 'transparent';
              }}
            >
              Sign In
            </Button>
          )}
          <Button 
            variant="ghost" 
            className="font-semibold px-3.5 h-11 border border-white/10 backdrop-blur-sm transition-all duration-300 rounded-md focus:outline-none focus:ring-0 focus-visible:ring-0 text-white" 
            onClick={scrollToCreate}
            onMouseEnter={(e) => {
              const button = e.currentTarget;
              button.style.borderColor = '#667eea';
              button.style.background = 'transparent';
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget;
              button.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              button.style.background = 'transparent';
            }}
          >
            Start Creating
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <SignInDialog 
          isOpen={isSignInDialogOpen}
          onClose={handleSignInDialogClose}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </header>
  );
};

export default Header;