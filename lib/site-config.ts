// Real business details from the client's onboarding portal (Company Information
// section, filled in 2026-08-06). Still TBD: office address, Google Maps link,
// and every social media link — those fields were still "(Add here)" as of the
// last check. Domain/hosting have NOT been purchased yet (Domain section
// unanswered), so this ships on Vercel's free subdomain until the client buys one.

export const SITE_CONFIG = {
  name: "SmartDeal A2Z",
  shortName: "SmartDeal",
  tagline: "Smart Choice Better Deal",
  description:
    "SmartDeal A2Z is a next-generation PropTech platform connecting buyers, sellers, builders, developers, brokers and investors on one secure, transparent real estate ecosystem.",
  // Client's intended domain (Company Info section) — not yet purchased/confirmed
  // per the Domain section, so not live. Keep for SEO/canonical copy only.
  url: "https://smartdeala2z.com",
  phone: "+91 96999 41777",
  phoneDisplay: "+91 96999 41777",
  whatsappNumber: "918655441777", // digits only, no + or spaces, for wa.me links
  email: "smartdeala2z@gmail.com",
  address: "Address to be provided by client",
  city: "India",
  businessHours: "Mon – Sat, 9:00 AM – 7:00 PM · Online enquiries 24×7 · Site visits by appointment",
  yearsInBusiness: "25+",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/sell", label: "Sell" },
  { href: "/properties", label: "All Properties" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/featured", label: "Featured Properties" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
] as const;
