import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import { PROPERTIES } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos of SmartDeal A2Z's listed properties — homes, plots and commercial spaces across our current inventory.",
  alternates: { canonical: "/gallery" },
};

const GALLERY_TILES = PROPERTIES.flatMap((p) =>
  p.photoLabels.slice(0, 2).map((label) => `${p.title} — ${label}`)
);

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        title="Gallery"
        description="Placeholder tiles standing in for real photography — to be replaced once the client uploads images."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {GALLERY_TILES.map((label, i) => (
            <PlaceholderImage
              key={label}
              label={label}
              variant={i % 3 === 0 ? "accent" : "neutral"}
              aspect={i % 4 === 0 ? "aspect-[3/4]" : "aspect-square"}
              className="break-inside-avoid"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
