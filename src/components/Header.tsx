import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Menu } from "lucide-react";

const Header = () => {
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
              <Crown className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              VerseForge
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('showcase')} 
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Showcase
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('my-songs')} 
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              My Songs
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex text-foreground font-medium">
            Sign In
          </Button>
          <Button variant="create" size="lg" className="font-semibold px-6" onClick={scrollToCreate}>
            Start Creating
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;