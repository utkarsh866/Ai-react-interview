import { UserButton } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MockUserButton } from "@/provider/mock-auth-provider";
import { useAuthSafe } from "@/handlers/auth-handler";

export const ProfileContainer = () => {
  // Check if we're in development mode with mock credentials
  const isDevelopmentMode = import.meta.env.DEV &&
    (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_mock_clerk_key_12345' ||
     !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  // Use our safe auth hook
  const { isSignedIn, isLoaded } = useAuthSafe();

  if (!isLoaded) {
    return (
      <div className="flex items-center">
        <Loader className="min-w-4 min-h-4 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {isSignedIn ? (
        isDevelopmentMode ? (
          <MockUserButton afterSignOutUrl="/" />
        ) : (
          <UserButton afterSignOutUrl="/" />
        )
      ) : (
        <Link to={"/signin"}>
          <Button size={"sm"}>Get Started</Button>
        </Link>
      )}
    </div>
  );
};
