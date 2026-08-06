// PLACEHOLDER property data — the client has not yet provided a property database
// (see onboarding portal, section "Property Database"). This is a static, in-repo
// dataset standing in for that content so pages have something real to render and
// the search/filter UI is demonstrable. Per the proposal, this stays static content
// even after go-live — swapping/adding listings is a code update, not a CMS edit.

export interface Property {
  slug: string;
  title: string;
  type: "Apartment" | "Villa" | "Plot" | "Independent House" | "Commercial";
  purpose: "For Sale" | "For Rent";
  price: number; // INR
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  featured: boolean;
  summary: string;
  description: string;
  highlights: string[];
  amenities: string[];
  nearbyFacilities: string[];
  photoLabels: string[]; // labels for placeholder gallery tiles
}

export const PROPERTIES: Property[] = [
  {
    slug: "sunrise-heights-3bhk-indiranagar",
    title: "Sunrise Heights — 3BHK Apartment",
    type: "Apartment",
    purpose: "For Sale",
    price: 9800000,
    location: "Indiranagar",
    city: "Bengaluru",
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1550,
    featured: true,
    summary: "Modern 3BHK with balcony views, close to metro and tech parks.",
    description:
      "A well-ventilated 3BHK on a mid floor with an open kitchen, two balconies and covered parking. Walking distance to the metro station, cafes and reputed schools — a strong fit for families or professionals wanting a low commute.",
    highlights: ["Mid floor, east facing", "2 covered car parks", "Clubhouse & gym access", "Ready to move in"],
    amenities: ["24x7 security", "Power backup", "Lift", "Clubhouse", "Children's play area", "Gym"],
    nearbyFacilities: ["Metro station – 0.6 km", "International school – 1.2 km", "Hospital – 2 km", "Mall – 1.8 km"],
    photoLabels: ["Living Room", "Kitchen", "Master Bedroom", "Balcony View", "Building Exterior"],
  },
  {
    slug: "palm-meadows-villa-whitefield",
    title: "Palm Meadows Villa",
    type: "Villa",
    purpose: "For Sale",
    price: 24500000,
    location: "Whitefield",
    city: "Bengaluru",
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 3200,
    featured: true,
    summary: "Gated-community villa with private garden and 3-car driveway.",
    description:
      "A spacious 4BHK independent villa inside a gated community, with a private front garden, double-height living room and a dedicated home office space. Community amenities include a clubhouse, pool and jogging track.",
    highlights: ["Private garden", "Double-height living room", "3-car driveway", "Home office nook"],
    amenities: ["Gated community", "Swimming pool", "Clubhouse", "Jogging track", "24x7 security", "Power backup"],
    nearbyFacilities: ["Tech park – 3 km", "International school – 2.5 km", "Hospital – 4 km"],
    photoLabels: ["Front Facade", "Living Room", "Garden", "Dining Area", "Master Suite"],
  },
  {
    slug: "green-view-2bhk-kothrud",
    title: "Green View Residency — 2BHK",
    type: "Apartment",
    purpose: "For Rent",
    price: 28000,
    location: "Kothrud",
    city: "Pune",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1050,
    featured: false,
    summary: "Semi-furnished 2BHK, ideal for small families or working couples.",
    description:
      "A bright, semi-furnished 2BHK on a high floor with society amenities and easy access to Kothrud's main market and IT corridor. Modular kitchen and wardrobes included.",
    highlights: ["Semi-furnished", "High floor, good ventilation", "Modular kitchen", "1 covered parking"],
    amenities: ["Lift", "Power backup", "Security", "Visitor parking"],
    nearbyFacilities: ["Bus depot – 0.4 km", "Market – 0.8 km", "Hospital – 1.5 km"],
    photoLabels: ["Living Room", "Bedroom", "Kitchen", "Society Entrance"],
  },
  {
    slug: "riverside-plot-sector-12",
    title: "Riverside Plot, Sector 12",
    type: "Plot",
    purpose: "For Sale",
    price: 5200000,
    location: "Sector 12",
    city: "Gurugram",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 2400,
    featured: false,
    summary: "DTCP-approved residential plot, clear title, ready for construction.",
    description:
      "A rectangular, DTCP-approved residential plot in a developing sector with wide approach roads and all underground utilities laid. Clear title and immediately available for construction.",
    highlights: ["DTCP approved", "Clear title", "Wide 40 ft approach road", "Corner plot"],
    amenities: ["Underground drainage", "Electricity connection point", "Boundary wall"],
    nearbyFacilities: ["Highway access – 1 km", "School – 2 km"],
    photoLabels: ["Plot Overview", "Approach Road", "Boundary Markers"],
  },
  {
    slug: "orchid-enclave-4bhk-banjara-hills",
    title: "Orchid Enclave — 4BHK Penthouse",
    type: "Apartment",
    purpose: "For Sale",
    price: 32000000,
    location: "Banjara Hills",
    city: "Hyderabad",
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 4100,
    featured: true,
    summary: "Duplex penthouse with private terrace and skyline views.",
    description:
      "A duplex penthouse spanning the top two floors with a private terrace garden, home theatre room and staff quarters. Premium fittings throughout and panoramic city views from every bedroom.",
    highlights: ["Duplex layout", "Private terrace", "Home theatre room", "Staff quarters"],
    amenities: ["Private lift lobby", "Infinity pool access", "Concierge desk", "Power backup", "4 covered car parks"],
    nearbyFacilities: ["Business district – 2 km", "Premium school – 1.5 km", "Hospital – 2.2 km"],
    photoLabels: ["Terrace", "Living Room", "Home Theatre", "Skyline View", "Master Bedroom"],
  },
  {
    slug: "coastal-cottage-independent-house-alibaug",
    title: "Coastal Cottage — Independent House",
    type: "Independent House",
    purpose: "For Sale",
    price: 15800000,
    location: "Alibaug",
    city: "Raigad",
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 2100,
    featured: false,
    summary: "Weekend-home style cottage, 10 minutes from the beach.",
    description:
      "A single-storey independent house with a sit-out porch, small orchard and space for a plunge pool. Popular with buyers looking for a weekend home within driving distance of Mumbai.",
    highlights: ["10 min from beach", "Sit-out porch", "Small orchard", "Space for plunge pool"],
    amenities: ["Borewell + municipal water", "Solar water heater", "Boundary wall", "Covered parking"],
    nearbyFacilities: ["Beach – 4 km", "Local market – 2 km"],
    photoLabels: ["Front Porch", "Living Area", "Orchard", "Exterior"],
  },
  {
    slug: "tech-plaza-commercial-unit-hitech-city",
    title: "Tech Plaza — Commercial Office Unit",
    type: "Commercial",
    purpose: "For Rent",
    price: 145000,
    location: "HITEC City",
    city: "Hyderabad",
    bedrooms: 0,
    bathrooms: 2,
    areaSqft: 2800,
    featured: false,
    summary: "Grade-A office shell, ready for fit-out, in the IT corridor.",
    description:
      "A bare-shell commercial unit on a mid floor of a Grade-A office tower, suitable for a 30–40 seat setup. Building offers backup power, dedicated fire safety systems and ample visitor parking.",
    highlights: ["Grade-A building", "30–40 seat capacity", "Bare shell — customizable fit-out", "24x7 access"],
    amenities: ["Power backup", "Fire safety systems", "Visitor parking", "Cafeteria in building"],
    nearbyFacilities: ["IT corridor", "Metro station – 1 km", "Food court – 0.3 km"],
    photoLabels: ["Floor Plate", "Building Exterior", "Lobby"],
  },
  {
    slug: "maple-residency-1bhk-wakad",
    title: "Maple Residency — 1BHK",
    type: "Apartment",
    purpose: "For Sale",
    price: 4200000,
    location: "Wakad",
    city: "Pune",
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 640,
    featured: true,
    summary: "Compact, budget-friendly 1BHK — a strong first-home or rental-yield option.",
    description:
      "A compact and efficiently laid out 1BHK in a well-maintained society, close to the IT hub. Good natural light and a functional kitchen layout make this a popular choice for first-time buyers and investors alike.",
    highlights: ["Budget-friendly", "Good rental yield potential", "Well-maintained society", "Close to IT hub"],
    amenities: ["Lift", "Security", "Power backup", "Children's play area"],
    nearbyFacilities: ["IT park – 1.5 km", "Bus stop – 0.2 km", "Supermarket – 0.5 km"],
    photoLabels: ["Living Room", "Bedroom", "Kitchen"],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit?: number): Property[] {
  const featured = PROPERTIES.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getRelatedProperties(current: Property, limit = 3): Property[] {
  return PROPERTIES.filter(
    (p) =>
      p.slug !== current.slug &&
      (p.type === current.type || p.city === current.city)
  ).slice(0, limit);
}

export const PROPERTY_TYPES = ["Apartment", "Villa", "Plot", "Independent House", "Commercial"] as const;
export const PROPERTY_LOCATIONS = Array.from(new Set(PROPERTIES.map((p) => p.location))).sort();

export function formatPrice(price: number, purpose: Property["purpose"]): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
  return purpose === "For Rent" ? `${formatted} / month` : formatted;
}
