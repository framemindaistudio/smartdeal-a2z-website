import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions.",
};

// Placeholder Q&A — reasonable defaults for a property browse/enquiry platform.
// Review and replace with the client's actual FAQ content from onboarding.
const FAQS = [
  {
    q: "Is there a fee to enquire about a property?",
    a: "No. Browsing and sending an enquiry through the website is completely free.",
  },
  {
    q: "Are the property listings verified?",
    a: "[Placeholder] — describe the client's actual verification process here once confirmed.",
  },
  {
    q: `How do I list my property with ${SITE_CONFIG.shortName}?`,
    a: 'Visit the "Sell Property" page and submit your property details through the form. Our team will follow up with next steps.',
  },
  {
    q: "How quickly will I get a response to my enquiry?",
    a: "[Placeholder] — confirm the client's typical response time once available.",
  },
  {
    q: "Do you offer home loan or legal assistance?",
    a: "[Placeholder] — confirm with the client whether this is offered; not part of the current website scope if not.",
  },
  {
    q: "Which cities/areas do you cover?",
    a: "[Placeholder] — list the client's actual service areas once provided.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHero title="Frequently Asked Questions" description="Answers marked [Placeholder] are pending confirmation from the client." />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white p-5 open:border-slate-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-slate-900">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
