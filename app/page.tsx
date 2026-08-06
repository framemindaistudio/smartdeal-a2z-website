import Link from "next/link";
import { ShieldCheck, Handshake, LifeBuoy, BadgePercent, Lock } from "lucide-react";
import { RobotHero } from "@/components/ui/robot-hero";
import PlaceholderImage from "@/components/PlaceholderImage";
import PropertyCard from "@/components/PropertyCard";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProperties, PROPERTY_TYPES } from "@/lib/properties";

// "Why Choose SmartDeal" — verbatim from the client's Homepage Content
// onboarding section (filled in 2026-08-06), icons assigned by us.
const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    text: "Every listing is carefully verified for authenticity and transparency.",
  },
  {
    icon: Handshake,
    title: "Trusted Builders & Developers",
    text: "Partner with reliable builders, developers, and property owners.",
  },
  {
    icon: LifeBuoy,
    title: "End-to-End Assistance",
    text: "Complete support from property search and site visits to documentation and deal closure.",
  },
  {
    icon: BadgePercent,
    title: "Best Deals & Fair Pricing",
    text: "Competitive prices with expert guidance to help you make the right investment.",
  },
  {
    icon: Lock,
    title: "Secure & Transparent Process",
    text: "Honest communication, clear documentation, and a hassle-free buying and selling experience.",
  },
];

export default function Home() {
  const featured = getFeaturedProperties(3);

  return (
    <div>
      <RobotHero
        showNavbar={false}
        headline="SmartDeal A2Z – One Platform for All Real Estate Needs"
        description="Buy, Sell, Rent, Lease, Invest, and Discover Residential, Commercial, Land, Hotels, and More — all on one secure and smart platform."
        primaryCtaText="Explore Properties"
        primaryCtaHref="/properties"
        secondaryCtaText="Post Your Property"
        secondaryCtaHref="/sell"
      />

      {/* Same trust stats the CSS hero used to show, now just under the 3D hero */}
      <section className="border-b border-slate-200 bg-brand py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm text-slate-300 sm:px-6 lg:px-8">
          {[
            ["15+", "Pages"],
            ["100%", "Custom Built"],
            ["30 Days", "Free Support"],
          ].map(([n, l]) => (
            <span key={l} className="font-medium">
              <span className="font-bold text-white">{n}</span> {l}
            </span>
          ))}
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
          <SectionHeading title="Why Choose SmartDeal" align="center" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
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
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand px-8 py-12 text-center text-white sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Looking to sell instead?</h2>
            <p className="mt-2 text-slate-300">
              Tell us about your property and we&apos;ll connect you with the right buyers.
            </p>
          </div>
          <Link
            href="/sell"
            className="shrink-0 rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            Post Your Property
          </Link>
        </div>
      </section>
    </div>
  );
}
