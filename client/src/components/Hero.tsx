
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  height?: 'full' | 'large' | 'medium' | 'small';
  className?: string;
}

const Hero = ({
  title,
  subtitle,
  image,
  ctaText = "View Gallery",
  ctaLink = "/gallery",
  overlay = true,
  height = 'full',
  className,
}: HeroProps) => {
  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]',
    small: 'min-h-[50vh]',
  };

  return (
    <div 
      className={cn(
        'relative w-full flex items-center justify-center overflow-hidden opacity-60',
        heightClasses[height],
        className
      )}
    >
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      )}
      
      <div className="container-custom relative z-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          {title}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
          {subtitle}
        </p>
        
        {ctaText && (
          <Link 
            to={ctaLink} 
            className="inline-flex items-center px-6 py-3 rounded border-2 border-white hover:bg-white hover:text-photo-dark transition-all duration-300 animate-fade-up font-medium"
            style={{ animationDelay: '600ms' }}
          >
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
