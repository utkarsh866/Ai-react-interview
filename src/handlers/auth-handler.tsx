import { LoaderPage } from "@/routes/loader-page";
import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import { useMockAuth as useMockAuthHook } from "@/provider/mock-auth-provider";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dataService from "@/services/data.service";

// Check if we're using mock credentials (in any environment)
const shouldUseMockAuth = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_mock_clerk_key_12345' ||
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Log authentication mode for debugging
console.info(`AuthHandler using ${shouldUseMockAuth ? 'mock' : 'Clerk'} authentication`);

// Custom hook to safely use auth in both development and production
export function useAuthSafe() {
  // Use mock auth when needed
  const mockAuthContext = useMockAuthHook();

  // Only try to use Clerk auth if we have valid credentials
  let clerkAuth: { isSignedIn: boolean; isLoaded: boolean; userId: string | null } = { isSignedIn: false, isLoaded: true, userId: null };
  let clerkUser: { user: any } = { user: null };

  try {
    if (!shouldUseMockAuth) {
      const auth = useClerkAuth();
      clerkAuth = {
        isSignedIn: !!auth.isSignedIn,
        isLoaded: !!auth.isLoaded,
        userId: auth.userId || null
      };

      const userInfo = useClerkUser();
      clerkUser = {
        user: userInfo.user || null
      };
    }
  } catch (error) {
    console.log('Error using Clerk auth, falling back to mock auth:', error);
  }

  return {
    isSignedIn: shouldUseMockAuth ? mockAuthContext.isSignedIn : clerkAuth.isSignedIn,
    isLoaded: shouldUseMockAuth ? mockAuthContext.isLoaded : clerkAuth.isLoaded,
    userId: shouldUseMockAuth ? mockAuthContext.userId : clerkAuth.userId,
    user: shouldUseMockAuth ? {
      id: mockAuthContext.userId || 'dev-user',
      fullName: 'Development User',
      firstName: 'Development',
      imageUrl: '',
      primaryEmailAddress: { emailAddress: 'dev@example.com' }
    } : clerkUser.user
  };
};

const AuthHanlder = () => {
  // Use our safe auth hook
  const { isSignedIn, user } = useAuthSafe();

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          // Check if user exists
          const existingUser = await dataService.getUser(user.id);

          // If user doesn't exist, create a new user
          if (!existingUser) {
            const userData = {
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl || "",
            };

            await dataService.setUser(user.id, userData);
          }
        } catch (error) {
          console.log("Error on storing the user data : ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user, pathname, navigate]);

  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHanlder;
