export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  featured?: boolean; 
}

export interface Package {
  _id: string;
  name: string;
  description: string;
  price?: number;
  category: string;
  features: string[];
  popular?: boolean;
}

export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  content: string;
  rating: number;
  image?: string;
}

export type EventType = 'Wedding' | 'Engagement' | 'Birthday' | 'Baby Shower' | 'Haldi' | 'Mehndi' | 'Corporate' | 'Family' | 'Other';

export interface GalleryImageDB {
  id: string;
  title: string;
  category: string;
  description?: string;
  image_url: string;
  is_file: boolean;
  file_path?: string;
  user_id?: string;
  created_at: string;
}
