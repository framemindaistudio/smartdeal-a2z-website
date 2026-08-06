"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { PROPERTY_LOCATIONS, PROPERTY_TYPES } from "@/lib/properties";

export default function QuickSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-lg sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-500">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
        >
          <option value="">Any location</option>
          {PROPERTY_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-500">Property Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
        >
          <option value="">Any type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
