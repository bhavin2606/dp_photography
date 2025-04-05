import { Request, Response } from "express";
import { transporter } from "../utils/mailer";

export const sendEmail = async (req: Request, res: Response) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Email sent successfully",
            info,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to send email",
            error,
        });
    }
};
