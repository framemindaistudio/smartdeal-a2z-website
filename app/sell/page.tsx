import type { Metadata } from "next";
import { ClipboardList, Users, Handshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Sell Property",
  description: "List your property with SmartDeal A2Z and reach genuine buyers.",
};

const STEPS = [
  {
    icon: ClipboardList,
    title: "Share Your Details",
    text: "Tell us about your property — type, location, size and expected price.",
  },
  {
    icon: Users,
    title: "We List It",
    text: "Our team prepares your listing and adds it to the platform for buyers to discover.",
  },
  {
    icon: Handshake,
    title: "We Connect You",
    text: "Interested buyers reach out through us — you handle the conversation directly.",
  },
];

export default function SellPage() {
  return (
    <div>
      <PageHero
        title="Sell Your Property"
        description="Reach genuine, actively-searching buyers. Tell us about your property below and our team will take it from there."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="How It Works" align="center" />
        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Started"
            title="Tell Us About Your Property"
            description="Fill in a few details and our team will reach out to discuss next steps."
            align="center"
          />
          <ContactForm
            context="Sell Property Enquiry"
            extraFields={[
              { name: "propertyType", label: "Property Type", placeholder: "e.g. Apartment, Villa, Plot" },
              { name: "location", label: "Property Location", placeholder: "e.g. Indiranagar, Bengaluru" },
              { name: "expectedPrice", label: "Expected Price (₹)", placeholder: "e.g. 8500000" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
