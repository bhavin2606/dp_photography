import { Booking } from "@/types";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/bookings";

// 🟢 Fetch all bookings
export const fetchBookings = async (): Promise<Booking[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch bookings");

    const data = await res.json();
    return data;
};

// 🟢 Create a new booking
export const createBooking = async (
    booking: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!res.ok) throw new Error("Failed to create booking");

    const data = await res.json();
    return {
        id: data._id,
        ...data,
    };
};

// 🟢 Update booking status (PATCH)
export const updateBookingStatus = async (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
): Promise<Booking> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Failed to update status");

    const data = await res.json();
    return {
        id: data._id,
        ...data,
    };
};

// 🟢 Get single booking by ID
export const fetchBookingById = async (id: string): Promise<Booking> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch booking");

    const data = await res.json();
    return {
        id: data._id,
        ...data,
    };
};

// 🟢 Delete booking (optional)
export const deleteBooking = async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete booking");

    return true;
};
