
import { useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileTabContentProps {
  onImageSelected: (imageUrl: string, file: File) => void;
}

const FileTabContent = ({ onImageSelected }: FileTabContentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    const objectUrl = URL.createObjectURL(file);
    onImageSelected(objectUrl, file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="imageFile">Upload Image</Label>
      <Input
        id="imageFile"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button 
        type="button" 
        onClick={triggerFileInput}
        variant="outline" 
        className="w-full h-20 border-dashed"
      >
        <ImagePlus className="mr-2 h-5 w-5" />
        Click to select image
      </Button>
    </div>
  );
};

export default FileTabContent;
