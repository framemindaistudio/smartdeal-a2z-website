import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
};

// Site-wide business identity for search engines. Deliberately omits `address` —
// SITE_CONFIG.address is still "Address to be provided by client", and publishing
// a placeholder as structured data would tell Google something false. `sameAs`
// only includes social links that are actually filled in, so it's empty (and
// omitted) today but picks up real profiles automatically once SITE_CONFIG.social
// is filled in — no schema edit needed then.
const socialLinks = Object.values(SITE_CONFIG.social).filter(Boolean);
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_CONFIG.name,
  alternateName: SITE_CONFIG.shortName,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  image: `${SITE_CONFIG.url}/logo.png`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
      <GoogleAnalytics gaId={SITE_CONFIG.googleAnalyticsId} />
    </html>
  );
}
