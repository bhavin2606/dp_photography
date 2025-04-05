
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { testimonials } from "@/data/testimonialsData";
import { Testimonial } from "@/types";
import { Star, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminTestimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("5");
  const [imageUrl, setImageUrl] = useState("");
  
  const { toast } = useToast();
  
  const handleAddTestimonial = () => {
    // Validate form
    if (!name || !eventType || !content) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name,
      eventType,
      content,
      rating: Number(rating),
      image: imageUrl || undefined
    };
    
    setAllTestimonials([...allTestimonials, newTestimonial]);
    resetForm();
    setIsAddModalOpen(false);
    
    toast({
      title: "Success",
      description: "Testimonial added successfully",
    });
  };
  
  const handleEditTestimonial = () => {
    if (!editingTestimonial) return;
    
    // Validate form
    if (!name || !eventType || !content) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedTestimonials = allTestimonials.map(testimonial => 
      testimonial.id === editingTestimonial.id 
        ? { 
            ...testimonial, 
            name, 
            eventType, 
            content, 
            rating: Number(rating),
            image: imageUrl || undefined
          }
        : testimonial
    );
    
    setAllTestimonials(updatedTestimonials);
    resetForm();
    setEditingTestimonial(null);
    
    toast({
      title: "Success",
      description: "Testimonial updated successfully",
    });
  };
  
  const handleDeleteTestimonial = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this testimonial?");
    
    if (confirmDelete) {
      setAllTestimonials(allTestimonials.filter(testimonial => testimonial.id !== id));
      
      toast({
        title: "Deleted",
        description: "Testimonial has been deleted",
      });
    }
  };
  
  const openEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setName(testimonial.name);
    setEventType(testimonial.eventType);
    setContent(testimonial.content);
    setRating(testimonial.rating.toString());
    setImageUrl(testimonial.image || "");
  };
  
  const resetForm = () => {
    setName("");
    setEventType("");
    setContent("");
    setRating("5");
    setImageUrl("");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Testimonial Management</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>
                Add a new client testimonial to showcase on your website.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Priya & Rahul"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Engagement">Engagement</SelectItem>
                    <SelectItem value="Pre-Wedding">Pre-Wedding</SelectItem>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="content">Testimonial Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What did the client say about your services?"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="rating">Rating *</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <span className="mr-2">5</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center">
                        <span className="mr-2">4</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center">
                        <span className="mr-2">3</span>
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="imageUrl">Client Photo URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL to client's photo"
                />
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Preview:</p>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=?";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTestimonial}>
                Add Testimonial
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Dialog */}
        <Dialog open={!!editingTestimonial} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
              <DialogDescription>
                Update the details of this testimonial.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-name">Client Name *</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-eventType">Event Type *</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Engagement">Engagement</SelectItem>
                    <SelectItem value="Pre-Wedding">Pre-Wedding</SelectItem>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-content">Testimonial Content *</Label>
                <Textarea
                  id="edit-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-rating">Rating *</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">
                      <div className="flex items-center">
                        <span className="mr-2">5</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center">
                        <span className="mr-2">4</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center">
                        <span className="mr-2">3</span>
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-imageUrl">Client Photo URL (Optional)</Label>
                <Input
                  id="edit-imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Preview:</p>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=?";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditTestimonial}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allTestimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <span className="text-gray-500">{testimonial.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.eventType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEditModal(testimonial)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                  <Trash2 className="h-4 w-4 mr-1 text-destructive" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {allTestimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No testimonials found.</p>
          <Button className="mt-4" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
