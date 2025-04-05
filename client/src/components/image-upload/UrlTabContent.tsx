
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidImageUrl } from "@/utils/fileUpload";
import { useToast } from "@/components/ui/use-toast";

interface UrlTabContentProps {
  initialImageUrl?: string;
  onImageSelected: (imageUrl: string) => void;
}

const UrlTabContent = ({ initialImageUrl = "", onImageSelected }: UrlTabContentProps) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [urlError, setUrlError] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { toast } = useToast();

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setUrlError("");
    
    // Basic URL validation
    if (url && !url.match(/^https?:\/\/.+\..+/)) {
      setUrlError("Please enter a valid URL");
      return;
    }
    
    // If URL is not empty and passes basic validation, set it as preview
    if (url) {
      onImageSelected(url);
    } else {
      onImageSelected("");
    }
  };

  const handleUrlValidate = async () => {
    if (!imageUrl) {
      setUrlError("Please enter an image URL");
      return;
    }
    
    setIsValidating(true);
    const isValid = await isValidImageUrl(imageUrl);
    setIsValidating(false);
    
    if (isValid) {
      setUrlError("");
      onImageSelected(imageUrl);
      toast({
        title: "Valid image URL",
        description: "The URL has been verified and is valid.",
      });
    } else {
      setUrlError("The URL does not point to a valid image");
      toast({
        title: "Invalid image URL",
        description: "Please check the URL and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="imageUrl">Image URL</Label>
      <div className="flex gap-2">
        <Input
          id="imageUrl"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={handleUrlChange}
          className={urlError ? "border-red-500" : ""}
        />
        <Button 
          type="button" 
          onClick={handleUrlValidate}
          disabled={isValidating || !imageUrl}
        >
          {isValidating ? "Validating..." : "Validate"}
        </Button>
      </div>
      {urlError && <p className="text-sm text-red-500">{urlError}</p>}
    </div>
  );
};

export default UrlTabContent;
