import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message Sent", {
        description: "We'll get back to you as soon as possible!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex-col w-full py-12">
      <Container>
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-700 mb-8">
              Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact information to get in touch.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <p className="text-gray-600">123 Innovation Drive, Tech City, CA 94043</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-600">support@aimockinterview.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
