import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicLayout } from "@/layouts/public-layout";
import AuthenticationLayout from "@/layouts/auth-layout";
import ProtectRoutes from "@/layouts/protected-routes";
import { MainLayout } from "@/layouts/main-layout";

import HomePage from "@/routes/home";
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";
import { Generate } from "./components/generate";
import { Dashboard } from "./routes/dashboard";
import { CreateEditPage } from "./routes/create-edit-page";
import { MockLoadPage } from "./routes/mock-load-page";
import { MockInterviewPage } from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";
import { MockAuthProvider } from "./provider/mock-auth-provider";

// Check if we're using mock credentials (in any environment)
const useMockAuth = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'pk_test_mock_clerk_key_12345' ||
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Log authentication mode for debugging
console.info(`App using ${useMockAuth ? 'mock' : 'Clerk'} authentication`);

const App = () => {
  // Define the routes configuration
  const appRoutes = (
    <Routes>
      {/* public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Route>

      {/* authentication layout */}
      <Route element={<AuthenticationLayout />}>
        <Route path="/signin/*" element={<SignInPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
      </Route>

      {/* protected routes */}
      <Route
        element={
          <ProtectRoutes>
            <MainLayout />
          </ProtectRoutes>
        }
      >
        {/* add all the protect routes */}
        <Route element={<Generate />} path="/generate">
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateEditPage />} />
          <Route path=":interviewId" element={<CreateEditPage />} />
          <Route path="interview/:interviewId" element={<MockLoadPage />} />
          <Route
            path="interview/:interviewId/start"
            element={<MockInterviewPage />}
          />
          <Route path="feedback/:interviewId" element={<Feedback />} />
        </Route>
      </Route>
    </Routes>
  );

  // Render the app with the appropriate wrapper based on authentication mode
  return (
    <Router>
      {useMockAuth ? (
        <MockAuthProvider>{appRoutes}</MockAuthProvider>
      ) : (
        appRoutes
      )}
    </Router>
  );
};

export default App;
