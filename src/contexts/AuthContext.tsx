import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  avatar?: string;
  signInMethod: 'email' | 'google' | 'github' | 'apple';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, method: 'email' | 'google' | 'github' | 'apple') => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, method: 'email' | 'google' | 'github' | 'apple') => {
    // In a real app, this would handle actual authentication
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      name: method === 'email' ? 'User' : 'NITYAM',
      email: email || 'nixxspeaks@gmail.com',
      signInMethod: method,
    };
    
    setUser(mockUser);
    
    // Store in localStorage for persistence across sessions
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    
    console.log(`Signed in with ${method}:`, mockUser);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    console.log('User signed out');
  };

  // Check for existing session on mount
  useState(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_user');
      }
    }
  });

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
