
import { Package } from "@/types";

export const packageCategories = [
  "All",
  "Wedding",
  "Engagement",
  "Pre-Wedding",
  "Birthday",
  "Baby Shower",
  "Corporate",
  "Family"
];

export const packages: Package[] = [
  {
    id: "1",
    name: "Essential Wedding",
    description: "Capture the essential moments of your special day with our basic wedding package.",
    price: 45000,
    category: "Wedding",
    features: [
      "8 hours of coverage",
      "1 photographer",
      "150+ edited digital photos",
      "Online gallery for 3 months",
      "10 printed photos (8×10)"
    ]
  },
  {
    id: "2",
    name: "Premium Wedding",
    description: "Our most popular wedding package with comprehensive coverage of your special day.",
    price: 75000,
    category: "Wedding",
    features: [
      "12 hours of coverage",
      "2 photographers",
      "300+ edited digital photos",
      "Online gallery for 6 months",
      "Wedding photo album (20 pages)",
      "Engagement photoshoot session",
      "20 printed photos (8×10)"
    ],
    popular: true
  },
  {
    id: "3",
    name: "Luxury Wedding",
    description: "The ultimate wedding package with everything you need to document your wedding journey.",
    price: 125000,
    category: "Wedding",
    features: [
      "Full day coverage (up to 16 hours)",
      "3 photographers",
      "500+ edited digital photos",
      "Online gallery for 12 months",
      "Premium wedding album (30 pages)",
      "Engagement photoshoot session",
      "Pre-wedding video (3-5 minutes)",
      "Wedding highlights video (10-15 minutes)",
      "30 printed photos (8×10)"
    ]
  },
  {
    id: "4",
    name: "Engagement Session",
    description: "Celebrate your engagement with a professional photoshoot.",
    price: 15000,
    category: "Engagement",
    features: [
      "2 hours of coverage",
      "1 photographer",
      "75+ edited digital photos",
      "Online gallery for 3 months",
      "5 printed photos (8×10)",
      "1 location"
    ]
  },
  {
    id: "5",
    name: "Pre-Wedding Package",
    description: "Create memories before your big day with our pre-wedding photoshoot package.",
    price: 25000,
    category: "Pre-Wedding",
    features: [
      "4 hours of coverage",
      "1 photographer",
      "100+ edited digital photos",
      "Online gallery for 3 months",
      "10 printed photos (8×10)",
      "2 locations",
      "Basic styling assistance"
    ]
  },
  {
    id: "6",
    name: "Birthday Celebration",
    description: "Perfect for capturing birthday parties and special celebrations.",
    price: 12000,
    category: "Birthday",
    features: [
      "3 hours of coverage",
      "1 photographer",
      "75+ edited digital photos",
      "Online gallery for 3 months",
      "5 printed photos (8×10)"
    ]
  },
  {
    id: "7",
    name: "Baby Shower",
    description: "Capture the joy and anticipation of your baby shower celebration.",
    price: 10000,
    category: "Baby Shower",
    features: [
      "2 hours of coverage",
      "1 photographer",
      "50+ edited digital photos",
      "Online gallery for 3 months",
      "5 printed photos (8×10)"
    ]
  },
  {
    id: "8",
    name: "Corporate Event",
    description: "Professional photography for your corporate events, meetings, and celebrations.",
    price: 20000,
    category: "Corporate",
    features: [
      "4 hours of coverage",
      "1 photographer",
      "100+ edited digital photos",
      "Online gallery for 3 months",
      "Commercial usage rights",
      "Next day delivery of 10 selected images"
    ]
  },
  {
    id: "9",
    name: "Family Portrait",
    description: "Create timeless family portraits to cherish for generations.",
    price: 8000,
    category: "Family",
    features: [
      "1 hour of coverage",
      "1 photographer",
      "30+ edited digital photos",
      "Online gallery for 3 months",
      "5 printed photos (8×10)",
      "1 location"
    ]
  }
];
