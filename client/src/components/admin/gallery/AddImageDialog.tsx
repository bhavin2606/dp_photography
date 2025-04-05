
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { galleryCategories } from "@/data/galleryData";
import ImageUpload from "@/components/ImageUpload";
import { Switch } from "@/components/ui/switch";

interface AddImageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

const AddImageDialog = ({
  isOpen,
  onOpenChange,
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
}: AddImageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle>Add New Image</DialogTitle>
          <DialogDescription>
            Add a new image to your gallery collection. You can enter a URL or upload an image file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="title">Image Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="category">Category *</Label>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description"
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

          <Label htmlFor="featured">Featured</Label>

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>Add Image</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddImageDialog;
