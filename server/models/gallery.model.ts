import { url } from "inspector";
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Wedding",
            "Engagement",
            "Pre-Wedding",
            "Birthday",
            "Baby Shower",
            "Haldi",
            "Mehndi",
            "Corporate",
            "Family",
        ],
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    imageFilePath: {
        type: String, // for uploaded image file path
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

export const Gallery = mongoose.model("Gallery", gallerySchema);