
import { GalleryImage } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface GalleryCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const GalleryCard = ({ image, onEdit, onDelete, isDeleting }: GalleryCardProps) => {
  return (
    <Card key={image.id} className="overflow-hidden">
      <div className="relative aspect-square">
        <img 
          src={image.url} 
          alt={image.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm">{image.title}</h3>
            <p className="text-xs text-muted-foreground">{image.category}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(image)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(image.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryCard;
