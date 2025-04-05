import { LoaderPage } from "@/routes/loader-page";
import { Navigate } from "react-router-dom";
import { useAuthSafe } from "@/handlers/auth-handler";

const ProtectRoutes = ({ children }: { children: React.ReactNode }) => {
  // Use our safe auth hook
  const { isLoaded, isSignedIn } = useAuthSafe();

  // For development purposes - check if we're using a dummy key
  const isDevelopmentMode = import.meta.env.DEV &&
    (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_mock_clerk_key_12345' ||
     !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  if (!isLoaded) {
    return <LoaderPage />;
  }

  // In development mode with mock keys, allow access even when not signed in
  if (!isSignedIn && !isDevelopmentMode) {
    return <Navigate to={"/signin"} replace />;
  }

  return children;
};

export default ProtectRoutes;
