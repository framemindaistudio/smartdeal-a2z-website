import type { Metadata } from "next";
import { Target, Eye, HeartHandshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${SITE_CONFIG.name}.`,
};

const VALUES = [
  { icon: Target, title: "Our Mission", text: "Placeholder — replace with the client's actual mission statement from onboarding." },
  { icon: Eye, title: "Our Vision", text: "Placeholder — replace with the client's actual vision statement from onboarding." },
  { icon: HeartHandshake, title: "Our Promise", text: "Transparent listings, direct communication, and no unnecessary middlemen." },
];

const STATS = [
  { value: "—", label: "Properties Listed" },
  { value: "—", label: "Happy Clients" },
  { value: "—", label: "Cities Covered" },
  { value: "—", label: "Years of Experience" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About Us"
        description="This page is a structural placeholder — real company information hasn't been submitted via the onboarding portal yet."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <PlaceholderImage label="Team / Office Photo" variant="brand" aspect="aspect-[4/3]" />
          <div>
            <SectionHeading eyebrow="Who We Are" title={`About ${SITE_CONFIG.name}`} />
            <p className="text-slate-600">
              [Placeholder company story] — {SITE_CONFIG.name} is a real estate platform built to make
              browsing, searching and enquiring about properties simple and transparent. Replace this
              paragraph with the client&apos;s actual company background once the onboarding portal&apos;s
              &ldquo;Company Information&rdquo; section is filled in.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Drives Us" align="center" />
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-brand p-10 text-center text-white sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-orange-400">{s.value}</p>
              <p className="mt-1 text-sm text-slate-300">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          Stats pending real figures from the client.
        </p>
      </section>
    </div>
  );
}
