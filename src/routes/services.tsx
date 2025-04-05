import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  title,
  description,
  features,
  isPremium = false,
}: {
  title: string;
  description: string;
  features: string[];
  isPremium?: boolean;
}) => {
  return (
    <Card className={`${isPremium ? "border-emerald-500 shadow-lg" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title} {isPremium && <Sparkles className="h-5 w-5 text-emerald-500" />}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to="/generate" className="w-full">
          <Button className={`w-full ${isPremium ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}>
            Get Started
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const ServicesPage = () => {
  return (
    <div className="flex-col w-full py-12">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We offer a range of AI-powered interview preparation services to help you succeed in your job search journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Basic Mock Interviews"
            description="Perfect for beginners looking to practice interview skills"
            features={[
              "5 AI-generated interview questions",
              "Basic feedback on your responses",
              "Industry-specific questions",
              "Text-based feedback",
              "Unlimited attempts"
            ]}
          />
          
          <ServiceCard
            title="Professional Package"
            description="Comprehensive interview preparation for serious job seekers"
            features={[
              "10 AI-generated interview questions",
              "Detailed feedback with improvement suggestions",
              "Role-specific technical questions",
              "Audio and text response options",
              "Performance analytics",
              "Interview recording capability"
            ]}
            isPremium
          />
          
          <ServiceCard
            title="Career Coaching"
            description="Personalized guidance for career advancement"
            features={[
              "All Professional Package features",
              "One-on-one sessions with career experts",
              "Resume and cover letter review",
              "Personalized interview strategy",
              "Salary negotiation tips",
              "Follow-up guidance"
            ]}
          />
        </div>
        
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Custom Enterprise Solutions</h2>
          <p className="text-lg text-gray-700 mb-6">
            Looking for a tailored solution for your organization? We offer custom interview preparation platforms for educational institutions, recruitment agencies, and corporations.
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact Us for Details</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
