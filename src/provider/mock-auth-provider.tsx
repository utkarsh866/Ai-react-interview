import React, { createContext, useContext, useState, useEffect } from 'react';

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
  // Check if user is already signed in from localStorage
  const storedAuthState = localStorage.getItem('mockAuthState');
  const initialAuthState = storedAuthState ? JSON.parse(storedAuthState) : { isSignedIn: false };

  const [isSignedIn, setIsSignedIn] = useState(initialAuthState.isSignedIn);
  const [userId, setUserId] = useState(isSignedIn ? 'dev-mock-user-id' : null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('mockAuthState', JSON.stringify({ isSignedIn }));

    if (isSignedIn) {
      setUserId('dev-mock-user-id');
    } else {
      setUserId(null);
    }
  }, [isSignedIn]);

  // Mock sign in function
  const signIn = () => {
    setIsSignedIn(true);
    console.log('Mock sign in successful');
  };

  // Mock sign out function
  const signOut = () => {
    setIsSignedIn(false);
    console.log('Mock sign out successful');

    // Redirect to home page after sign out
    window.location.href = '/';
  };

  // Create the value object
  const value = {
    isSignedIn,
    isLoaded,
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
      aria-label="Sign out"
      title="Sign out (Development Mode)"
    >
      <span className="text-xs font-bold">DEV</span>
    </button>
  );
};
