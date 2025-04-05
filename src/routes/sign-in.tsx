import { SignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMockAuth } from "@/provider/mock-auth-provider";

// Check if we're using mock credentials (in any environment)
const usesMockAuth = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_mock_clerk_key_12345' ||
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Log authentication mode for debugging
console.info(`SignIn using ${usesMockAuth ? 'mock' : 'Clerk'} authentication`);

// Custom sign-in form for development mode
const MockSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get the mock auth context
  const { signIn } = useMockAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      signIn(); // Use the mock auth signIn function
      toast.success('Signed in successfully');
      navigate('/generate');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg relative z-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center text-sm mt-4">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-emerald-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>

      <div className="text-center text-xs mt-6 text-gray-500">
        <p>Development Mode - Any credentials will work</p>
      </div>
    </div>
  );
};

export const SignInPage = () => {
  return usesMockAuth ? (
    <MockSignInForm />
  ) : (
    <SignIn path="/signin" />
  );
};
