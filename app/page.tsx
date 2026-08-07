import Link from "next/link";
import { ShieldCheck, Handshake, LifeBuoy, BadgePercent, Lock } from "lucide-react";
import PropertyHero from "@/components/PropertyHero";
import PropertyCard from "@/components/PropertyCard";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProperties, PROPERTY_TYPES } from "@/lib/properties";

// "Why Choose SmartDeal" — verbatim from the client's Homepage Content
// onboarding section (filled in 2026-08-06), icons assigned by us.
const EMPHASIS = "text-base font-bold text-slate-900";

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    text: (
      <>
        Every listing is <strong className={EMPHASIS}>carefully verified</strong> for authenticity and
        transparency.
      </>
    ),
  },
  {
    icon: Handshake,
    title: "Trusted Builders & Developers",
    text: (
      <>
        Partner with <strong className={EMPHASIS}>reliable builders, developers</strong>, and property
        owners.
      </>
    ),
  },
  {
    icon: LifeBuoy,
    title: "End-to-End Assistance",
    text: (
      <>
        <strong className={EMPHASIS}>Complete support</strong> from property search and site visits to
        documentation and deal closure.
      </>
    ),
  },
  {
    icon: BadgePercent,
    title: "Best Deals & Fair Pricing",
    text: (
      <>
        <strong className={EMPHASIS}>Competitive prices</strong> with expert guidance to help you make the
        right investment.
      </>
    ),
  },
  {
    icon: Lock,
    title: "Secure & Transparent Process",
    text: (
      <>
        Honest communication, clear documentation, and a{" "}
        <strong className={EMPHASIS}>hassle-free buying and selling experience</strong>.
      </>
    ),
  },
];

export default function Home() {
  const featured = getFeaturedProperties(3);

  return (
    <div>
      <PropertyHero />

      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm text-slate-600 sm:px-6 lg:px-8">
          {PROPERTY_TYPES.map((type) => (
            <span key={type} className="font-medium">
              {type}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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

      <section className="bg-slate-50 py-20 lg:py-28">
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

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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
