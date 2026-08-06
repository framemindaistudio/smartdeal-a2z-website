import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

// "WhatsApp click button (simple link)" per proposal scope — no WhatsApp Business
// API, just a wa.me deep link. Number is a placeholder until onboarding is filled.
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full bg-green-500 p-4 text-white shadow-lg transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  );
}
