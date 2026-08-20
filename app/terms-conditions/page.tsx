import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <div>
      <PageHero title="Terms & Conditions" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
          <strong>Draft template — not legal advice.</strong> This is generic placeholder
          text for structural purposes only. It has not been reviewed by a lawyer and must
          be reviewed/replaced before go-live, per the client&apos;s actual business terms
          and applicable law.
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
          <p>Last updated: [Date]</p>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">1. About This Website</h2>
            <p>
              This website is a property browse, search and enquiry platform operated by{" "}
              {SITE_CONFIG.name}. It does not process payments, hold user accounts, or act
              as a party to any property transaction.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">2. Listing Accuracy</h2>
            <p>
              Property information is provided by {SITE_CONFIG.name} and, where applicable,
              third parties. While we aim for accuracy, all details (price, availability,
              specifications) should be independently verified before making any decision.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">3. No Financial or Legal Advice</h2>
            <p>
              Nothing on this website constitutes financial, investment, or legal advice.
              Buyers and sellers are responsible for their own due diligence.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">4. Enquiries</h2>
            <p>
              By submitting an enquiry form, you consent to being contacted by our team
              regarding your request, in line with our{" "}
              <a href="/privacy-policy" className="text-slate-800 underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">5. Limitation of Liability</h2>
            <p>
              {SITE_CONFIG.name} shall not be held liable for any disputes, losses, or
              damages arising from property transactions conducted outside this website.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-slate-900">6. Governing Law</h2>
            <p>[Confirm applicable jurisdiction with the client before go-live.]</p>
          </div>
        </div>
      </section>
    </div>
  );
}
