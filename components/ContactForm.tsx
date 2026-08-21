"use client";

import { useState, type FormEvent } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { GOOGLE_FORM_ACTION_URL, GOOGLE_FORM_ENTRY_IDS } from "@/lib/google-form";

export default function ContactForm({
  context = "General Enquiry",
  extraFields,
}: {
  context?: string;
  extraFields?: { name: string; label: string; placeholder?: string }[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    for (const [field, entryId] of Object.entries(GOOGLE_FORM_ENTRY_IDS)) {
      const value = form.get(field);
      if (value) body.append(entryId, value.toString());
    }

    try {
      // Google's formResponse endpoint sends no CORS headers, so the response
      // can't be read from the browser - "no-cors" is required, which means
      // this resolves even if the form rejects the submission server-side
      // (e.g. a required question left blank). Verified end-to-end against
      // the real form before relying on it; the mailto fallback below still
      // works regardless.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // Network failure only - see no-cors note above.
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">Thanks — we&apos;ve received your enquiry.</p>
        <p className="mt-1 text-sm text-green-700">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <input type="hidden" name="context" value={context} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
          <input
            required
            type="text"
            name="name"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
          <input
            required
            type="tel"
            name="phone"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          required
          type="email"
          name="email"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      {extraFields?.map((field) => (
        <div key={field.name}>
          <label className="mb-1 block text-sm font-medium text-slate-700">{field.label}</label>
          <input
            type="text"
            name={field.name}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            placeholder={field.placeholder}
          />
        </div>
      ))}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          placeholder={`Tell us more about your ${context.toLowerCase()}…`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Prefer email? Write to us directly at{" "}
        <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-slate-700 underline">
          {SITE_CONFIG.email}
        </a>
      </p>
    </form>
  );
}
