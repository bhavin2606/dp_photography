import express from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    updateBookingStatus
} from '../controllers/booking.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/', createBooking); // POST /api/bookings
router.get('/', getBookings); // GET /api/bookings
router.get('/:id', asyncHandler(getBookingById)); // GET /api/bookings/:id
router.patch('/:id', asyncHandler(updateBookingStatus)); // PATCH /api/bookings/:id

export default router;
