import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swords, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SignInDialog from "./SignInDialog";
import UserProfileDropdown from "./UserProfileDropdown";

const Header = () => {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 10; // Height of the fixed header
      const elementPosition = element.offsetTop - headerHeight; // Extra 20px offset
      
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
            <button 
              onClick={() => scrollToSection('my-songs')} 
              className="text-foreground font-medium cursor-pointer px-3 py-1 relative transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0"
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
              My Songs
              <div className="underline absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 ease-out" style={{ width: '0%', transform: 'translateX(-50%)' }}></div>
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <UserProfileDropdown user={user} onSignOut={signOut} />
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
          onClose={() => setIsSignInDialogOpen(false)}
          onSignIn={signIn}
        />
      </div>
    </header>
  );
};

export default Header;