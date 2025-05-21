
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { galleryCategories } from "@/data/galleryData";
import { GalleryImage } from "@/types";
import ImageUpload from "@/components/ImageUpload";
import { Switch } from "@/components/ui/switch";

interface EditImageDialogProps {
  editingImage: GalleryImage | null;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  description: string;
  setDescription: (description: string) => void;
  imageUrl: string;
  onImageSelected: (url: string, file?: File) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  featured: boolean;
  setFeatured: (val: boolean) => void;
}

const EditImageDialog = ({
  editingImage,
  onClose,
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDescription,
  imageUrl,
  onImageSelected,
  onSubmit,
  isSubmitting, featured, setFeatured
}: EditImageDialogProps) => {
  return (
    <Dialog open={!!editingImage} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl max-h-[740px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Update the details of this gallery image.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="edit-title">Image Title *</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="edit-category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {galleryCategories.filter(cat => cat !== "All").map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label>Image *</Label>
            <ImageUpload
              initialImageUrl={imageUrl}
              onImageSelected={onImageSelected}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="featured">Featured</Label>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
          </div>

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditImageDialog;
