
import { useState, useEffect } from 'react';
import { packageCategories } from '@/data/packagesData';
import { Package } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/services/packageService';


const Packages = () => {
  const { data: allPackages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const isMobile = useIsMobile();

  // useEffect(() => {
  //   // Filter packages based on selected category
  //   if (selectedCategory === 'All') {
  //     setFilteredPackages(packages);
  //   } else {
  //     setFilteredPackages(packages.filter(pkg => pkg.category === selectedCategory));
  //   }
  // }, [selectedCategory]);
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPackages(allPackages);
    } else {
      setFilteredPackages(allPackages.filter(pkg => pkg.category === selectedCategory));
    }
  }, [selectedCategory, allPackages]);

  return (
    <div className="pt-20">
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container-custom">
          <h1 className="page-header">Our Packages</h1>
          <p className="page-subheader">
            Choose from our professionally designed photography packages tailored to meet your needs.
          </p>

          {/* Category Tabs */}
          <div className="mb-12">
            {isMobile ? (
              <div className="w-full overflow-x-auto pb-4">
                <div className="flex space-x-2 min-w-max">
                  {packageCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {packageCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {packageCategories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-8">
                    {/* Content is handled via the filteredPackages state */}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${pkg.popular ? 'border-gold' : 'border-transparent'}`}
              >
                {pkg.popular && (
                  <div className="bg-gold text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-serif mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  {pkg.price && (
                    <p className="text-2xl font-serif mb-6">₹{pkg.price.toLocaleString()}</p>
                  )}
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-gold flex-shrink-0 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/booking?package=${pkg._id}`}>
                    <Button className="w-full">Book This Package</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages found in this category.</p>
            </div>
          )}

          {/* Custom Package CTA */}
          <div className="mt-16 bg-photo-dark text-white p-8 md:p-12 rounded-lg text-center">
            <h3 className="text-2xl font-serif mb-4">Need a Custom Package?</h3>
            <p className="max-w-2xl mx-auto mb-8">
              Don't see what you're looking for? We can create a customized photography package
              tailored specifically to your event and requirements.
            </p>
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-dark text-white">
                Contact Us for Custom Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
