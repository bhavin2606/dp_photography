
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryCategories } from "@/data/galleryData";

interface GalleryCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const GalleryCategoryFilter = ({ selectedCategory, onCategoryChange }: GalleryCategoryFilterProps) => {
  return (
    <Tabs defaultValue={selectedCategory} onValueChange={onCategoryChange}>
      <TabsList className="mb-6">
        {galleryCategories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default GalleryCategoryFilter;
