import { ImageIcon } from "lucide-react";

// Stands in for real photography everywhere the site needs an image — property
// photos, gallery tiles, team photos, logo. Swap for <Image> once assets/images/
// is populated from the client onboarding portal. Deliberately looks like a
// placeholder (not a broken image) so it reads as "pending", not "bug".

const VARIANTS = {
  brand: "from-slate-800 to-slate-950 text-slate-400",
  accent: "from-orange-100 to-orange-200 text-orange-700",
  neutral: "from-vanilla/25 to-vanilla/70 text-brand-light",
} as const;

export default function PlaceholderImage({
  label,
  variant = "neutral",
  className = "",
  aspect = "aspect-[4/3]",
}: {
  label: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative flex ${aspect} w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br ${VARIANTS[variant]} ${className}`}
    >
      <ImageIcon className="h-8 w-8 opacity-60" strokeWidth={1.5} />
      <span className="px-3 text-center text-xs font-medium opacity-70">{label}</span>
    </div>
  );
}
