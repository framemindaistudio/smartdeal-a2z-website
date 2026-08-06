// PLACEHOLDER business details — none of this has been provided via the onboarding
// portal yet (0% complete as of Aug 2026). Replace every value here once the client
// submits Company Information / Contact Details / Social Media / Domain sections.

export const SITE_CONFIG = {
  name: "SmartDeal A2Z",
  shortName: "SmartDeal",
  tagline: "Find your next property, the smart way.",
  description:
    "SmartDeal A2Z is a premium real estate platform to browse, search and enquire about properties.",
  // TBD — awaiting client's registered domain (client purchases + provides access)
  url: "https://example.com",
  phone: "+91 00000 00000",
  phoneDisplay: "+91 00000 00000",
  whatsappNumber: "910000000000", // digits only, no + or spaces, for wa.me links
  email: "info@example.com",
  address: "Address to be provided by client",
  city: "City, State",
  businessHours: "Mon – Sat, 10:00 AM – 7:00 PM",
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
  { href: "/sell", label: "Sell" },
  { href: "/properties", label: "All Properties" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/featured", label: "Featured Properties" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
] as const;
