import { Request, Response } from "express";
import { SiteImages } from "../models/siteImages.model";
import { supabase } from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || "galleryimages";

const uploadToSupabase = async (file: Express.Multer.File, folder: string) => {
    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4()}${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, fs.readFileSync(file.path), {
            contentType: file.mimetype,
        });

    fs.unlinkSync(file.path); // delete temp file

    if (uploadError) throw new Error("Supabase upload failed");

    const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrlData?.publicUrl;
};

export const updateSiteImages = async (req: Request, res: Response) => {
    try {
        const {
            mainThumbnailUrl,
            about1Url,
            about2Url,
            about3Url,
        } = req.body;

        const files = req.files as Record<string, Express.Multer.File[]>;

        // Either file OR URL
        const mainThumbnail = files?.mainThumbnail?.[0]
            ? await uploadToSupabase(files.mainThumbnail[0], "site")
            : mainThumbnailUrl;

        const about1 = files?.about1?.[0]
            ? await uploadToSupabase(files.about1[0], "site")
            : about1Url;

        const about2 = files?.about2?.[0]
            ? await uploadToSupabase(files.about2[0], "site")
            : about2Url;

        const about3 = files?.about3?.[0]
            ? await uploadToSupabase(files.about3[0], "site")
            : about3Url;

        const updated = await SiteImages.findOneAndUpdate(
            {},
            {
                mainThumbnail,
                aboutSectionImages: [about1, about2, about3],
            },
            { upsert: true, new: true }
        );

        return res.json(updated);
    } catch (error) {
        console.error("Site images update failed:", error);
        return res.status(500).json({ error: "Failed to update site images" });
    }
};

export const getSiteImages = async (_req: Request, res: Response) => {
    try {
        const data = await SiteImages.findOne().sort({ createdAt: -1 });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: "Fetch failed" });
    }
};
