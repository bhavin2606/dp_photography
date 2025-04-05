import { Request, Response } from "express";
import { Gallery } from "../models/gallery.model";
import { supabase } from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || "galleryimages";

// CREATE
export const createGallery = async (req: Request, res: Response) => {
  try {
    const { title, category, description, imageUrl, featured } = req.body;
    const file = req.file;

    if (!imageUrl && !file) {
      return res.status(400).json({ error: "Either image URL or file is required" });
    }

    if (imageUrl && file) {
      return res.status(400).json({ error: "Provide either image URL or image upload, not both." });
    }

    let uploadedUrl: string | undefined = imageUrl;

    if (file) {
      const ext = path.extname(file.originalname);
      const fileName = `${uuidv4()}${ext}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, fs.readFileSync(file.path), {
          contentType: file.mimetype,
        });

      fs.unlinkSync(file.path);

      if (uploadError) {
        return res.status(500).json({ message: "Failed to upload to Supabase", error: uploadError });
      }

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      uploadedUrl = publicUrlData?.publicUrl;
    }

    const newEntry = new Gallery({
      title,
      category,
      description,
      imageUrl: uploadedUrl,
      featured: featured ?? false,
    });

    await newEntry.save();
    return res.status(201).json(newEntry);

  } catch (err) {
    console.error("Create gallery error:", err);
    return res.status(500).json({ message: "Failed to create entry", error: err });
  }
};

// READ ALL
export const getAllGalleries = async (_req: Request, res: Response) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    return res.json(galleries);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch gallery items", details: error });
  }
};

// READ ONE
export const getGalleryById = async (req: Request, res: Response) => {
  try {
    const entry = await Gallery.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Not found" });
    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch gallery item", details: error });
  }
};

// UPDATE
export const updateGallery = async (req: Request, res: Response) => {
  try {
    const { title, category, description, imageUrl, featured } = req.body;

    const file = req.file;

    if (imageUrl && file) {
      return res.status(400).json({ error: "Provide only one image source" });
    }

    let uploadedUrl: string | undefined = imageUrl;

    if (file) {
      const ext = path.extname(file.originalname);
      const fileName = `${uuidv4()}${ext}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, fs.readFileSync(file.path), {
          contentType: file.mimetype,
        });

      fs.unlinkSync(file.path);

      if (uploadError) {
        return res.status(500).json({ message: "Failed to upload to Supabase", error: uploadError });
      }

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      uploadedUrl = publicUrlData?.publicUrl;
    }

    // const updated = await Gallery.findByIdAndUpdate(
    // req.params.id,
    // {
    // title,
    // category,
    // description,
    // imageUrl: uploadedUrl,
    // },
    // { new: true }
    // );

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        description,
        imageUrl: uploadedUrl,
        ...(typeof featured !== "undefined" && { featured }), // only update if present
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Update failed", details: error });
  }
};

// DELETE
export const deleteGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Not found" });

    const publicUrl = gallery.imageUrl;
    if (publicUrl?.includes("supabase")) {
      const parts = publicUrl.split("/");
      const filePath = parts.slice(-2).join("/"); // gallery/filename.ext
      await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    }

    await gallery.deleteOne();
    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Delete failed", details: error });
  }
};
