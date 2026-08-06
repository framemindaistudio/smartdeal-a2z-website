import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { formatPrice, type Property } from "@/lib/properties";

export default function PropertyCard({
  property,
  view = "grid",
}: {
  property: Property;
  view?: "grid" | "list";
}) {
  const isList = view === "list";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={`group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg ${
        isList ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <div className={isList ? "sm:w-72 shrink-0" : ""}>
        <PlaceholderImage
          label={property.photoLabels[0] ?? property.title}
          variant="neutral"
          aspect={isList ? "aspect-[4/3] sm:h-full sm:aspect-auto" : "aspect-[4/3]"}
          className="rounded-none"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {property.type}
          </span>
          <span className="text-xs font-medium text-slate-500">{property.purpose}</span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-amber-700">
          {property.title}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          {property.location}, {property.city}
        </p>

        <p className="mt-3 text-sm text-slate-600 line-clamp-2">{property.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" /> {property.bedrooms} Bed
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" /> {property.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center gap-1">
            <Ruler className="h-4 w-4" /> {property.areaSqft.toLocaleString("en-IN")} sqft
          </span>
        </div>

        <div className="mt-auto pt-4">
          <p className="text-xl font-bold text-slate-900">
            {formatPrice(property.price, property.purpose)}
          </p>
        </div>
      </div>
    </Link>
  );
}
