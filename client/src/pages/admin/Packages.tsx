
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { packageCategories, packages } from "@/data/packagesData";
// import { Package } from "@/types";
// import { Check, Edit, Plus, Trash2 } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

// const AdminPackages = () => {
//   const [allPackages, setAllPackages] = useState<Package[]>(packages);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [editingPackage, setEditingPackage] = useState<Package | null>(null);

//   // Form states
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [featuresText, setFeaturesText] = useState("");
//   const [isPopular, setIsPopular] = useState(false);

//   const { toast } = useToast();

//   const filteredPackages = selectedCategory === "All" 
//     ? allPackages 
//     : allPackages.filter(pkg => pkg.category === selectedCategory);

//   const handleAddPackage = () => {
//     // Validate form
//     if (!name || !description || !category || !featuresText) {
//       toast({
//         title: "Error",
//         description: "Please fill all required fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     // Parse features from textarea (one feature per line)
//     const features = featuresText.split('\n').filter(line => line.trim() !== '');

//     const newPackage: Package = {
//       id: Date.now().toString(),
//       name,
//       description,
//       price: price ? Number(price) : undefined,
//       category,
//       features,
//       popular: isPopular
//     };

//     setAllPackages([...allPackages, newPackage]);
//     resetForm();
//     setIsAddModalOpen(false);

//     toast({
//       title: "Success",
//       description: "Package added successfully",
//     });
//   };

//   const handleEditPackage = () => {
//     if (!editingPackage) return;

//     // Validate form
//     if (!name || !description || !category || !featuresText) {
//       toast({
//         title: "Error",
//         description: "Please fill all required fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     // Parse features from textarea (one feature per line)
//     const features = featuresText.split('\n').filter(line => line.trim() !== '');

//     const updatedPackages = allPackages.map(pkg => 
//       pkg.id === editingPackage.id 
//         ? { 
//             ...pkg, 
//             name, 
//             description, 
//             price: price ? Number(price) : undefined, 
//             category, 
//             features,
//             popular: isPopular
//           }
//         : pkg
//     );

//     setAllPackages(updatedPackages);
//     resetForm();
//     setEditingPackage(null);

//     toast({
//       title: "Success",
//       description: "Package updated successfully",
//     });
//   };

//   const handleDeletePackage = (id: string) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this package?");

//     if (confirmDelete) {
//       setAllPackages(allPackages.filter(pkg => pkg.id !== id));

//       toast({
//         title: "Deleted",
//         description: "Package has been deleted",
//       });
//     }
//   };

//   const openEditModal = (pkg: Package) => {
//     setEditingPackage(pkg);
//     setName(pkg.name);
//     setDescription(pkg.description);
//     setPrice(pkg.price?.toString() || "");
//     setCategory(pkg.category);
//     setFeaturesText(pkg.features.join('\n'));
//     setIsPopular(pkg.popular || false);
//   };

