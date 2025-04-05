
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import UrlTabContent from "./image-upload/UrlTabContent";
import FileTabContent from "./image-upload/FileTabContent";
import ImagePreview from "./image-upload/ImagePreview";

interface ImageUploadProps {
  initialImageUrl?: string;
  onImageSelected: (imageUrl: string, file?: File) => void;
}

const ImageUpload = ({ initialImageUrl = "", onImageSelected }: ImageUploadProps) => {
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url");
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);
  const { toast } = useToast();

  const handleImageSelected = (url: string, file?: File) => {
    setPreviewUrl(url);
    onImageSelected(url, file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    onImageSelected("");
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "url" | "upload")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">
            <Link className="mr-2 h-4 w-4" />
            Image URL
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="url">
          <UrlTabContent onImageSelected={handleImageSelected} initialImageUrl={initialImageUrl} />
        </TabsContent>
        
        <TabsContent value="upload">
          <FileTabContent onImageSelected={handleImageSelected} />
        </TabsContent>
      </Tabs>
      
      {previewUrl && (
        <ImagePreview imageUrl={previewUrl} onRemove={handleRemoveImage} />
      )}
    </div>
  );
};

export default ImageUpload;
