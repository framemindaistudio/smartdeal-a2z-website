import { SITE_CONFIG } from "@/lib/site-config";
import { renderBrandShareImage } from "@/lib/og-image";

export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return renderBrandShareImage();
}
