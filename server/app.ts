import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import galleryRoutes from './routes/gallery.routes';
import packageRoutes from "./routes/package.routes";
import bookingRoutes from "./routes/booking.routes";
import emailRoutes from "./routes/email.routes";
import siteImagesRouter from "./routes/siteImages.route";
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/gallery', galleryRoutes);
app.use("/api/packages", packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/site-images", siteImagesRouter);
export default app;