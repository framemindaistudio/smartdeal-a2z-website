import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import PlaceholderImage from "@/components/PlaceholderImage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_CONFIG.name}.`,
};

const DETAILS = [
  { icon: Phone, label: "Phone", value: SITE_CONFIG.phoneDisplay },
  { icon: Mail, label: "Email", value: SITE_CONFIG.email },
  { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
  { icon: Clock, label: "Business Hours", value: SITE_CONFIG.businessHours },
];

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Contact Us" description="We'd love to hear from you — reach out with any questions." />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <ContactForm context="General Enquiry" />
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {DETAILS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
                  <Icon className="mb-2 h-5 w-5 text-amber-600" />
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            <div>
              <PlaceholderImage
                label="Google Map — pending business address & Maps API key"
                variant="neutral"
                aspect="aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
