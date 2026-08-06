"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, SearchX } from "lucide-react";
import SearchFilters, { DEFAULT_FILTERS, type PropertyFilters } from "./SearchFilters";
import PropertyCard from "./PropertyCard";
import { PROPERTIES } from "@/lib/properties";

export default function PropertiesExplorer({
  initialLocation = "",
  initialType = "",
  initialPurpose = "",
  initialMinPrice = "",
  initialMaxPrice = "",
}: {
  initialLocation?: string;
  initialType?: string;
  initialPurpose?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
}) {
  const [filters, setFilters] = useState<PropertyFilters>({
    ...DEFAULT_FILTERS,
    location: initialLocation,
    type: initialType,
    purpose: initialPurpose,
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice,
  });
  const [view, setView] = useState<"grid" | "list">("grid");

  const results = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        if (!p.title.toLowerCase().includes(kw) && !p.location.toLowerCase().includes(kw) && !p.city.toLowerCase().includes(kw)) {
          return false;
        }
      }
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      if (filters.location && p.location !== filters.location) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.minArea && p.areaSqft < Number(filters.minArea)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <SearchFilters filters={filters} onChange={setFilters} />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{results.length}</span>{" "}
          {results.length === 1 ? "property" : "properties"} found
        </p>
        <div className="flex items-center gap-1 rounded-md border border-slate-300 p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`rounded p-1.5 ${view === "grid" ? "bg-brand text-white" : "text-slate-500"}`}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`rounded p-1.5 ${view === "list" ? "bg-brand text-white" : "text-slate-500"}`}
            aria-label="List view"
            aria-pressed={view === "list"}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center text-slate-500">
          <SearchX className="mb-3 h-10 w-10" />
          <p className="font-semibold text-slate-700">No properties match your filters</p>
          <p className="mt-1 text-sm">Try widening your budget or clearing a filter.</p>
        </div>
      ) : (
        <div className={`mt-6 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {results.map((property) => (
            <PropertyCard key={property.slug} property={property} view={view} />
          ))}
        </div>
      )}
    </div>
  );
}
