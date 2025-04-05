
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LightboxProps {
  images: string[];
  titles?: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox = ({ images, titles, initialIndex, isOpen, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="relative h-full">
          <img
            src={images[currentIndex]}
            alt={titles ? titles[currentIndex] : `Image ${currentIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
          
          {titles && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center">
              <p className="font-serif">{titles[currentIndex]}</p>
            </div>
          )}
        </div>
        
        <button
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70",
            images.length <= 1 && "hidden"
          )}
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70",
            images.length <= 1 && "hidden"
          )}
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
