import express from "express";
import {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} from "../controllers/package.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/", createPackage);
router.get("/", getAllPackages);
router.get("/:id", asyncHandler(getPackageById));
router.put("/:id", asyncHandler(updatePackage));
router.delete("/:id", asyncHandler(deletePackage));

export default router;
