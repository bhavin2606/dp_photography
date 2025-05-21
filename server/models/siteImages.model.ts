import mongoose from "mongoose";

const siteImagesSchema = new mongoose.Schema({
    mainThumbnail: { type: String },
    aboutSectionImages: { type: [String], default: [] },
}, { timestamps: true });


export const SiteImages = mongoose.model("SiteImages", siteImagesSchema);
