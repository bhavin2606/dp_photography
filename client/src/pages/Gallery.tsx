
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { galleryCategories } from '@/data/galleryData';
import { GalleryImage } from '@/types';
import Lightbox from '@/components/LightBox';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { fetchGalleryImages } from '@/services/galleryService';
import { Loader2 } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Fetch gallery images
  const { data: images = [], isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: fetchGalleryImages
  });
  console.log(images,"image");
  
  useEffect(() => {
    // Get category from URL query params if present
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && galleryCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);
  
  useEffect(() => {
    // Filter images based on selected category
    if (selectedCategory === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(image => image.category === selectedCategory));
    }
  }, [selectedCategory, images]);
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  return (
    <div className="pt-20">
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container-custom">
          <h1 className="page-header">Our Gallery</h1>
          <p className="page-subheader">
            Browse through our collection of photographs from various events and sessions.
          </p>
          
          {/* Category Tabs */}
          <div className="mb-8">
            {isMobile ? (
              <div className="w-full overflow-x-auto pb-4">
                <div className="flex space-x-2 min-w-max">
                  {galleryCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {galleryCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {galleryCategories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-8">
                    {/* Content is handled via the filteredImages state */}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-gold" />
            </div>
          )}
          
          {/* Gallery Grid */}
          {!isLoading && (
            <div className="gallery-grid animate-fade-in">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="gallery-item rounded-lg overflow-hidden"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
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
          )}
          
          {!isLoading && filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No images found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Lightbox Component */}
      <Lightbox 
        images={filteredImages.map(img => img.url)}
        titles={filteredImages.map(img => img.title)}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default Gallery;
