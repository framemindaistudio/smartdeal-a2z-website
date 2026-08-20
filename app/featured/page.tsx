import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Featured Properties",
  description: "A curated selection of SmartDeal A2Z's most sought-after listings — verified homes, plots and commercial properties handpicked for buyers and investors.",
  alternates: { canonical: "/featured" },
};

export default function FeaturedPage() {
  const featured = getFeaturedProperties();

  return (
    <div>
      <PageHero
        title="Featured Properties"
        description="A curated selection of our most sought-after listings, updated regularly."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
