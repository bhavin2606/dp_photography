
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Package, Testimonial } from '@/types';
import { packages } from '@/data/packagesData';
import { testimonials } from '@/data/testimonialsData';
import { galleryImages } from '@/data/galleryData';
import { ArrowRight, Camera, Clock, Heart, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/services/packageService';
import { fetchGalleryImages } from '@/services/galleryService';
import { fetchSiteImages } from "@/services/siteImageService";
const Index = () => {
  const { data: allPackages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });
  const { data: galleryImages = [], isLoading: isgallryLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: fetchGalleryImages
  });
  const [popularPackages, setPopularPackages] = useState<Package[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);

  const [siteImages, setSiteImages] = useState<{
    mainThumbnail: string;
    aboutSectionImages: string[];
  } | null>(null);

  useEffect(() => {
    fetchSiteImages()
      .then(setSiteImages)
      .catch((err) => {
        console.error("Failed to load site images", err);
      });
  }, []);
  // useEffect(() => {
  //   // Get popular packages or first 3
  //   const popular = packages.filter(pkg => pkg.popular) || packages.slice(0, 3);
  //   setPopularPackages(popular);

  //   // Get featured testimonials (all with rating 5)
  //   const featured = testimonials.filter(testimonial => testimonial.rating === 5).slice(0, 3);
  //   setFeaturedTestimonials(featured);
  // }, []);

  useEffect(() => {
    if (allPackages.length > 0) {
      const popular = allPackages.filter(pkg => pkg.popular) || allPackages.slice(0, 3);
      setPopularPackages(popular);
    }

    // Keep using static testimonials logic
    const featured = testimonials.filter(testimonial => testimonial.rating === 5).slice(0, 3);
    setFeaturedTestimonials(featured);
  }, [allPackages]);

  // Get featured images
  const featuredImages = galleryImages
    .filter((img) => img.featured) // ✅ Only featured images
    .slice(0, 6); // ✅ Limit to top 6


  return (
    <div className="flex flex-col">
      <Hero
        title="DP Photography"
        subtitle="Capturing your precious moments with passion and creativity"
        image={siteImages?.mainThumbnail || "/fallback/main.jpg"}
        ctaText="Book Now"
        ctaLink="/booking"
        height="full"
      />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Capturing Your Story</h2>
              <p className="text-gray-700 mb-6">
                At DP Photography, we believe that every moment tells a story worth preserving.
                ...
              </p>
              <Link to="/gallery">
                <Button variant="outline" className="group">
                  Explore Our Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={siteImages?.aboutSectionImages?.[1] || "/image/about/about2.JPG"}
                  alt="Wedding Photography"
                  className="rounded-lg object-cover w-full h-4/5"
                />
              </div>
              <div className="space-y-4 pt-6">
                <img
                  src={siteImages?.aboutSectionImages?.[0] || "/image/about/about1.JPG"}
                  alt="Portrait Photography"
                  className="rounded-lg object-cover w-full h-32"
                />
                <img
                  src={siteImages?.aboutSectionImages?.[2] || "/image/about/about3.JPG"}
                  alt="Engagement Photography"
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of photography services to meet your needs. From weddings to family portraits,
              we're here to capture your special moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif mb-4">Wedding Photography</h3>
              <p className="text-gray-600 mb-6">
                Your special day deserves to be captured beautifully. We document every emotion,
                every smile, and every tear with our artistic approach.
              </p>
              <Link to="/gallery?category=Wedding" className="text-gold hover:text-gold-dark font-medium">
                View Wedding Gallery
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif mb-4">Portrait Sessions</h3>
              <p className="text-gray-600 mb-6">
                From engagements to family portraits, our portrait sessions are tailored to
                capture your unique personality and relationships.
              </p>
              <Link to="/gallery?category=Family" className="text-gold hover:text-gold-dark font-medium">
                View Portrait Gallery
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif mb-4">Event Coverage</h3>
              <p className="text-gray-600 mb-6">
                Birthdays, corporate events, baby showers, and more. We're there to document
                all the special moments of your celebration.
              </p>
              <Link to="/gallery?category=Birthday" className="text-gold hover:text-gold-dark font-medium">
                View Event Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through some of our favorite captures from recent shoots and events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="text-white text-center p-4">
                    <h3 className="font-serif text-lg">{image.title}</h3>
                    <p className="text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button>
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted photography packages designed to meet your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPackages.map((pkg) => (
              <div
                key={pkg._id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${pkg.popular ? 'border-gold' : 'border-transparent'}`}
              >
                {pkg.popular && (
                  <div className="bg-gold text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-serif mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  {pkg.price && (
                    <p className="text-2xl font-serif mb-6">₹{pkg.price.toLocaleString()}</p>
                  )}
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gold mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/booking?package=${pkg._id}`}>
                    <Button className="w-full">Book This Package</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/packages">
              <Button variant="outline">
                View All Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center space-x-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                      className="h-5 w-5"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.eventType} Photography</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-photo-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Capture Your Special Moments?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Let's create beautiful memories together. Book your session today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/booking">
              <Button className="bg-gold hover:bg-gold-dark text-white min-w-[180px]">
                Book Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 min-w-[180px]">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <a
              href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20booking%20a%20photography%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-gold transition-colors"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              <span>Or chat with us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
