import { Request, Response } from 'express';
import { Booking } from '../models/booking.model';
import { transporter } from "../utils/mailer";

// Create new booking
export const createBooking = async (req: Request, res: Response) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

        // Send you an email with the booking details
        await transporter.sendMail({
            from: `"DP Photography" <${process.env.EMAIL_USER}>`,
            to: process.env.NOTIFY_EMAIL,
            subject: `📸 New Booking Inquiry - ${booking.name}`,
            html: `
          <h2>New Booking Request</h2>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Event Type:</strong> ${booking.eventType}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Location:</strong> ${booking.location}</p>
          ${booking.message
                    ? `<p><strong>Message:</strong> ${booking.message}</p>`
                    : ""
                }
          ${booking.packageId
                    ? `<p><strong>Selected Package ID:</strong> ${booking.packageId}</p>`
                    : ""
                }
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        `,
        });

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: "Failed to create booking", error: err });
    }
};

// Get all bookings
export const getBookings = async (_req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};

// Get single booking by ID
export const getBookingById = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch booking', error });
    }
};

// Update booking status
export const updateBookingStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Booking not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update booking', error });
    }
};
