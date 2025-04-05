
import { supabase } from "@/integrations/supabase/client";

export const uploadImageFile = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase.storage
      .from("gallery_images")
      .upload(filePath, file);
    
    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
    
    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from("gallery_images")
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in file upload:", error);
    return null;
  }
};

export const getFileFromUrl = async (url: string): Promise<File | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = url.split("/").pop() || "image.jpg";
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error("Error getting file from URL:", error);
    return null;
  }
};

export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return response.ok && contentType ? contentType.startsWith("image/") : false;
  } catch (error) {
    return false;
  }
};
