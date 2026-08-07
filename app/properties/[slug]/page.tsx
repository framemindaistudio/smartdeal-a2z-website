import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, MapPin, Check, Phone } from "lucide-react";
import PlaceholderImage from "@/components/PlaceholderImage";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { formatPrice, getPropertyBySlug, getRelatedProperties, PROPERTIES } from "@/lib/properties";
import { SITE_CONFIG } from "@/lib/site-config";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

/** Bolds the first occurrence of `highlight` within `text`, if given. */
function HighlightedText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const index = text.indexOf(highlight);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <strong className="text-lg font-bold text-slate-900">{highlight}</strong>
      {text.slice(index + highlight.length)}
    </>
  );
}

export async function generateMetadata(props: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.summary,
  };
}

export default async function PropertyDetailsPage(props: PageProps<"/properties/[slug]">) {
  const { slug } = await props.params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const related = getRelatedProperties(property);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-4 text-sm text-slate-500">
        <span>Properties</span> <span className="mx-1">/</span> <span className="text-slate-700">{property.title}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
            {property.type} · {property.purpose}
          </span>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{property.title}</h1>
          <p className="mt-1 flex items-center gap-1 text-slate-500">
            <MapPin className="h-4 w-4" />
            {property.location}, {property.city}
          </p>
        </div>
        <p className="text-2xl font-bold text-slate-900">{formatPrice(property.price, property.purpose)}</p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {property.photoLabels.map((label, i) => (
          <PlaceholderImage key={label} label={label} variant={i === 0 ? "brand" : "neutral"} className={i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""} />
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8 flex flex-wrap gap-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <BedDouble className="h-5 w-5 text-slate-500" /> {property.bedrooms} Bedrooms
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Bath className="h-5 w-5 text-slate-500" /> {property.bathrooms} Bathrooms
              </span>
            )}
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Ruler className="h-5 w-5 text-slate-500" /> {property.areaSqft.toLocaleString("en-IN")} sqft
            </span>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Description</h2>
            <p className="leading-relaxed text-slate-600">
              <HighlightedText text={property.description} highlight={property.descriptionHighlight} />
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Highlights</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {property.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" /> {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Amenities</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {property.amenities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" /> {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Nearby Facilities</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {property.nearbyFacilities.map((n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /> {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            <Phone className="h-4 w-4" /> Call About This Property
          </a>
          <ContactForm context={`Property Enquiry: ${property.title}`} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="Related Properties" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
