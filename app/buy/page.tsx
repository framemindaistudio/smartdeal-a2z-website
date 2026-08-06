import type { Metadata } from "next";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import SectionHeading from "@/components/SectionHeading";
import QuickSearch from "@/components/QuickSearch";
import { getFeaturedProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Buy Property",
  description: "Browse verified properties for sale and find your next home.",
};

export default function BuyPage() {
  const picks = getFeaturedProperties(3);

  return (
    <div>
      <section className="bg-brand py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Buy a Property</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Search our full inventory of homes, apartments, villas and plots — or start
            with a quick search below.
          </p>
          <div className="mt-8 max-w-3xl">
            <QuickSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular Picks"
          title="Properties Buyers Are Loving"
          description="A quick look at some of our featured listings — see all properties for the full inventory."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/properties"
            className="inline-block rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            View All Properties
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How Buying Works" align="center" />
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: "Search & Shortlist", text: "Use filters to find properties matching your budget and needs." },
              { step: "2", title: "Enquire", text: "Send an enquiry via the contact form, call or WhatsApp — directly, no middlemen." },
              { step: "3", title: "Connect & Visit", text: "Our team gets back to you to arrange details and a site visit." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {s.step}
                </div>
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
