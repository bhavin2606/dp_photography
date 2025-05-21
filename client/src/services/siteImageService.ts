const SITE_IMAGES_API = import.meta.env.VITE_API_BASE_URL + "/site-images";

export interface SiteImages {
    mainThumbnail: string;
    aboutSectionImages: string[];
}

type InputType = {
    mainThumbnail?: File | string;
    about1?: File | string;
    about2?: File | string;
    about3?: File | string;
};

// GET site images
export const fetchSiteImages = async (): Promise<SiteImages | null> => {
    const res = await fetch(SITE_IMAGES_API);
    if (!res.ok) throw new Error("Failed to fetch site images");
    return res.json();
};

// UPDATE (with optional file or URL for each)
export const updateSiteImages = async (images: InputType): Promise<SiteImages> => {
    const formData = new FormData();

    // Handle main thumbnail
    if (images.mainThumbnail instanceof File) {
        formData.append("mainThumbnail", images.mainThumbnail);
    } else if (typeof images.mainThumbnail === "string") {
        formData.append("mainThumbnailUrl", images.mainThumbnail);
    }

    // Handle about 1
    if (images.about1 instanceof File) {
        formData.append("about1", images.about1);
    } else if (typeof images.about1 === "string") {
        formData.append("about1Url", images.about1);
    }

    // Handle about 2
    if (images.about2 instanceof File) {
        formData.append("about2", images.about2);
    } else if (typeof images.about2 === "string") {
        formData.append("about2Url", images.about2);
    }

    // Handle about 3
    if (images.about3 instanceof File) {
        formData.append("about3", images.about3);
    } else if (typeof images.about3 === "string") {
        formData.append("about3Url", images.about3);
    }

    const res = await fetch(SITE_IMAGES_API, {
        method: "PUT",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Failed to update site images");
    }

    return res.json();
};
