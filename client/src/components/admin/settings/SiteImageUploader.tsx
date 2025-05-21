import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ImageUpload";

type SiteImageUploaderProps = {
    label: string;
    imageUrl: string | File;
    onImageSelected: (fileOrUrl: File | string) => void;
};

const SiteImageUploader = ({ label, imageUrl, onImageSelected }: SiteImageUploaderProps) => {
    // If it's a File, generate a preview URL using URL.createObjectURL
    const previewUrl = typeof imageUrl === "string" ? imageUrl : URL.createObjectURL(imageUrl);

    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <ImageUpload initialImageUrl={previewUrl} onImageSelected={onImageSelected} />
        </div>
    );
};

export default SiteImageUploader;
