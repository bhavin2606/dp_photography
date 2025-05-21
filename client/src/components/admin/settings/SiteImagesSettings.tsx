"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SiteImageUploader from "@/components/admin/settings/SiteImageUploader";
import { fetchSiteImages, updateSiteImages } from "@/services/siteImageService";

const SiteImagesSettings = () => {
    const [mainThumb, setMainThumb] = useState<string | File>("");
    const [about1, setAbout1] = useState<string | File>("");
    const [about2, setAbout2] = useState<string | File>("");
    const [about3, setAbout3] = useState<string | File>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await fetchSiteImages();
                setMainThumb(data.mainThumbnail || "");
                setAbout1(data.aboutSectionImages?.[0] || "");
                setAbout2(data.aboutSectionImages?.[1] || "");
                setAbout3(data.aboutSectionImages?.[2] || "");
            } catch (err) {
                console.error("Failed to load site images", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await updateSiteImages({
                mainThumbnail: mainThumb,
                about1,
                about2,
                about3,
            });

            alert("Images saved successfully!");
        } catch (err) {
            console.error("Failed to save images", err);
            alert("Something went wrong while saving.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold">Site Images Settings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SiteImageUploader label="Main Website Thumbnail" imageUrl={mainThumb} onImageSelected={setMainThumb} />
                <SiteImageUploader label="About Section Image 1" imageUrl={about1} onImageSelected={setAbout1} />
                <SiteImageUploader label="About Section Image 2" imageUrl={about2} onImageSelected={setAbout2} />
                <SiteImageUploader label="About Section Image 3" imageUrl={about3} onImageSelected={setAbout3} />
            </div>

            <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Images"}
            </Button>
        </div>
    );
};

export default SiteImagesSettings;