//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setPrice("");
//     setCategory("");
//     setFeaturesText("");
//     setIsPopular(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold tracking-tight">Package Management</h2>
//         <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add New Package
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>Add New Package</DialogTitle>
//               <DialogDescription>
//                 Create a new photography package to offer your clients.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-1 gap-2">
//                 <Label htmlFor="name">Package Name *</Label>
//                 <Input
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="e.g., Premium Wedding"
//                 />
//               </div>
//               <div className="grid grid-cols-1 gap-2">
//                 <Label htmlFor="description">Description *</Label>
//                 <Textarea
//                   id="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Describe what's included in this package"
//                   rows={3}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="price">Price (₹)</Label>
//                   <Input
//                     id="price"
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="e.g., 25000"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="category">Category *</Label>
//                   <Select value={category} onValueChange={setCategory}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {packageCategories.filter(cat => cat !== "All").map((cat) => (
//                         <SelectItem key={cat} value={cat}>
//                           {cat}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 gap-2">
//                 <Label htmlFor="features">Features (one per line) *</Label>
//                 <Textarea
//                   id="features"
//                   value={featuresText}
//                   onChange={(e) => setFeaturesText(e.target.value)}
//                   placeholder="8 hours of coverage&#10;2 photographers&#10;Online gallery"
//                   rows={5}
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="popular"
//                   checked={isPopular}
//                   onCheckedChange={setIsPopular}
//                 />
//                 <Label htmlFor="popular">Mark as popular package</Label>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleAddPackage}>
//                 Add Package
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Edit Dialog */}
//         <Dialog open={!!editingPackage} onOpenChange={(open) => !open && setEditingPackage(null)}>
//           <DialogContent className="max-w-md">
//             <DialogHeader>
//               <DialogTitle>Edit Package</DialogTitle>
//               <DialogDescription>
//                 Update the details of this package.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-1 gap-2">
//                 <Label htmlFor="edit-name">Package Name *</Label>
//                 <Input
//                   id="edit-name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="grid grid-cols-1 gap-2">
//                 <Label htmlFor="edit-description">Description *</Label>
//                 <Textarea
//                   id="edit-description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="edit-price">Price (₹)</Label>
//                   <Input
//                     id="edit-price"
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-category">Category *</Label>
//                   <Select value={category} onValueChange={setCategory}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {packageCategories.filter(cat => cat !== "All").map((cat) => (
//                         <SelectItem key={cat} value={cat}>
//                           {cat}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 gap-2">
//                 <Label htmlFor="edit-features">Features (one per line) *</Label>
//                 <Textarea
//                   id="edit-features"
//                   value={featuresText}
//                   onChange={(e) => setFeaturesText(e.target.value)}
//                   rows={5}
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="edit-popular"
//                   checked={isPopular}
//                   onCheckedChange={setIsPopular}
//                 />
//                 <Label htmlFor="edit-popular">Mark as popular package</Label>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setEditingPackage(null)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleEditPackage}>
//                 Save Changes
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Packages Categories Filter */}
//       <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
//         <TabsList className="mb-6">
//           {packageCategories.map((category) => (
//             <TabsTrigger key={category} value={category}>
//               {category}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>

//       {/* Packages Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPackages.map((pkg) => (
//           <Card key={pkg.id} className={`overflow-hidden ${pkg.popular ? 'border-gold' : ''}`}>
//             {pkg.popular && (
//               <div className="bg-gold text-white text-center py-1 text-xs">
//                 Popular Package
//               </div>
//             )}
//             <CardContent className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="font-medium text-lg">{pkg.name}</h3>
//                   <p className="text-sm text-muted-foreground">{pkg.category}</p>
//                 </div>
//                 <div className="flex gap-1">
//                   <Button variant="ghost" size="icon" onClick={() => openEditModal(pkg)}>
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => handleDeletePackage(pkg.id)}>
//                     <Trash2 className="h-4 w-4 text-destructive" />
//                   </Button>
//                 </div>
//               </div>

//               <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>

//               {pkg.price && (
//                 <p className="text-lg font-medium mb-3">₹{pkg.price.toLocaleString()}</p>
//               )}

