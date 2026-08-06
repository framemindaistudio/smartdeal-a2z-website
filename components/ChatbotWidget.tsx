"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// Robot avatar — a trimmed-down copy of the model built for the old 3D hero
// (components/ui/robot-hero.tsx, now removed). Kept only what's visible at
// launcher size: no ContactShadows, no Environment HDRI, no mouse-follow —
// just the geometry/materials plus a light idle sway, so this can stay
// mounted site-wide (every page, via the layout) without the cost the full
// hero scene had.
// ---------------------------------------------------------------------------

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return target.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}
const sharedHeartCurve = new HeartCurve();

const chassisMat = new THREE.MeshStandardMaterial({ color: "#c4c4c4", roughness: 0.85 });
const headMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 1.0 });
const earBaseMat = new THREE.MeshStandardMaterial({ color: "#f0f0f0", roughness: 0.5 });
const earRingMat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.3 });
const earCenterMat = new THREE.MeshStandardMaterial({ color: "#cccccc", roughness: 0.8 });
const antennaBaseMat = new THREE.MeshStandardMaterial({ color: "#999999", roughness: 0.4, metalness: 0.5 });
const antennaStickMat = new THREE.MeshStandardMaterial({ color: "#d0d0d0", roughness: 0.4, metalness: 0.2 });
const antennaTipMat = new THREE.MeshStandardMaterial({ color: "#d84c01", roughness: 0.2, toneMapped: false });
const roofMat = new THREE.MeshStandardMaterial({ color: "#0e3b2e", roughness: 0.5 });
const roofTrimMat = new THREE.MeshStandardMaterial({ color: "#d84c01", roughness: 0.3 });
const eyeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2, 2, 2), toneMapped: false, transparent: true });
const heartMat = new THREE.MeshBasicMaterial({ color: "#d84c01", toneMapped: false });

function RoofHat() {
  return (
    <group position={[0, 0.3, 0]}>
      <mesh rotation={[0, Math.PI / 4, 0]} material={roofMat}>
        <coneGeometry args={[0.19, 0.15, 4]} />
      </mesh>
      <mesh position={[0, -0.075, 0]} rotation={[0, Math.PI / 4, 0]} material={roofTrimMat}>
        <cylinderGeometry args={[0.195, 0.195, 0.014, 4]} />
      </mesh>
    </group>
  );
}

function RobotEar({ position, isLeft }: { position: [number, number, number]; isLeft: boolean }) {
  const dir = isLeft ? -1 : 1;
  return (
    <group position={position} scale={1.3}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={earBaseMat}>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 24]} />
      </mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={earRingMat}>
        <torusGeometry args={[0.032, 0.008, 12, 24]} />
      </mesh>
      <mesh position={[dir * 0.012, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={earCenterMat}>
        <cylinderGeometry args={[0.03, 0.03, 0.005, 24]} />
      </mesh>
      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]} material={antennaBaseMat}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 12]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} material={antennaStickMat}>
          <cylinderGeometry args={[0.003, 0.003, 0.1, 6]} />
        </mesh>
        <mesh position={[0, 0.11, 0]} material={antennaTipMat}>
          <sphereGeometry args={[0.006, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
}

function RobotEyes({ isLovedRef }: { isLovedRef: React.MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const normalRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalRef.current || !heartRef.current) return;
    const isHeart = isLovedRef.current;
    normalRef.current.visible = !isHeart;
    heartRef.current.visible = isHeart;
    const cycle = clock.getElapsedTime() % 3.0;
    const blinkDuration = 0.15;
    let scaleY = 1;
    if (cycle < blinkDuration && !isHeart) {
      scaleY = Math.max(0.05, 1 - Math.sin((cycle / blinkDuration) * Math.PI));
    }
    groupRef.current.scale.set(1, scaleY, 1);
  });

  const eyeGeo = useMemo(() => {
    const w = 0.025, h = 0.032, r = 0.018;
    const shape = new THREE.Shape();
    shape.moveTo(-w, -h);
    shape.lineTo(-w, h - r);
    shape.quadraticCurveTo(-w, h, -w + r, h);
    shape.lineTo(w - r, h);
    shape.quadraticCurveTo(w, h, w, h - r);
    shape.lineTo(w, -h);
    shape.lineTo(-w, -h);
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.02, 0.29]} scale={1.1}>
      <mesh ref={heartRef} visible={false} material={heartMat} position={[0, 0, 0]}>
        <tubeGeometry args={[sharedHeartCurve, 48, 0.006, 6, true]} />
      </mesh>
      <group ref={normalRef}>
        <mesh geometry={eyeGeo} material={eyeMat} position={[-0.07, 0, 0]} />
        <mesh geometry={eyeGeo} material={eyeMat} position={[0.07, 0, 0]} />
      </group>
    </group>
  );
}

