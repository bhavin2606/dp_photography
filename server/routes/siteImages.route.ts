import express from "express";
import { getSiteImages, updateSiteImages } from "../controllers/siteImages.controller";
import { asyncHandler } from "../utils/asyncHandler";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", asyncHandler(getSiteImages));

router.put(
    "/",
    upload.fields([
        { name: "mainThumbnail", maxCount: 1 },
        { name: "about1", maxCount: 1 },
        { name: "about2", maxCount: 1 },
        { name: "about3", maxCount: 1 },
    ]),
    asyncHandler(updateSiteImages)
);

export default router;
