import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  message: { type: String },
  packageId: { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);
