import express from "express";
import { sendEmail } from "../controllers/email.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/send", asyncHandler(sendEmail));

export default router;
