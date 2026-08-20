// Real partner-developer (Saiccha Developers) listings — the client's own property
// database still hasn't been provided (see onboarding portal, "Property Database"),
// and the placeholder entries that stood in for it have been removed at the user's
// request, leaving only these two confirmed projects. Per the proposal, this stays
// static content even after go-live — swapping/adding listings is a code update,
// not a CMS edit.

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
  /** Exact substring of `description` to bold on the property detail page. */
  descriptionHighlight?: string;
  highlights: string[];
  amenities: string[];
  nearbyFacilities: string[];
  photoLabels: string[]; // labels for placeholder gallery tiles, used as alt text when `photos` is set
  /** Real gallery images, same order as `photoLabels`. Falls back to PlaceholderImage tiles when absent. */
  photos?: string[];
  /** Downloadable brochure PDF, if one exists for this listing. */
  brochureUrl?: string;
}

export const PROPERTIES: Property[] = [
  {
    // Partner-developer project (Saiccha Developers) — figures below combine what's
    // confirmed with the sales team (acreage, plot count, per-Guntha pricing) with
    // amenities/connectivity pulled from the project's own live page, which as of
    // this writing still shows exact pricing as "being finalized" publicly.
    slug: "rudra-valley-farm-plots-amboli-ghat",
    title: "Rudra Valley — Farmhouse Plots",
    type: "Plot",
    purpose: "For Sale",
    price: 600000,
    location: "Amboli Ghat",
    city: "Sindhudurg",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 1089, // 1 Guntha
    featured: true,
    summary: "Premium farmhouse plots in the misty hills of Amboli Ghat, on the Goa border.",
    description:
      "Phase 1 of a 233-acre farm-plot development (337 plots) laid out in numbered rows along a central spine road in Amboli Ghat. Plots start at 1 Guntha for ₹6L, scaling to 11 Guntha for ₹66L and beyond, with resort-style amenities and the upcoming Goa–Nagpur Shaktipath highway just 800m away.",
    descriptionHighlight: "233-acre farm-plot development",
    highlights: ["Phase 1 — 233 acres, 337 plots", "Plots from 1 to 11+ Guntha", "800 m from upcoming Shaktipath highway", "Guarded entrance, central spine road layout"],
    amenities: ["Clubhouse & wellness center", "Swimming pool & spa", "Five-star gymnasium", "Tennis lawn", "Children's park", "Restaurant", "River rafting", "Viewing deck", "Event hall"],
    nearbyFacilities: ["Goa International Airport – 50 km", "Amboli & Napharde waterfalls – 10 km", "Malvan Airport – 70 km", "Upcoming Shaktipath highway – 800 m"],
    photoLabels: ["Entrance Gate", "Aerial View", "Clubhouse", "Recreational Canal", "Plot Layout"],
    photos: [
      "/properties/rudra-valley/entrance-gate.jpg",
      "/properties/rudra-valley/aerial-view.jpg",
      "/properties/rudra-valley/clubhouse.jpg",
      "/properties/rudra-valley/recreational-canal.jpg",
      "/properties/rudra-valley/plot-layout.jpg",
    ],
    brochureUrl: "/properties/rudra-valley/brochure.pdf",
  },
  {
    // Same partner-developer sourcing note as Rudra Valley above.
    slug: "jagkalyan-tarak-gurukul-na-plots-dodamarg",
    title: "JagKalyan Tarak Gurukul — NA Plots",
    type: "Plot",
    purpose: "For Sale",
    price: 2100000,
    location: "Dodamarg",
    city: "Sindhudurg",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 1634, // 1.5 Guntha (~150 sq.m)
    featured: true,
    summary: "Gated NA plots beside the JagKalyan Gurukul campus in Dodamarg, near the Goa border.",
    description:
      "A 300-acre gated, plotted scheme (3,000 plots planned; Phase 1 releases 1,000) in Khanyale village, Dodamarg, right beside the JagKalyan Holistic Mission campus. Plots start at 1.5 Guntha (~150 sq.m) for ₹21L, on wide 15m/12m internal roads with a cricket stadium, sports centre and landscaped water body.",
    descriptionHighlight: "300-acre gated, plotted scheme",
    highlights: ["300 acres — 3,000 plots planned (1,000 in Phase 1)", "150 sq.m (~1.5 Guntha) & 500 sq.m formats", "Beside JagKalyan Holistic Mission campus", "Gated scheme, 15m & 12m internal roads"],
    amenities: ["Cricket stadium", "Sports centre", "Shopping centre", "Landscaped water body", "Decorative entrance gate", "Watch towers", "Dedicated parking"],
    nearbyFacilities: ["JagKalyan Holistic Mission campus – adjacent", "Khanyale village, Dodamarg taluka", "Sindhudurg district, Maharashtra"],
    photoLabels: ["Entrance Gate", "Water Body", "Plot Layout", "Sports Centre", "Cricket Stadium"],
    photos: [
      "/properties/jagkalyan-tarak-gurukul/entrance-gate.jpg",
      "/properties/jagkalyan-tarak-gurukul/water-body.jpg",
      "/properties/jagkalyan-tarak-gurukul/plot-layout.png",
      "/properties/jagkalyan-tarak-gurukul/sports-centre.jpg",
      "/properties/jagkalyan-tarak-gurukul/cricket-stadium.jpg",
    ],
    brochureUrl: "/properties/jagkalyan-tarak-gurukul/brochure.pdf",
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
