import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/services/packageService';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { packages } from '@/data/packagesData';
import { Package } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { createBooking } from "@/services/bookingService";

const Booking = () => {
  const { data: allPackages = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
  });

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { toast } = useToast();
  const locationHook = useLocation();

  // useEffect(() => {
  //   // Check if package ID is in URL query params
  //   const params = new URLSearchParams(locationHook.search);
  //   const packageId = params.get('package');

  //   if (packageId) {
  //     const pkg = packages.find(p => p._id === packageId);
  //     if (pkg) {
  //       setSelectedPackage(pkg);
  //       setEventType(pkg.category);
  //     }
  //   }
  // }, [locationHook.search]);
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const packageId = params.get('package');

    if (packageId && allPackages.length > 0) {
      const pkg = allPackages.find(p => p._id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
        setEventType(pkg.category);
      }
    }
  }, [locationHook.search, allPackages]);


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validate form
  //   if (!name || !email || !phone || !eventType || !date || !location) {
  //     toast({
  //       title: "Error",
  //       description: "Please fill all required fields",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   // Email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     toast({
  //       title: "Invalid Email",
  //       description: "Please enter a valid email address",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   // Phone validation (basic)
  //   const phoneRegex = /^\d{10}$/;
  //   if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
  //     toast({
  //       title: "Invalid Phone Number",
  //       description: "Please enter a valid 10-digit phone number",
  //       variant: "destructive"
  //     });
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     // In a real app, this would be a fetch call to the backend API
  //     console.log({
  //       name,
  //       email,
  //       phone,
  //       eventType,
  //       date,
  //       location,
  //       message,
  //       packageId: selectedPackage?._id
  //     });

  //     setIsSubmitting(false);
  //     setSubmitted(true);

  //     toast({
  //       title: "Booking Submitted!",
  //       description: "We'll contact you shortly to confirm your booking",
  //     });
  //   }, 1500);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields here (you already have it)

    setIsSubmitting(true);

    try {
      const bookingPayload = {
        name,
        email,
        phone,
        eventType,
        date: date?.toISOString() || "", // Convert to ISO format
        location,
        message,
        packageId: selectedPackage?._id,
      };

      const res = await createBooking(bookingPayload);

      console.log("Booking submitted successfully:", res);
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your booking",
      });

      setSubmitted(true);
    } catch (error: any) {
      toast({
        title: "Error submitting booking",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20">
        <div className="bg-gray-50 py-16 md:py-24 min-h-[80vh] flex items-center">
          <div className="container-custom max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-serif mb-4">Booking Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for booking with DP Photography. We've received your request and will
                contact you shortly to confirm the details.
              </p>
              <Button asChild className="w-full">
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container-custom max-w-5xl">
          <h1 className="page-header">Book Your Session</h1>
          <p className="page-subheader">
            Fill out the form below to book your photography session. We'll get back to you
            within 24 hours to confirm your booking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select value={eventType} onValueChange={setEventType} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wedding">Wedding</SelectItem>
                          <SelectItem value="Engagement">Engagement</SelectItem>
                          <SelectItem value="Pre-Wedding">Pre-Wedding</SelectItem>
                          <SelectItem value="Birthday">Birthday</SelectItem>
                          <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                          <SelectItem value="Haldi">Haldi</SelectItem>
                          <SelectItem value="Mehndi">Mehndi</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Family">Family</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="date">Event Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        placeholder="Event location"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any special requests or details about your event"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Book Now"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Selected Package / Contact Info */}
            <div>
              {selectedPackage ? (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-serif mb-2">Selected Package</h3>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <h4 className="font-medium">{selectedPackage.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedPackage.category} Package</p>
                    {selectedPackage.price && (
                      <p className="font-serif">₹{selectedPackage.price.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-lg font-serif mb-2">No Package Selected</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You haven't selected a package yet. You can still book a session and
                    discuss package options later.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/packages">View Packages</a>
                  </Button>
                </div>
              )}

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-serif mb-4">Have Questions?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We're here to help! Feel free to contact us if you have any questions about
                  our packages or services.
                </p>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    <a href="tel:+919876543210" className="text-gold">+91 98765 43210</a>
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    <a href="mailto:info@dpphotography.com" className="text-gold">info@dpphotography.com</a>
                  </p>
                  <p>
                    <span className="font-medium">WhatsApp:</span>{" "}
                    <a
                      href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20booking%20a%20photography%20session."
                      className="text-gold"
                    >
                      Message us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