//               <div className="space-y-2 mt-4">
//                 <p className="text-sm font-medium">Features:</p>
//                 <ul className="space-y-1">
//                   {pkg.features.map((feature, index) => (
//                     <li key={index} className="flex items-start text-sm">
//                       <Check className="h-4 w-4 text-gold mr-2 flex-shrink-0 mt-0.5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredPackages.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-muted-foreground">No packages found in this category.</p>
//           <Button className="mt-4" onClick={() => setIsAddModalOpen(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Package
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPackages;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { packageCategories, packages } from "@/data/packagesData";
import { Package } from "@/types";
import { Check, Edit, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createPackage, updatePackage, deletePackage, fetchPackages } from "@/services/packageService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AdminPackages = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: allPackages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const addPackageMutation = useMutation({
    mutationFn: (pkg: Omit<Package, "id">) => createPackage(pkg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast({ title: "Success", description: "Package added" });
      resetForm();
      setIsAddModalOpen(false);
    },
    onError: (err) => toast({ title: "Error", description: String(err), variant: "destructive" }),
  });

  const editPackageMutation = useMutation({
    mutationFn: ({ _id, data }: { _id: string; data: Omit<Package, "_id"> }) =>
      updatePackage(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast({ title: "Updated", description: "Package updated" });
      resetForm();
      setEditingPackage(null);
    },
    onError: (error) =>
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      }),
  });


  const deletePackageMutation = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast({ title: "Deleted", description: "Package deleted" });
    },
    onError: (err) => toast({ title: "Error", description: String(err), variant: "destructive" }),
  });

  const filteredPackages = selectedCategory === "All"
    ? allPackages
    : allPackages.filter(pkg => pkg.category === selectedCategory);

  const handleAddPackage = () => {
    if (!name || !description || !category || !featuresText) {
      return toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
    }
    const features = featuresText.split("\n").filter(Boolean);
    const newPackage = { name, description, price: +price, category, features, popular: isPopular };
    addPackageMutation.mutate(newPackage);
  };

  const handleEditPackage = () => {
    if (!editingPackage) return;
    if (!name || !description || !category || !featuresText) {
      return toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
    }
    const features = featuresText.split("\n").filter(Boolean);
    const updatedPackage = { name, description, price: +price, category, features, popular: isPopular };
    editPackageMutation.mutate({
      _id: editingPackage!._id,
      data: {
        name,
        description,
        category,
        price: Number(price),
        features: featuresText.split("\n").filter((line) => line.trim() !== ""),
        popular: isPopular,
      },
    });

  };

  const handleDeletePackage = (id: string) => {
    if (confirm("Are you sure to delete?")) deletePackageMutation.mutate(id);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setName(pkg.name);
    setDescription(pkg.description);
    setPrice(String(pkg.price || ""));
    setCategory(pkg.category);
    setFeaturesText(pkg.features.join("\n"));
    setIsPopular(pkg.popular || false);
  };

  const resetForm = () => {
    setName(""); setDescription(""); setPrice("");
    setCategory(""); setFeaturesText(""); setIsPopular(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Package Management</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Package</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Package</DialogTitle>
            </DialogHeader>
            <DialogBody
              name={name} setName={setName}
              description={description} setDescription={setDescription}
              price={price} setPrice={setPrice}
              category={category} setCategory={setCategory}
              featuresText={featuresText} setFeaturesText={setFeaturesText}
              isPopular={isPopular} setIsPopular={setIsPopular}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPackage}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="mb-6">
          {packageCategories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map(pkg => (
          <Card key={pkg.id} className={pkg.popular ? "border-gold" : ""}>
            {pkg.popular && (
              <div className="bg-gold text-white text-xs text-center py-1">Popular</div>
            )}
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium">{pkg.name}</h3>
                  <p className="text-sm text-muted">{pkg.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEditModal(pkg)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeletePackage(pkg._id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
              <p className="text-sm mt-2 text-muted">{pkg.description}</p>
              {pkg.price && <p className="font-semibold mt-2">₹{pkg.price.toLocaleString()}</p>}
              <ul className="mt-4 space-y-1 text-sm">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start"><Check className="h-4 w-4 mr-2 text-gold" />{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {!!editingPackage && (
        <Dialog open onOpenChange={(open) => !open && setEditingPackage(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Edit Package</DialogTitle></DialogHeader>
            <DialogBody
              name={name} setName={setName}
              description={description} setDescription={setDescription}
              price={price} setPrice={setPrice}
              category={category} setCategory={setCategory}
              featuresText={featuresText} setFeaturesText={setFeaturesText}
              isPopular={isPopular} setIsPopular={setIsPopular}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingPackage(null)}>Cancel</Button>
              <Button onClick={handleEditPackage}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Optional: Refactor Dialog body into a separate component if needed
const DialogBody = ({
  name, setName, description, setDescription, price, setPrice,
  category, setCategory, featuresText, setFeaturesText, isPopular, setIsPopular
}: any) => (
  <div className="grid gap-4 py-4">
    <Label htmlFor="name">Package Name *</Label>
    <Input id="name" value={name} onChange={e => setName(e.target.value)} />
    <Label htmlFor="desc">Description *</Label>
    <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="cat">Category *</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            {packageCategories.filter(c => c !== "All").map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    <Label htmlFor="features">Features *</Label>
    <Textarea id="features" value={featuresText} onChange={e => setFeaturesText(e.target.value)} rows={4} />
    <div className="flex gap-2 items-center">
      <Switch id="popular" checked={isPopular} onCheckedChange={setIsPopular} />
      <Label htmlFor="popular">Mark as Popular</Label>
    </div>
  </div>
);

export default AdminPackages;