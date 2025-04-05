
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { GalleryImage } from "@/types";
import { fetchGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } from "@/services/galleryService";
import GalleryCategoryFilter from "@/components/admin/gallery/GalleryCategoryFilter";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";
import AddImageDialog from "@/components/admin/gallery/AddImageDialog";
import EditImageDialog from "@/components/admin/gallery/EditImageDialog";
import { useGallery } from "@/hooks/Gallery/useGallery";

const AdminGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // Fetch gallery images
  const { data: images = [], isLoading } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: fetchGalleryImages
  });

  // Add image mutation
  const addImageMutation = useMutation({
    mutationFn: (newImage: { image: Omit<GalleryImage, "id">, file?: File }) =>
      addGalleryImage(newImage.image, newImage.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      resetForm();
      setIsAddModalOpen(false);
      toast({
        title: "Success",
        description: "Image added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add image: ${error}`,
        variant: "destructive"
      });
    }
  });

  // Update image mutation
  const updateImageMutation = useMutation({
    mutationFn: (data: { id: string, image: Omit<GalleryImage, "id">, file?: File }) =>
      updateGalleryImage(data.id, data.image, data.file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      resetForm();
      setEditingImage(null);
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update image: ${error}`,
        variant: "destructive"
      });
    }
  });

  // Delete image mutation
  const deleteImageMutation = useMutation({
    mutationFn: (id: string) => {
      setDeletingImageId(id);
      return deleteGalleryImage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      setDeletingImageId(null);
      toast({
        title: "Deleted",
        description: "Image has been deleted",
      });
    },
    onError: (error) => {
      setDeletingImageId(null);
      toast({
        title: "Error",
        description: `Failed to delete image: ${error}`,
        variant: "destructive"
      });
    }
  });

  const filteredImages = selectedCategory === "All"
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handleAddImage = () => {
    // Validate form
    if (!title || !category || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newImage: Omit<GalleryImage, "id"> = {
      url: imageUrl,
      title,
      category,
      description: description || undefined,
      featured
    };

    addImageMutation.mutate({ image: newImage, file: imageFile || undefined });
  };

  const handleEditImage = () => {
    if (!editingImage) return;

    // Validate form
    if (!title || !category || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedImage: Omit<GalleryImage, "id"> = {
      url: imageUrl,
      title,
      category,
      description: description || undefined,
      featured
    };

    updateImageMutation.mutate({
      id: editingImage.id,
      image: updatedImage,
      file: imageFile || undefined
    });
  };

  const handleDeleteImage = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");

    if (confirmDelete) {
      deleteImageMutation.mutate(id);
    }
  };

  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setTitle(image.title);
    setCategory(image.category);
    setDescription(image.description || "");
    setImageUrl(image.url);
    setImageFile(null);
    setFeatured(image.featured || false);

  };

  const handleImageSelected = (url: string, file?: File) => {
    setImageUrl(url);
    setImageFile(file || null);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImageUrl("");
    setImageFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between" >
        <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
        <AddImageDialog
          isOpen={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          description={description}
          setDescription={setDescription}
          imageUrl={imageUrl}
          onImageSelected={handleImageSelected}
          onSubmit={handleAddImage}
          isSubmitting={addImageMutation.isPending}
          setFeatured={setFeatured}
          featured={featured}
        />
      </div>

      <GalleryCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <GalleryGrid
        images={filteredImages}
        isLoading={isLoading}
        isDeletingId={deletingImageId}
        onAddClick={() => setIsAddModalOpen(true)}
        onEditImage={openEditModal}
        onDeleteImage={handleDeleteImage}
      />

      <EditImageDialog
        editingImage={editingImage}
        onClose={() => setEditingImage(null)}
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        imageUrl={imageUrl}
        onImageSelected={handleImageSelected}
        onSubmit={handleEditImage}
        isSubmitting={updateImageMutation.isPending}
        setFeatured={setFeatured}
        featured={featured}
      />
    </div>
  );
};

export default AdminGallery;
