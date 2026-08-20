import type { Metadata } from "next";
import Link from "next/link";
import { Home, Key, DoorOpen, TrendingUp, Users, Scale, Landmark } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end real estate services from SmartDeal A2Z — property buying and selling assistance, rentals, investment advisory, consultation, legal assistance and home loan support.",
  alternates: { canonical: "/services" },
};

// From the client's Services onboarding checklist (2026-08-06). That checklist
// mixes actual services with property types handled — split here into service
// cards (below) plus a "property types we cover" strip (rendered further down),
// so nothing from their list is dropped without becoming a redundant card.
const EMPHASIS = "text-base font-bold text-slate-900";

const SERVICES = [
  { icon: Home, title: "Property Buying Assistance", text: <>Guidance and support finding the <strong className={EMPHASIS}>right property</strong> for your budget and needs.</> },
  { icon: Key, title: "Property Selling Assistance", text: <>List your property and get connected with <strong className={EMPHASIS}>genuinely interested buyers</strong>.</> },
  { icon: DoorOpen, title: "Rental Services", text: <>Find or list rental properties across <strong className={EMPHASIS}>residential and commercial</strong> spaces.</> },
  { icon: TrendingUp, title: "Investment Advisory", text: <><strong className={EMPHASIS}>Expert guidance</strong> on real estate investment opportunities.</> },
  { icon: Users, title: "Property Consultation", text: <>One-on-one consultation to help you make the <strong className={EMPHASIS}>right property decision</strong>.</> },
  { icon: Scale, title: "Legal Assistance", text: <>Support with property-related legal documentation and <strong className={EMPHASIS}>due diligence</strong>.</> },
  { icon: Landmark, title: "Loan Assistance", text: <>Guidance connecting you with <strong className={EMPHASIS}>home loan and financing</strong> options.</> },
];

const PROPERTY_TYPES_SERVED = ["Residential", "Commercial", "Villa", "Apartment", "Plots", "Land", "Farm Land"];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="Our Services"
        description="End-to-end real estate services, from search to deal closure."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
            Property Types We Cover
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROPERTY_TYPES_SERVED.map((type) => (
              <span
                key={type}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
