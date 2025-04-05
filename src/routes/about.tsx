import { Container } from "@/components/container";

const AboutPage = () => {
  return (
    <div className="flex-col w-full py-12">
      <Container>
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Welcome to AI Mock Interview, the cutting-edge platform designed to transform your interview preparation experience. We combine the power of artificial intelligence with proven interview techniques to help you excel in your job interviews.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to democratize interview preparation by making high-quality practice accessible to everyone. We believe that with the right preparation, anyone can succeed in landing their dream job.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
            <li>AI-powered mock interviews tailored to your specific job role</li>
            <li>Detailed feedback on your responses to help you improve</li>
            <li>Industry-specific question banks covering a wide range of positions</li>
            <li>Personalized improvement suggestions based on your performance</li>
            <li>A safe, judgment-free environment to practice and build confidence</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Our Technology</h2>
          <p className="text-lg text-gray-700">
            We leverage state-of-the-art AI models to analyze your responses, providing insights that would be impossible with traditional mock interview methods. Our platform continuously learns and improves to offer you the most relevant and helpful feedback.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Join Us Today</h2>
          <p className="text-lg text-gray-700">
            Start your journey to interview success with AI Mock Interview. Whether you're a fresh graduate or a seasoned professional, our platform will help you prepare effectively and boost your confidence for your next interview.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
