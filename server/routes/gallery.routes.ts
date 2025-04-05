import express from "express";
import {
    createGallery,
    getAllGalleries,
    getGalleryById,
    updateGallery,
    deleteGallery
} from "../controllers/gallery.controller";
import { upload } from "../config/multer";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Either upload image OR use imageUrl in body
router.post("/", upload.single("imageFile"), asyncHandler(createGallery));
router.get("/", asyncHandler(getAllGalleries));
router.get("/:id", asyncHandler(getGalleryById));
router.put("/:id", upload.single("imageFile"), asyncHandler(updateGallery));
router.delete("/:id", asyncHandler(deleteGallery));

export default router;
