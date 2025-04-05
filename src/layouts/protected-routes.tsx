import { LoaderPage } from "@/routes/loader-page";
import { Navigate } from "react-router-dom";
import { useAuthSafe } from "@/handlers/auth-handler";

// Development mode check is handled in the auth hook

const ProtectRoutes = ({ children }: { children: React.ReactNode }) => {
  // Use our safe auth hook
  const { isLoaded, isSignedIn } = useAuthSafe();

  if (!isLoaded) {
    return <LoaderPage />;
  }

  // Redirect to sign-in page if not signed in
  if (!isSignedIn) {
    return <Navigate to={"/signin"} replace />;
  }

  return children;
};

export default ProtectRoutes;
