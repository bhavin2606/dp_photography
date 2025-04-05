
// import { supabase } from "@/integrations/supabase/client";
// import { GalleryImage, GalleryImageDB } from "@/types";
// import { uploadImageFile } from "@/utils/fileUpload";

// const API_URL = import.meta.env.VITE_API_BASE_URL + "/gallery"; // Use your .env file

// export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
//   const { data, error } = await supabase
//     .from("gallery_images")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Error fetching gallery images:", error);
//     return [];
//   }

//   return (data as GalleryImageDB[]).map((image) => ({
//     id: image.id,
//     url: image.image_url,
//     title: image.title,
//     category: image.category,
//     description: image.description,
//   }));
// };

// export const addGalleryImage = async (
//   image: Omit<GalleryImage, "id">,
//   file?: File
// ): Promise<GalleryImage | null> => {
//   try {
//     let imageUrl = image.url;
//     let isFile = false;
//     let filePath = null;

//     // If a file is provided, upload it to storage
//     if (file) {
//       imageUrl = await uploadImageFile(file) as string;
//       isFile = true;
//       filePath = imageUrl.split("/").pop();
//     }

//     // Insert the image data into the database
//     const { data, error } = await supabase
//       .from("gallery_images")
//       .insert([
//         {
//           title: image.title,
//           category: image.category,
//           description: image.description,
//           image_url: imageUrl,
//           is_file: isFile,
//           file_path: filePath,
//         },
//       ])
//       .select();

//     if (error) {
//       console.error("Error adding gallery image:", error);
//       return null;
//     }

//     const newImage = data[0] as GalleryImageDB;
//     return {
//       id: newImage.id,
//       url: newImage.image_url,
//       title: newImage.title,
//       category: newImage.category,
//       description: newImage.description,
//     };
//   } catch (error) {
//     console.error("Error in addGalleryImage:", error);
//     return null;
//   }
// };

// export const updateGalleryImage = async (
//   id: string,
//   image: Omit<GalleryImage, "id">,
//   file?: File
// ): Promise<GalleryImage | null> => {
//   try {
//     let imageUrl = image.url;
//     let isFile = false;
//     let filePath = null;

//     // If a file is provided, upload it to storage
//     if (file) {
//       imageUrl = await uploadImageFile(file) as string;
//       isFile = true;
//       filePath = imageUrl.split("/").pop();
//     }

//     // Update the image data in the database
//     const { data, error } = await supabase
//       .from("gallery_images")
//       .update({
//         title: image.title,
//         category: image.category,
//         description: image.description,
//         image_url: imageUrl,
//         is_file: isFile,
//         file_path: filePath,
//       })
//       .eq("id", id)
//       .select();

//     if (error) {
//       console.error("Error updating gallery image:", error);
//       return null;
//     }

//     const updatedImage = data[0] as GalleryImageDB;
//     return {
//       id: updatedImage.id,
//       url: updatedImage.image_url,
//       title: updatedImage.title,
//       category: updatedImage.category,
//       description: updatedImage.description,
//     };
//   } catch (error) {
//     console.error("Error in updateGalleryImage:", error);
//     return null;
//   }
// };

// export const deleteGalleryImage = async (id: string): Promise<boolean> => {
//   // Get the image details to check if it's a file
//   const { data: imageData } = await supabase
//     .from("gallery_images")
//     .select("is_file, file_path")
//     .eq("id", id)
//     .single();

//   // Delete the image record from the database
//   const { error } = await supabase
//     .from("gallery_images")
//     .delete()
//     .eq("id", id);

//   if (error) {
//     console.error("Error deleting gallery image:", error);
//     return false;
//   }

//   // If it was a file, delete it from storage
//   if (imageData?.is_file && imageData?.file_path) {
//     const { error: storageError } = await supabase.storage
//       .from("gallery_images")
//       .remove([imageData.file_path]);

//     if (storageError) {
//       console.error("Error deleting file from storage:", storageError);
//       // Continue anyway as the database record is deleted
//     }
//   }

//   return true;
// };

import { GalleryImage } from "@/types";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/gallery"; // Use your .env file

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Failed to fetch images");
  const data = await res.json();
  return data.map((item: any) => ({
    id: item._id,
    url: item.imageUrl,
    title: item.title,
    category: item.category,
    description: item.description,
    featured: item.featured || false, // ✅ Ensure it's part of the object
  }));
};

export const addGalleryImage = async (
  image: Omit<GalleryImage, "id">,
  file?: File
): Promise<GalleryImage> => {
  const formData = new FormData();
  formData.append("title", image.title);
  formData.append("category", image.category);
  if (image.description) formData.append("description", image.description);
  if (typeof image.featured !== "undefined") formData.append("featured", String(image.featured)); // 🔥 Add this

  if (file) formData.append("imageFile", file);
  else formData.append("imageUrl", image.url);

  const res = await fetch(`${API_URL}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to add image");
  const data = await res.json();

  return {
    id: data._id,
    url: data.imageUrl,
    title: data.title,
    category: data.category,
    description: data.description,
    featured: data.featured, // make sure your GalleryImage type supports this
  };
};


export const updateGalleryImage = async (
  id: string,
  image: Omit<GalleryImage, "id">,
  file?: File
): Promise<GalleryImage> => {
  const formData = new FormData();
  formData.append("title", image.title);
  formData.append("category", image.category);
  if (image.description) {
    formData.append("description", image.description);
  }
  if (typeof image.featured !== "undefined") formData.append("featured", String(image.featured)); // 🔥 Add this

  if (file) {
    formData.append("imageFile", file);
  } else {
    formData.append("imageUrl", image.url);
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || "Failed to update image");
  }

  const data = await res.json();

  return {
    id: data._id,
    url: data.imageUrl,
    title: data.title,
    category: data.category,
    description: data.description,
    featured: data.featured,
  };
};



export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete image");

  return true;
};
