import React, { createContext, useContext, useState } from 'react';

// Define the shape of our auth context
interface MockAuthContextProps {
  isSignedIn: boolean;
  isLoaded: boolean;
  userId: string | null;
  signIn: () => void;
  signOut: () => void;
}

// Create the context with default values
const MockAuthContext = createContext<MockAuthContextProps>({
  isSignedIn: false,
  isLoaded: true,
  userId: null,
  signIn: () => {},
  signOut: () => {},
});

// Create a hook to use the auth context
export const useMockAuth = () => useContext(MockAuthContext);

// Create the provider component
export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(true); // Default to signed in for development
  const [userId] = useState('dev-mock-user-id');

  // Mock sign in function
  const signIn = () => {
    setIsSignedIn(true);
    console.log('Mock sign in successful');
  };

  // Mock sign out function
  const signOut = () => {
    setIsSignedIn(false);
    console.log('Mock sign out successful');
  };

  // Create the value object
  const value = {
    isSignedIn,
    isLoaded: true,
    userId,
    signIn,
    signOut,
  };

  // Provide the context to children
  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
};

// Create a mock UserButton component
export const MockUserButton: React.FC<{ afterSignOutUrl?: string }> = () => {
  const { signOut } = useMockAuth();
  
  return (
    <button 
      onClick={signOut}
      className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center"
    >
      <span className="text-xs font-bold">DEV</span>
    </button>
  );
};
