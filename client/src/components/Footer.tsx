
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Share2, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-photo-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl">DP Photography</h3>
            <p className="text-gray-300 max-w-md">
              Capturing your special moments with passion and creativity. Let us tell your story through our lens.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-gold transition-colors">
                <Share2 size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-gold transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-gold transition-colors">Packages</Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-gold transition-colors">Book Now</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                <p className="text-gray-300">123 Photography Lane, Mumbai, Maharashtra 400001</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-gold" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-gold transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-gold" />
                <a href="mailto:info@dpphotography.com" className="text-gray-300 hover:text-gold transition-colors">info@dpphotography.com</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DP Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
