import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Swords, Eye, EyeOff } from "lucide-react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";

// Custom Google Logo Component
const GoogleLogo = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Custom GitHub Logo Component
const GitHubLogo = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>
  </svg>
);

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (email: string) => void; // Add callback for successful authentication
}

const SignInDialog = ({ isOpen, onClose, onAuthSuccess }: SignInDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const isLoaded = signInLoaded && signUpLoaded;

  const extractNameFromEmail = (email: string) => {
    // Get the part before @
    const emailUsername = email.split('@')[0];
    
    // Remove numbers and common suffixes
    let name = emailUsername
      .replace(/\d+/g, '') // Remove all numbers
      .replace(/\./g, '') // Remove dots
      .replace(/_/g, '') // Remove underscores
      .replace(/-/g, '') // Remove hyphens
      .replace(/^[a-z]/, (match) => match.toUpperCase()); // Capitalize first letter
    
    // If the name is too short after cleaning, try a different approach
    if (name.length < 2) {
      // Try to find a meaningful part before numbers
      const beforeNumbers = emailUsername.match(/^([a-zA-Z]+)/);
      if (beforeNumbers && beforeNumbers[1].length >= 2) {
        name = beforeNumbers[1].charAt(0).toUpperCase() + beforeNumbers[1].slice(1);
      }
    }
    
    // If still too short, use the original username but capitalize
    if (name.length < 2) {
      name = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
    }
    
    return name;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !email.trim()) return;

    setIsLoading(true);
    setError("");
    
    try {
      if (isSignUp) {
        if (!password.trim()) {
          throw new Error("Password is required for sign up");
        }
        console.log("Creating sign up with email:", email);
        
        // Extract a proper name from the email
        const extractedName = extractNameFromEmail(email);
        console.log("Extracted name from email:", extractedName);
        
        const result = await signUp.create({
          emailAddress: email,
          password: password,
        });
        console.log("Sign up created successfully:", result);
        
        // For sign-up, we need to prepare email verification
        if (result.status === "complete") {
          // If sign-up is complete, close the dialog
          onClose();
          resetForm();
          onAuthSuccess?.(email); // Notify parent of successful authentication
          // Refresh the page immediately
          window.location.reload();
        } else {
          // Prepare email verification for sign-up
          console.log("Preparing email verification for sign-up");
          await signUp.prepareEmailAddressVerification();
          console.log("Email verification prepared");
          // Show OTP input for email verification
          setShowOtpInput(true);
        }
      } else {
        // Sign in with email and password
        if (!password.trim()) {
          throw new Error("Password is required for sign in");
        }
        console.log("Creating sign in with email and password:", email);
        const result = await signIn.create({
          identifier: email,
          password: password,
        });
        console.log("Sign in created successfully:", result);
        
        if (result.status === "complete") {
          // If sign-in is complete, close the dialog
          onClose();
          resetForm();
          onAuthSuccess?.(email); // Notify parent of successful authentication
          // Refresh the page immediately
          window.location.reload();
        } else {
          // Handle additional verification if needed
          console.log("Sign in requires additional verification");
          setError("Additional verification required. Please check your email.");
        }
      }
    } catch (error: any) {
      console.error("Error during authentication:", error);
      setError(error.message || "An error occurred. Please try again.");
      
      // Show forgot password link for password-related errors
      if (!isSignUp && error.message && (
        error.message.toLowerCase().includes('password') ||
        error.message.toLowerCase().includes('invalid') ||
        error.message.toLowerCase().includes('incorrect')
      )) {
        setShowForgotPassword(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !otp.trim()) return;

    setIsLoading(true);
    setError("");
    
    // Immediately notify parent of authentication attempt (only for sign-up)
    if (!isPasswordReset) {
      onAuthSuccess?.(email);
    }
    
    try {
      if (isPasswordReset) {
        // Handle password reset OTP
        console.log("Verifying password reset OTP:", otp);
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: otp,
        });
        
        console.log("Password reset verification successful:", result);
        
        if (result.status === "complete") {
          // Password reset successful, close dialog
          onClose();
          resetForm();
          // You might want to show a success message or redirect to password reset page
        }
      } else {
        // Handle sign-up OTP verification
        console.log("Verifying OTP for sign up:", otp);
        const result = await signUp.attemptEmailAddressVerification({
          code: otp,
        });
        console.log("Sign up verification successful:", result);
        
        if (result.status === "complete") {
          // Set the username after successful verification
          const extractedName = extractNameFromEmail(email);
          console.log("Setting username to:", extractedName);
          
          try {
            await signUp.update({
              username: extractedName,
            });
            console.log("Username updated successfully");
          } catch (updateError) {
            console.error("Error updating username:", updateError);
            // Continue even if username update fails
          }
          
          // If verification is complete, close the dialog immediately
          onClose();
          resetForm();
          // Refresh the page immediately
          window.location.reload();
        }
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setError(error.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (strategy: 'oauth_google' | 'oauth_github') => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");
    
    try {
      if (isSignUp) {
        await signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: "/",
          redirectUrlComplete: "/",
        });
      } else {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: "/",
          redirectUrlComplete: "/",
        });
      }
    } catch (error: any) {
      console.error("Error with social sign in:", error);
      setError(error.message || "Social authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!isLoaded || !email.trim()) {
      setError("Please enter your email address first");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      console.log("Initiating password reset for:", email);
      await signIn.create({
        identifier: email,
        strategy: "email_code",
      });
      
      // Show OTP input for password reset
      setShowOtpInput(true);
      setIsPasswordReset(true); // Set password reset mode
      console.log("Password reset email sent");
    } catch (error: any) {
      console.error("Error initiating password reset:", error);
      setError(error.message || "Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !otp.trim()) return;

    setIsLoading(true);
    setError("");
    
    try {
      console.log("Verifying password reset OTP:", otp);
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: otp,
      });
      
      console.log("Password reset verification successful:", result);
      
      if (result.status === "complete") {
        // Password reset successful, close dialog
        onClose();
        resetForm();
        // You might want to show a success message or redirect to password reset page
      }
    } catch (error: any) {
      console.error("Error verifying password reset OTP:", error);
      setError(error.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Hide forgot password link when user starts typing a new password
    if (showForgotPassword) {
      setShowForgotPassword(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setOtp("");
    setIsLoading(false);
    setShowOtpInput(false);
    setIsPasswordReset(false); // Reset password reset mode
    setError("");
    setShowForgotPassword(false); // Reset forgot password state
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  const goBack = () => {
    setShowOtpInput(false);
    setIsPasswordReset(false);
    setOtp("");
    setError("");
    setShowForgotPassword(false); // Reset forgot password state
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10 shadow-glass">
        <DialogHeader className="text-center space-y-6">
          <div className="w-12 h-12 bg-gradient-premium rounded-xl flex items-center justify-center mx-auto">
            <Swords className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-2xl font-['Inter'] font-bold text-foreground">
            {showOtpInput 
              ? (isPasswordReset ? "Check Email" : "Verify Email")
              : (isSignUp ? "Sign up" : "Sign in")
            }
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 px-6 pb-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          
          {showOtpInput ? (
            // OTP Form
            <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-background/50 border-white/10 backdrop-blur-sm h-12 text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
              <Button 
                type="button" 
                variant="ghost"
                onClick={goBack}
                className="w-full h-12 text-white hover:bg-white/10 transition-all duration-200"
                disabled={isLoading}
              >
                Back
              </Button>
            </form>
          ) : (
            // Email Form
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignUp ? "Create a password" : "Enter your password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="bg-background/50 border-white/10 backdrop-blur-sm h-12 text-foreground placeholder:text-muted-foreground focus:border-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {!isSignUp && showForgotPassword && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                    disabled={isLoading}
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (isSignUp ? "Signing up..." : "Signing in...") : "Continue"}
              </Button>
            </form>
          )}

          {!showOtpInput && (
            <>
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
                  onClick={() => handleSocialSignIn('oauth_google')}
                  disabled={isLoading}
                >
                  <GoogleLogo />
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-background/30 border-white/10 hover:bg-white/5 text-foreground font-medium transition-all duration-200 backdrop-blur-sm"
                  onClick={() => handleSocialSignIn('oauth_github')}
                  disabled={isLoading}
                >
                  <GitHubLogo />
                  Continue with GitHub
                </Button>
              </div>

              {/* Toggle Sign Up/In */}
              <div className="text-center pt-4">
                <span className="text-sm text-muted-foreground">
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                </span>
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </div>
            </>
          )}

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
