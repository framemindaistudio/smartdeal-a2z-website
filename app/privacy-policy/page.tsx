import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero title="Privacy Policy" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
          <strong>Draft template — not legal advice.</strong> This is generic placeholder
          text for structural purposes only. It has not been reviewed by a lawyer and must
          be reviewed/replaced before go-live, per the client&apos;s actual data practices
          and applicable law.
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
          <p>Last updated: [Date]</p>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">1. Information We Collect</h2>
            <p>
              When you use this website — for example, by submitting a contact or property
              enquiry form — we may collect information such as your name, phone number,
              email address, and any details you choose to share about your property
              requirements.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">2. How We Use Information</h2>
            <p>
              Information submitted through this website is used only to respond to your
              enquiry and to provide relevant property information. We do not sell your
              personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">3. Cookies & Analytics</h2>
            <p>
              This website may use basic analytics (e.g. Google Analytics, if enabled) to
              understand site usage. [Confirm actual analytics/cookie usage before go-live.]
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">4. Third-Party Links</h2>
            <p>
              This site may link to third-party services (e.g. WhatsApp, Google Maps). We
              are not responsible for the privacy practices of those external services.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">5. Contact</h2>
            <p>
              For questions about this policy, contact us at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-slate-800 underline">
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
