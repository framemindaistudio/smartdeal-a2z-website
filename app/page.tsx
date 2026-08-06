import Link from "next/link";
import { Search, ShieldCheck, Handshake, TrendingUp } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";
import PropertyCard from "@/components/PropertyCard";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProperties, PROPERTY_TYPES } from "@/lib/properties";
import { SITE_CONFIG } from "@/lib/site-config";

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    text: "Every property is checked for accurate details before it goes live.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    text: "Filter by location, budget, type, bedrooms, bathrooms and area in seconds.",
  },
  {
    icon: Handshake,
    title: "Direct Enquiries",
    text: "Reach out via form, call or WhatsApp — no middlemen, no clutter.",
  },
  {
    icon: TrendingUp,
    title: "Fresh Inventory",
    text: "New properties added regularly across residential and commercial segments.",
  },
];

export default function Home() {
  const featured = getFeaturedProperties(3);

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">
              {SITE_CONFIG.name}
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Find your next property, the smart way.
            </h1>
            <p className="mt-5 max-w-lg text-slate-300">
              Browse, search and enquire about verified properties with a fast, modern,
              elegant experience — built for buyers, sellers and everyone in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
              >
                Browse Properties
              </Link>
              <Link
                href="/sell"
                className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sell Your Property
              </Link>
            </div>
          </div>
          <PlaceholderImage label="Hero Property Photo" variant="brand" aspect="aspect-[4/3]" />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm text-slate-600 sm:px-6 lg:px-8">
          {PROPERTY_TYPES.map((type) => (
            <span key={type} className="font-medium">
              {type}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured Properties"
          description="A snapshot of some of our most sought-after listings."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/properties"
            className="inline-block rounded-md border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View All Properties
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Why Choose Us" align="center" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-slate-900 px-8 py-12 text-center text-white sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Looking to sell instead?</h2>
            <p className="mt-2 text-slate-300">
              Tell us about your property and we&apos;ll connect you with the right buyers.
            </p>
          </div>
          <Link
            href="/sell"
            className="shrink-0 rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            List Your Property
          </Link>
        </div>
      </section>
    </div>
  );
}
