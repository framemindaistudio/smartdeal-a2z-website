import type { Metadata } from "next";
import { Target, Eye, HeartHandshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${SITE_CONFIG.name}.`,
};

// Verbatim from the client's Company Information onboarding section (2026-08-06).
const VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    text: "Our mission is to simplify property transactions by using smart technology, verified information, and secure digital processes that create confidence for every customer.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To become India's most trusted and innovative A2Z Real Estate Operating System, empowering millions of people to buy, sell, rent, invest, and grow through one intelligent platform.",
  },
  {
    icon: HeartHandshake,
    title: "Why SmartDeal",
    text: "SmartDeal is not just a real estate platform but a complete property ecosystem where Buyer, Seller, Builder, Developer, Broker and Investor connect on a single secure platform.",
  },
];

const STATS = [
  { value: "—", label: "Properties Sold" },
  { value: "—", label: "Happy Clients" },
  { value: "—", label: "Cities Served" },
  { value: SITE_CONFIG.yearsInBusiness, label: "Years of Experience" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About Us"
        description={`${SITE_CONFIG.yearsInBusiness} years of experience, one A2Z real estate platform.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <PlaceholderImage label="Team / Office Photo" variant="brand" aspect="aspect-[4/3]" />
          <div>
            <SectionHeading eyebrow="Who We Are" title={`About ${SITE_CONFIG.name}`} />
            <p className="text-slate-600">
              SmartDeal A2Z Real Estate Platform is a next-generation PropTech company dedicated to
              transforming the real estate industry through technology, transparency, and trust. Our
              platform connects buyers, sellers, builders, developers, brokers, investors, landlords, and
              service providers on a single digital ecosystem, making every property transaction faster,
              safer, and more efficient.
            </p>
            <p className="mt-4 text-slate-600">
              From residential, commercial, plots, farmland, hotels, rentals, and investment opportunities
              to lead management, CRM, digital documentation, marketing, and business analytics, SmartDeal
              A2Z provides complete end-to-end real estate solutions. Backed by {SITE_CONFIG.yearsInBusiness}{" "}
              years of business experience, SmartDeal A2Z delivers a trusted, transparent, and
              technology-driven real estate platform for buyers, sellers, developers, and channel partners.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Drives Us" align="center" />
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 text-center">
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
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-brand p-10 text-center text-white sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-orange-400">{s.value}</p>
              <p className="mt-1 text-sm text-slate-300">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          Stats pending real figures from the client.
        </p>
      </section>
    </div>
  );
}
