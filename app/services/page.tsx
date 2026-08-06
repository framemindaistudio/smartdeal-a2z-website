import type { Metadata } from "next";
import Link from "next/link";
import { Home, Key, MessagesSquare, FileText, Search, Building2 } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description: "Services offered by SmartDeal A2Z.",
};

// Placeholder service list — not yet confirmed by the client via onboarding.
// Replace with their real service lineup once "Services" section is filled in.
const SERVICES = [
  { icon: Home, title: "Property Buying Assistance", text: "Guidance and support finding the right property for your budget and needs." },
  { icon: Key, title: "Property Selling Assistance", text: "List your property and get connected with genuinely interested buyers." },
  { icon: Search, title: "Advanced Property Search", text: "Filter by location, budget, type, bedrooms, bathrooms and area to narrow down fast." },
  { icon: Building2, title: "Residential & Commercial", text: "Coverage across apartments, villas, plots, independent houses and commercial units." },
  { icon: MessagesSquare, title: "Direct Enquiry Handling", text: "Reach out via contact form, phone or WhatsApp — no unnecessary back-and-forth." },
  { icon: FileText, title: "Property Information", text: "Clear listing details — amenities, nearby facilities, highlights and full descriptions." },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="Our Services"
        description="Placeholder service list — to be confirmed against the client's actual offerings from onboarding."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
