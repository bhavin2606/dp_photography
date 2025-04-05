import { Package } from "@/types";
// const API_URL = `${import.meta.env.VITE_API_URL}/api/packages`;
const API_URL = import.meta.env.VITE_API_BASE_URL + "/packages"; // Use your .env file

export const fetchPackages = async (): Promise<Package[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch packages");
    return res.json();
};

export const createPackage = async (pkg: Omit<Package, "id">): Promise<Package> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pkg),
    });
    if (!res.ok) throw new Error("Failed to create package");
    return res.json();
};

// packageService.ts

export const updatePackage = async (_id: string, data: Omit<Package, "_id">): Promise<Package> => {
    const res = await fetch(`${API_URL}/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update package");
    return await res.json();
};


export const deletePackage = async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete package");
};

