import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Chrome, Mail, Swords } from "lucide-react";

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, method: 'email' | 'google' | 'github' | 'apple') => void;
}

const SignInDialog = ({ isOpen, onClose, onSignIn }: SignInDialogProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSignIn(email, 'email');
      onClose();
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && firstName.trim() && lastName.trim()) {
      onSignIn(email, 'email');
      onClose();
    }
  };

  const handleSocialSignIn = (method: 'google' | 'github' | 'apple') => {
    onSignIn("", method);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10 shadow-glass">
        <DialogHeader className="text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-premium rounded-xl flex items-center justify-center mx-auto">
            <Swords className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-2xl font-display font-bold text-foreground">
            {isSignUp ? "Sign up" : "Sign in"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 px-6 pb-6">
          {/* Email Form */}
          <form onSubmit={isSignUp ? handleSignUpSubmit : handleEmailSubmit} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm text-muted-foreground">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-background/50 border-white/10 backdrop-blur-sm h-12 text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm text-muted-foreground">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-background/50 border-white/10 backdrop-blur-sm h-12 text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-white/10 backdrop-blur-sm h-12 text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-200"
            >
              Continue
            </Button>
          </form>

          {/* Separator */}
          <div className="relative">
            <Separator className="bg-white/10" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
              OR
            </span>
          </div>

          {/* Social Sign In Options */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-background/30 border-white/10 hover:bg-white/5 text-foreground font-medium transition-all duration-200 backdrop-blur-sm"
              onClick={() => handleSocialSignIn('google')}
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>
          </div>

          {/* Toggle Sign Up/In */}
          <div className="text-center pt-4">
            <span className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </div>

          {/* Terms */}
          <div className="text-center text-xs text-muted-foreground pt-2">
            <span>Terms of Service and Privacy Policy</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
