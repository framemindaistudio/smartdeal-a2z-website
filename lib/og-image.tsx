import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_CONFIG } from "@/lib/site-config";

// Shared by app/opengraph-image.tsx and app/twitter-image.tsx so the two link-preview
// images can't drift out of sync with each other.
export async function renderBrandShareImage() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f5c46 0%, #0e3b2e 55%, #082720 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#ffffff",
            borderRadius: 28,
            padding: "28px 48px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={480} height={163} alt="" />
        </div>
        <div style={{ marginTop: 44, fontSize: 40, fontWeight: 600, color: "#faf7f0" }}>
          {SITE_CONFIG.tagline}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            fontWeight: 700,
            color: "#fdba74",
            letterSpacing: 3,
          }}
        >
          ONE PLATFORM FOR ALL REAL ESTATE NEEDS
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
