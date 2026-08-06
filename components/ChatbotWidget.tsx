"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// Chatbot icon — flat SVG, not a 3D render. The old WebGL avatar (a trimmed
// copy of the model built for the old 3D hero) never looked right shrunk to
// launcher size: a fixed canvas-sizing race with react-use-measure, then a
// procedural texture that aliased into visible grain at ~56px. Vector art
// has neither problem and stays pixel-crisp at any size. Keeps the one detail
// worth keeping from that model — the roof accent — as the "real estate"
// signifier requested earlier.
// ---------------------------------------------------------------------------

function ChatbotIcon({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="SmartDeal chatbot"
    >
      <defs>
        <linearGradient id="botHeadGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f5c46" />
          <stop offset="100%" stopColor="#0e3b2e" />
        </linearGradient>
      </defs>
      <g
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        className="animate-[bot-breathe_4s_ease-in-out_infinite]"
      >
        <rect x="48.5" y="10" width="3" height="9" rx="1.5" fill="#d84c01" />
        <circle cx="50" cy="7" r="3.4" fill="#d84c01" />
        <path d="M 50 16 L 80 36 L 20 36 Z" fill="#d84c01" />
        <rect x="15" y="32" width="70" height="60" rx="26" fill="url(#botHeadGrad)" />
        <g
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          className="animate-[bot-blink_5.5s_ease-in-out_infinite]"
        >
          <rect x="33" y="56" width="11" height="17" rx="5.5" fill="#faf7f0" />
          <rect x="56" y="56" width="11" height="17" rx="5.5" fill="#faf7f0" />
        </g>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Rule-based chat — plain decision tree, no AI/LLM calls of any kind.
// ---------------------------------------------------------------------------

type ChatAction = { type: "menu"; nodeId: string } | { type: "link"; href: string; external?: boolean };

interface ChatNode {
  bot: string;
  options: { label: string; action: ChatAction }[];
}

function buildChatNodes(): Record<string, ChatNode> {
  const waHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  const telHref = `tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`;

  return {
    root: {
      bot: "Hi! I'm the SmartDeal A2Z assistant. How can I help you today?",
      options: [
        { label: "🏠 Buy a property", action: { type: "menu", nodeId: "buy" } },
        { label: "🔑 Sell a property", action: { type: "menu", nodeId: "sell" } },
        { label: "🏢 Rent a property", action: { type: "menu", nodeId: "rent" } },
        { label: "❓ Frequently asked questions", action: { type: "menu", nodeId: "faq" } },
        { label: "☎️ Contact us", action: { type: "menu", nodeId: "contact" } },
      ],
    },
    buy: {
      bot: "Great! You can browse every verified listing, or jump straight to our featured picks.",
      options: [
        { label: "Browse all properties", action: { type: "link", href: "/properties" } },
        { label: "See featured properties", action: { type: "link", href: "/featured" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
    sell: {
      bot: "We'll help connect you with genuine buyers. Share a few details and our team follows up.",
      options: [
        { label: "List your property", action: { type: "link", href: "/sell" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
    rent: {
      bot: "Looking to rent? Here's our rentals page — you can filter by budget and location there.",
      options: [
        { label: "Browse rentals", action: { type: "link", href: "/rent" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
    faq: {
      bot: "Here are the questions buyers ask most often — the full list has more detail.",
      options: [
        { label: "Is browsing free?", action: { type: "menu", nodeId: "faq-free" } },
        { label: "Are listings verified?", action: { type: "menu", nodeId: "faq-verified" } },
        { label: "See full FAQ page", action: { type: "link", href: "/faq" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
    "faq-free": {
      bot: "Yes — browsing and sending an enquiry through the website is completely free.",
      options: [
        { label: "⬅ Back to FAQ", action: { type: "menu", nodeId: "faq" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
    "faq-verified": {
      bot: "Every property is checked for accurate details before it goes live on the site.",
      options: [
        { label: "⬅ Back to FAQ", action: { type: "menu", nodeId: "faq" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
    contact: {
      bot: `You can reach us directly — ${SITE_CONFIG.phoneDisplay} or ${SITE_CONFIG.email}.`,
      options: [
        { label: "💬 Chat on WhatsApp", action: { type: "link", href: waHref, external: true } },
        { label: "📞 Call now", action: { type: "link", href: telHref, external: true } },
        { label: "✉️ Go to contact page", action: { type: "link", href: "/contact" } },
        { label: "⬅ Back to menu", action: { type: "menu", nodeId: "root" } },
      ],
    },
  };
}

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const nodes = useMemo(() => buildChatNodes(), []);
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: nodes.root.bot }]);
  const [currentNodeId, setCurrentNodeId] = useState("root");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  function handleOption(label: string, action: ChatAction) {
    setMessages((m) => [...m, { from: "user", text: label }]);

    if (action.type === "menu") {
      const node = nodes[action.nodeId];
      setCurrentNodeId(action.nodeId);
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: node.bot }]);
      }, 300);
    } else {
      if (action.external) {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.assign(action.href);
      }
    }
  }

  const currentNode = nodes[currentNodeId];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/85 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 bg-brand/95 px-4 py-3 text-white">
            <div className="rounded-full bg-white p-0.5">
              <ChatbotIcon size={40} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">SmartDeal Assistant</p>
              <p className="flex items-center gap-1 text-xs text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Rule-based · always here
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                    m.from === "user"
                      ? "rounded-br-sm bg-[#d84c01] text-white"
                      : "rounded-bl-sm bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white/60 p-3">
            <div className="flex flex-wrap gap-2">
              {currentNode.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleOption(opt.label, opt.action)}
                  className="rounded-full border border-brand/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand shadow-sm transition-colors hover:bg-brand hover:text-white"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-xl backdrop-blur-md transition-transform hover:scale-105"
      >
        {open ? (
          <X className="h-6 w-6 text-brand" />
        ) : (
          <>
            <ChatbotIcon size={56} />
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white" />
          </>
        )}
      </button>
    </div>
  );
}
