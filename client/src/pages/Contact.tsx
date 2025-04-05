import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Instagram, Facebook, Share2, MapPin, Phone, Mail } from 'lucide-react';
import Hero from '@/components/Hero';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be a fetch call to the backend API
      console.log({
        name,
        email,
        message
      });

      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
    }, 1500);
  };

  return (
    <div className="pt-20">
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with us."
        image="/image/TWK07096.JPG"
        overlay={true}
        height="medium"
      />

      <div className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-gold mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      123 Photography Lane<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-gold mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-gold mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@dpphotography.com" className="hover:text-gold transition-colors">
                        info@dpphotography.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gold hover:text-white p-3 rounded-full transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gold hover:text-white p-3 rounded-full transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gold hover:text-white p-3 rounded-full transition-colors"
                      aria-label="Pinterest"
                    >
                      <Share2 className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-3">Working Hours</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>10:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>By Appointment Only</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-serif text-center mb-8">Find Us</h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59399.891277823146!2d70.90740272394989!3d21.488393201042342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be29d9d5ad43ea5%3A0x1149bd361ea61e2d!2sBagasara%2C%20Gujarat%20365440!5e0!3m2!1sen!2sin!4v1743876406755!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DP Photography Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
