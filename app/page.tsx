import Link from "next/link";
import { Search, ShieldCheck, Handshake, TrendingUp, Home as HomeIcon } from "lucide-react";
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
      <section className="relative overflow-hidden bg-brand text-white">
        {/* Aurora glow field */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-600/30 blur-3xl animate-[aurora-drift_18s_ease-in-out_infinite]" />
          <div className="absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-500/15 blur-3xl animate-[aurora-drift_22s_ease-in-out_infinite_reverse]" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-[aurora-drift_25s_ease-in-out_infinite]" />
        </div>

        {/* Tech grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div className="animate-[fade-up_0.7s_ease-out]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-orange-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
              {SITE_CONFIG.name} · Property Platform
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Find your next property,{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                the smart way.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-slate-300">
              Browse, search and enquire about verified properties with a fast, modern,
              elegant experience — built for buyers, sellers and everyone in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_0_rgba(216,76,1,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_4px_rgba(216,76,1,0.45)]"
              >
                Browse Properties
              </Link>
              <Link
                href="/sell"
                className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Sell Your Property
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {[
                ["15+", "Pages"],
                ["100%", "Custom Built"],
                ["30 Days", "Free Support"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-xl font-bold text-white">{n}</p>
                  <p className="text-xs text-slate-400">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating glass card composition */}
          <div className="relative hidden h-[440px] lg:block">
            <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="absolute left-2 top-8 w-[78%] animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-brand-light to-brand">
                <div className="absolute inset-0 flex items-center justify-center text-white/15">
                  <HomeIcon className="h-16 w-16" strokeWidth={1} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-semibold text-white">Sunrise Heights</p>
                  <p className="text-xs text-slate-400">Indiranagar, Bengaluru</p>
                </div>
                <p className="text-sm font-bold text-orange-400">₹98L</p>
              </div>
            </div>

            <div className="absolute -right-2 top-0 animate-[float_7s_ease-in-out_infinite_1s] rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
              <p className="text-2xl font-bold text-white">8+</p>
              <p className="text-xs text-slate-300">Live Listings</p>
            </div>

            <div className="absolute bottom-6 right-4 flex animate-[float_8s_ease-in-out_infinite_0.5s] items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 shadow-xl backdrop-blur-md">
              <Search className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-white">3BHK in Bengaluru…</span>
            </div>

            <div className="absolute -left-4 bottom-16 animate-[float_9s_ease-in-out_infinite_1.5s] rounded-xl border border-white/10 bg-white/10 px-3 py-2 shadow-xl backdrop-blur-md">
              <p className="text-xs font-medium text-white">Verified ✓</p>
            </div>
          </div>
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
            List Your Property
          </Link>
        </div>
      </section>
    </div>
  );
}
