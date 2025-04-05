
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

const ImagePreview = ({ imageUrl, onRemove }: ImagePreviewProps) => {
  return (
    <div className="relative mt-4">
      <div className="aspect-square w-full max-h-[300px] overflow-hidden rounded-md border bg-gray-100">
        <img 
          src={imageUrl} 
          alt="Preview" 
          className="w-full h-full object-contain"
          onError={() => {
            console.error("Failed to load image");
            onRemove();
          }}
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 rounded-full"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImagePreview;
