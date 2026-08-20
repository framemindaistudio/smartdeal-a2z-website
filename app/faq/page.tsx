import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about buying, selling and renting property with SmartDeal A2Z — enquiry fees, how to list your property, and more.",
  alternates: { canonical: "/faq" },
};

// Placeholder Q&A — reasonable defaults for a property browse/enquiry platform.
// Review and replace with the client's actual FAQ content from onboarding.
const EMPHASIS = "text-base font-bold text-slate-900";

// `schemaAnswer` (plain text, no JSX) is only set on genuinely real answers —
// it drives the FAQPage structured data below, so placeholder text never gets
// marked up as if it were real content for search engines.
const FAQS: { q: string; a: ReactNode; schemaAnswer?: string }[] = [
  {
    q: "Is there a fee to enquire about a property?",
    a: <>No. Browsing and sending an enquiry through the website is <strong className={EMPHASIS}>completely free</strong>.</>,
    schemaAnswer: "No. Browsing and sending an enquiry through the website is completely free.",
  },
  {
    q: "Are the property listings verified?",
    a: "[Placeholder] — describe the client's actual verification process here once confirmed.",
  },
  {
    q: `How do I list my property with ${SITE_CONFIG.shortName}?`,
    a: <>Visit the &ldquo;Sell Property&rdquo; page and submit your property details through the form. <strong className={EMPHASIS}>Our team will follow up</strong> with next steps.</>,
    schemaAnswer: `Visit the "Sell Property" page and submit your property details through the form. Our team will follow up with next steps.`,
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.filter((item) => item.schemaAnswer).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.schemaAnswer },
  })),
};

export default function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
