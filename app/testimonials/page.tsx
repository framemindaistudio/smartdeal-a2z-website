import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our clients say.",
};

// Placeholder testimonials — replace with real client quotes once submitted
// via the onboarding portal's "Testimonials" section. Avatars are generated
// (not stock photos) so nothing here is ever mistaken for a real client.
const AVATAR_COLORS = ["#0e3b2e", "#1f5c46", "#d84c01", "#7d7a65"];

function avatarUri(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${color}"/><text x="100" y="138" font-family="Georgia, 'Times New Roman', serif" font-size="130" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">&#8220;</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const ROLES = [
  "Homebuyer",
  "Property Seller",
  "Investor",
  "Tenant",
  "Landlord",
  "Commercial Buyer",
];

const TESTIMONIALS: CoverflowSlide[] = ROLES.map((role, i) => ({
  src: avatarUri(AVATAR_COLORS[i % AVATAR_COLORS.length]),
  alt: "Placeholder avatar",
  title: `“[Placeholder testimonial ${i + 1}] — replace with a real client quote once submitted.”`,
  subtitle: `Client ${i + 1} · ${role}`,
}));

export default function TestimonialsPage() {
  return (
    <div>
      <PageHero
        title="Testimonials"
        description="Placeholder quotes shown below — real testimonials are pending from the client."
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <CoverflowCarousel
          slides={TESTIMONIALS}
          showCaption
          showPagination
          showNavigation
          label="Client testimonials"
        />
      </section>
    </div>
  );
}
