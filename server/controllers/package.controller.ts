import { Request, Response } from "express";
import { PhotographyPackage } from "../models/package.model";

// CREATE
export const createPackage = async (req: Request, res: Response) => {
    try {
        const newPackage = new PhotographyPackage(req.body);
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(500).json({ message: "Failed to create package", error });
    }
};

// READ ALL
export const getAllPackages = async (_req: Request, res: Response) => {
    try {
        const packages = await PhotographyPackage.find().sort({ createdAt: -1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch packages", error });
    }
};

// READ ONE
export const getPackageById = async (req: Request, res: Response) => {
    try {
        const pack = await PhotographyPackage.findById(req.params.id);
        if (!pack) return res.status(404).json({ message: "Package not found" });
        res.json(pack);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch package", error });
    }
};

// UPDATE
export const updatePackage = async (req: Request, res: Response) => {
    try {
        const updated = await PhotographyPackage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Package not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update package", error });
    }
};

// DELETE
export const deletePackage = async (req: Request, res: Response) => {
    try {
        const deleted = await PhotographyPackage.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Package not found" });
        res.json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete package", error });
    }
};
