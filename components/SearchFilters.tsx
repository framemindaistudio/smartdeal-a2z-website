"use client";

import { PROPERTY_LOCATIONS, PROPERTY_TYPES } from "@/lib/properties";
import { Search } from "lucide-react";

export interface PropertyFilters {
  keyword: string;
  location: string;
  type: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
}

export const DEFAULT_FILTERS: PropertyFilters = {
  keyword: "",
  location: "",
  type: "",
  bedrooms: "",
  minPrice: "",
  maxPrice: "",
  minArea: "",
};

const selectClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none";
const labelClass = "mb-1 block text-xs font-medium text-slate-500";

export default function SearchFilters({
  filters,
  onChange,
}: {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
}) {
  function set<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={filters.keyword}
          onChange={(e) => set("keyword", e.target.value)}
          placeholder="Search by title or location…"
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div>
          <label className={labelClass}>Location</label>
          <select className={selectClass} value={filters.location} onChange={(e) => set("location", e.target.value)}>
            <option value="">All</option>
            {PROPERTY_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Property Type</label>
          <select className={selectClass} value={filters.type} onChange={(e) => set("type", e.target.value)}>
            <option value="">All</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Bedrooms</label>
          <select className={selectClass} value={filters.bedrooms} onChange={(e) => set("bedrooms", e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Min Budget (₹)</label>
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => set("minPrice", e.target.value)}
            placeholder="No min"
            className={selectClass}
          />
        </div>

        <div>
          <label className={labelClass}>Max Budget (₹)</label>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => set("maxPrice", e.target.value)}
            placeholder="No max"
            className={selectClass}
          />
        </div>

        <div>
          <label className={labelClass}>Min Area (sqft)</label>
          <input
            type="number"
            min={0}
            value={filters.minArea}
            onChange={(e) => set("minArea", e.target.value)}
            placeholder="Any"
            className={selectClass}
          />
        </div>
      </div>

      {(filters.keyword || filters.location || filters.type || filters.bedrooms || filters.minPrice || filters.maxPrice || filters.minArea) && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="mt-4 text-xs font-medium text-amber-700 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
