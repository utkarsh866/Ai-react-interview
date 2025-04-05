import { SignUp } from "@clerk/clerk-react";
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
console.info(`SignUp using ${usesMockAuth ? 'mock' : 'Clerk'} authentication`);

// Custom sign-up form for development mode
const MockSignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get the mock auth context
  const { signIn } = useMockAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false);
      signIn(); // Use the mock auth signIn function
      toast.success('Account created successfully');
      navigate('/generate');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg relative z-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-gray-600 mt-2">Sign up to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

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
            placeholder="Create a password"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <div className="text-center text-sm mt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-emerald-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>

      <div className="text-center text-xs mt-6 text-gray-500">
        <p>Development Mode - Any credentials will work</p>
      </div>
    </div>
  );
};

export const SignUpPage = () => {
  return usesMockAuth ? (
    <MockSignUpForm />
  ) : (
    <SignUp path="/signup" />
  );
};
