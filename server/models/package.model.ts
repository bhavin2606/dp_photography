import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: [
                "Wedding",
                "Engagement",
                "Pre-Wedding",
                "Birthday",
                "Baby Shower",
                "Corporate",
                "Family",
            ],
        },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        features: [{ type: String }],
        popular: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const PhotographyPackage = mongoose.model("Package", packageSchema);
