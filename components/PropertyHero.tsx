"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, Users, Award } from "lucide-react";
import { PROPERTY_LOCATIONS, PROPERTY_TYPES } from "@/lib/properties";
import { SITE_CONFIG } from "@/lib/site-config";

const BUY_BUDGETS = [
  { label: "Any Budget", min: "", max: "" },
  { label: "Under ₹50L", min: "", max: "5000000" },
  { label: "₹50L – ₹1Cr", min: "5000000", max: "10000000" },
  { label: "₹1Cr – ₹2Cr", min: "10000000", max: "20000000" },
  { label: "Above ₹2Cr", min: "20000000", max: "" },
];

const RENT_BUDGETS = [
  { label: "Any Budget", min: "", max: "" },
  { label: "Under ₹25k/mo", min: "", max: "25000" },
  { label: "₹25k – ₹50k/mo", min: "25000", max: "50000" },
  { label: "₹50k – ₹1L/mo", min: "50000", max: "100000" },
  { label: "Above ₹1L/mo", min: "100000", max: "" },
];

const TRUST_STATS = [
  { icon: ShieldCheck, value: "100%", label: "Verified Listings" },
  { icon: Award, value: SITE_CONFIG.yearsInBusiness, label: "Years in Business" },
  { icon: Users, value: "A2Z", label: "Buyers, Sellers & Investors" },
];

/** Faint building-silhouette strip along the bottom edge — atmosphere, not literal renders. */
function CitySkylineBg() {
  const buildings = [
    { x: 0, w: 70, h: 130 }, { x: 65, w: 45, h: 190 }, { x: 105, w: 60, h: 110 },
    { x: 160, w: 50, h: 220 }, { x: 205, w: 75, h: 150 }, { x: 275, w: 40, h: 260 },
    { x: 310, w: 65, h: 100 }, { x: 370, w: 55, h: 200 }, { x: 420, w: 80, h: 160 },
    { x: 495, w: 45, h: 230 }, { x: 535, w: 70, h: 120 }, { x: 600, w: 50, h: 190 },
    { x: 645, w: 90, h: 140 }, { x: 730, w: 40, h: 250 }, { x: 765, w: 65, h: 105 },
    { x: 825, w: 55, h: 210 }, { x: 875, w: 75, h: 160 }, { x: 945, w: 45, h: 235 },
    { x: 985, w: 70, h: 125 }, { x: 1050, w: 50, h: 195 }, { x: 1095, w: 85, h: 145 },
    { x: 1175, w: 40, h: 255 }, { x: 1210, w: 65, h: 110 }, { x: 1270, w: 55, h: 205 },
    { x: 1320, w: 75, h: 155 }, { x: 1390, w: 50, h: 230 },
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] w-full"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {buildings.map((b, i) => (
        <rect key={i} x={b.x} y={300 - b.h} width={b.w} height={b.h} fill="#ffffff" opacity={0.05} />
      ))}
    </svg>
  );
}

export default function PropertyHero() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"For Sale" | "For Rent">("For Sale");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budgetIndex, setBudgetIndex] = useState(0);

  const budgets = purpose === "For Sale" ? BUY_BUDGETS : RENT_BUDGETS;

  function handleTabChange(next: "For Sale" | "For Rent") {
    setPurpose(next);
    setBudgetIndex(0);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const budget = budgets[budgetIndex];
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (budget.min) params.set("minPrice", budget.min);
    if (budget.max) params.set("maxPrice", budget.max);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-brand">
      {/* Background: gradient depth + soft glow blobs + skyline + faint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% -10%, #0a2657 0%, #01143c 55%, #000a1f 100%)" }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl animate-[aurora-drift_20s_ease-in-out_infinite]" />
        <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-blue-500/10 blur-3xl animate-[aurora-drift_24s_ease-in-out_infinite_reverse]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <CitySkylineBg />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl animate-[fade-up_0.7s_ease-out] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-orange-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            {SITE_CONFIG.name} · Property Platform
          </div>
          <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            SmartDeal A2Z{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              One Platform for All Real Estate Needs
            </span>
          </h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">
            Buy, Sell, Rent, Lease, Invest, and Discover Residential, Commercial, Land, Hotels, and More —
            all on one secure and smart platform.
          </p>
        </div>

        {/* Search widget */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex border-b border-white/10">
            {(["For Sale", "For Rent"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleTabChange(p)}
                className={`flex-1 px-4 py-3 text-sm font-bold transition-colors sm:flex-none sm:px-8 ${
                  purpose === p
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {p === "For Sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/90 px-3 py-2.5 text-sm text-slate-800 focus:border-white focus:outline-none"
              >
                <option value="">Any Location</option>
                {PROPERTY_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/90 px-3 py-2.5 text-sm text-slate-800 focus:border-white focus:outline-none"
              >
                <option value="">Any Type</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">Budget</label>
              <select
                value={budgetIndex}
                onChange={(e) => setBudgetIndex(Number(e.target.value))}
                className="w-full rounded-lg border border-white/20 bg-white/90 px-3 py-2.5 text-sm text-slate-800 focus:border-white focus:outline-none"
              >
                {budgets.map((b, i) => (
                  <option key={b.label} value={i}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d84c01] px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(216,76,1,0.4)] transition-colors hover:bg-[#b33e00]"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Trust stats */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {TRUST_STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-orange-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
