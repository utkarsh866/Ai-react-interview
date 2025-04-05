import { LoaderPage } from "@/routes/loader-page";
import { User } from "@/types";
import { useAuth as useClerkAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import { useMockAuth } from "@/provider/mock-auth-provider";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dataService from "@/services/data.service";

// Custom hook to safely use auth in both development and production
export const useAuthSafe = () => {
  // Check if we're in development mode with mock credentials
  const isDevelopmentMode = import.meta.env.DEV &&
    (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_mock_clerk_key_12345' ||
     !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  // Use mock auth in development mode
  const mockAuth = useMockAuth();

  // Only try to use Clerk auth if not in development mode
  let clerkAuth = { isSignedIn: false, isLoaded: true, userId: null };
  let clerkUser = { user: null };

  try {
    if (!isDevelopmentMode) {
      clerkAuth = useClerkAuth();
      clerkUser = useClerkUser();
    }
  } catch (error) {
    console.log('Using mock auth in development mode');
  }

  return {
    isSignedIn: isDevelopmentMode ? mockAuth.isSignedIn : clerkAuth.isSignedIn,
    userId: isDevelopmentMode ? mockAuth.userId : clerkAuth.userId,
    user: isDevelopmentMode ? {
      id: mockAuth.userId || 'dev-user',
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
