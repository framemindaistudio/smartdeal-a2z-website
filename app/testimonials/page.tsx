import type { Metadata } from "next";
import { Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our clients say.",
};

// Placeholder quotes — replace with real client testimonials once submitted
// via the onboarding portal's "Testimonials" section.
const TESTIMONIALS = [
  { name: "Client Name", role: "Homebuyer", quote: "[Placeholder testimonial] — replace with a real client quote once submitted." },
  { name: "Client Name", role: "Property Seller", quote: "[Placeholder testimonial] — replace with a real client quote once submitted." },
  { name: "Client Name", role: "Investor", quote: "[Placeholder testimonial] — replace with a real client quote once submitted." },
];

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero
        title="Testimonials"
        description="Placeholder quotes shown below — real testimonials are pending from the client."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-3 flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <p className="flex-1 text-sm italic text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <PlaceholderImage label="Photo" variant="neutral" aspect="aspect-square" className="w-12 shrink-0 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