function generatePbrTextureAsync(): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#dcdcdc";
        ctx.fillRect(0, 0, size, size);
        for (let i = 0; i < 800; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * size, Math.random() * size, 0.5 + Math.random(), 0, Math.PI * 2);
          ctx.fillStyle = Math.random() > 0.15 ? "#222222" : "#dddddd";
          ctx.fill();
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      resolve(tex);
    }, 0);
  });
}

function RobotAvatarModel() {
  const rootRef = useRef<THREE.Group>(null);
  const isLovedRef = useRef(false);
  const [colorMap, setColorMap] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let mounted = true;
    let tex: THREE.CanvasTexture | null = null;
    generatePbrTextureAsync().then((t) => {
      if (mounted) {
        tex = t;
        setColorMap(t);
      } else t.dispose();
    });
    return () => {
      mounted = false;
      tex?.dispose();
    };
  }, []);

  // Gentle idle sway instead of mouse-follow — this widget stays mounted on
  // every page, so it shouldn't need pointer tracking to feel alive.
  useFrame(({ clock }) => {
    if (!rootRef.current) return;
    const t = clock.getElapsedTime();
    rootRef.current.rotation.y = Math.sin(t * 0.6) * 0.35;
    rootRef.current.position.y = -0.28 + Math.sin(t * 1.4) * 0.02;
  });

  const handleClick = (e: import("@react-three/fiber").ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isLovedRef.current = true;
    setTimeout(() => (isLovedRef.current = false), 1500);
  };

  if (!colorMap) return null;

  return (
    <group ref={rootRef} position={[0, -0.28, 0]} onPointerDown={handleClick}>
      <mesh>
        <sphereGeometry args={[0.43, 32, 32, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
        <meshStandardMaterial color={chassisMat.color} map={colorMap} bumpScale={0.005} roughness={1} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.08, 32]} />
        <meshStandardMaterial color={chassisMat.color} map={colorMap} roughness={1} />
      </mesh>
      <group position={[0, 0.6, 0]}>
        <mesh material={headMat}>
          <sphereGeometry args={[0.28, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>
        <RoofHat />
        <RobotEyes isLovedRef={isLovedRef} />
        <RobotEar position={[-0.29, 0, 0]} isLeft={true} />
        <RobotEar position={[0.29, 0, 0]} isLeft={false} />
      </group>
    </group>
  );
}

function RobotAvatarCanvas({ size = 56 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Same react-three-fiber canvas-sizing race hit in the old hero: react-use-measure's
  // ResizeObserver can fire its first (correct) callback before r3f's own "mounted" guard
  // flips, leaving the canvas stuck at the browser's 300x150 default. This effect runs
  // after every descendant effect in the same commit — including react-use-measure's own
  // mount effect — so by the time it dispatches 'resize', that guard has already flipped
  // and the nudge lands instead of being discarded.
  useEffect(() => {
    let attempts = 0;
    const id = setInterval(() => {
      attempts++;
      const canvas = containerRef.current?.querySelector("canvas");
      const fixed = !!canvas && canvas.width > 0 && canvas.width !== 300 && canvas.height !== 150;
      if (fixed || attempts >= 20) {
        clearInterval(id);
        return;
      }
      window.dispatchEvent(new Event("resize"));
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0.28, 1.55], fov: 32 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[1, 2, 2]} intensity={0.6} />
        <RobotAvatarModel />
      </Canvas>
    </div>
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
            <div className="rounded-full bg-white/10">
              <RobotAvatarCanvas size={40} />
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
            <RobotAvatarCanvas size={56} />
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white" />
          </>
        )}
      </button>
    </div>
  );
}
