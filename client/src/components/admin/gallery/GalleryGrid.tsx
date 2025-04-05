
import { GalleryImage } from "@/types";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import GalleryCard from "./GalleryCard";
import { useGallery } from "@/hooks/Gallery/useGallery";

interface GalleryGridProps {
  images: GalleryImage[];
  isLoading: boolean;
  isDeletingId: string | null;
  onAddClick: () => void;
  onEditImage: (image: GalleryImage) => void;
  onDeleteImage: (id: string) => void;
}



const GalleryGrid = ({
  images,
  isLoading,
  isDeletingId,
  onAddClick,
  onEditImage,
  onDeleteImage
}: GalleryGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images found in this category.</p>
        <Button className="mt-4" onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <GalleryCard
          key={image.id}
          image={image}
          onEdit={onEditImage}
          onDelete={onDeleteImage}
          isDeleting={isDeletingId === image.id}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
