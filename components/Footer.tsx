import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "./SocialIcons";
import { FOOTER_LINKS, NAV_LINKS, SITE_CONFIG } from "@/lib/site-config";

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

export default function Footer() {
  const socialEntries = Object.entries(SITE_CONFIG.social).filter(([, url]) => url);

  return (
    <footer className="mt-24 border-t border-slate-200 bg-brand-dark text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-block rounded-lg bg-white px-3 py-2">
              <Image src="/logo.png" alt={SITE_CONFIG.name} width={480} height={163} className="h-9 w-auto" />
            </div>
            <p className="mt-3 text-sm text-slate-400">{SITE_CONFIG.tagline}</p>
            <div className="mt-4 flex gap-3">
              {socialEntries.length > 0 ? (
                socialEntries.map(([key, url]) => {
                  const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
                      aria-label={key}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })
              ) : (
                <p className="text-xs italic text-slate-500">Social links pending client onboarding</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Resources</p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                {SITE_CONFIG.phoneDisplay}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                {SITE_CONFIG.email}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Business details, address and social links above are placeholders pending client onboarding.
          </p>
        </div>
      </div>
    </footer>
  );
}
