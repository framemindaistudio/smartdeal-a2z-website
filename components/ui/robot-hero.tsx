"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { PiHouseLineBold } from "react-icons/pi";

class HeartCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    t = t * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    return optionalTarget.set(x * 0.002, (y + 6) * 0.002, 0);
  }
}

const sharedHeartCurve = new HeartCurve();

function ResponsiveGroup({
  children,
  scale = 1,
  liftUp = false,
}: {
  children: React.ReactNode;
  scale?: number;
  liftUp?: boolean;
}) {
  const { viewport } = useThree();
  const s = Math.min(1.1, viewport.width / 3.5) * scale;
  // On phones/tablets the content card sits below the robot instead of beside
  // it (see the layout comment near the JSX below), so shift the whole robot
  // up to clear that space instead of having its lower body sit behind the card.
  const y = liftUp ? 0.55 : 0;
  return <group scale={s} position={[0, y, 0]}>{children}</group>;
}

function GlassCapsule({
  color,
  power,
  intensity,
}: {
  color: string;
  power: number;
  intensity: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color("#ffffff") },
      power: { value: 2.5 },
      intensity: { value: 0.6 },
    }),
    [],
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.color.value.set(color);
      materialRef.current.uniforms.power.value = power;
      materialRef.current.uniforms.intensity.value = intensity;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[0.3, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform float power;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
            fresnel = pow(fresnel, power);
            gl_FragColor = vec4(color, fresnel * intensity);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

const earBaseMat = new THREE.MeshStandardMaterial({
  color: "#f0f0f0",
  roughness: 0.5,
});
const earRingMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.3,
});
const earCenterMat = new THREE.MeshStandardMaterial({
  color: "#cccccc",
  roughness: 0.8,
});
const antennaBaseMat = new THREE.MeshStandardMaterial({
  color: "#999999",
  roughness: 0.4,
  metalness: 0.5,
});
const antennaStickMat = new THREE.MeshStandardMaterial({
  color: "#d0d0d0",
  roughness: 0.4,
  metalness: 0.2,
});
// Brand orange (sampled from the SmartDeal A2Z logo) instead of the original hot-pink accent
const antennaTipMat = new THREE.MeshStandardMaterial({
  color: "#d84c01",
  roughness: 0.2,
  toneMapped: false,
});

// Real-estate touch: a small pitched-roof "hat" on the robot's head, in the
// same navy + orange trim as the logo's house mark — this is what turns a
// generic assistant robot into recognizably "the SmartDeal A2Z robot" rather
// than requiring a full model swap.
const roofMat = new THREE.MeshStandardMaterial({ color: "#01143c", roughness: 0.5 });
const roofTrimMat = new THREE.MeshStandardMaterial({ color: "#d84c01", roughness: 0.3 });

function RoofHat() {
  return (
    <group position={[0, 0.3, 0]}>
      <mesh castShadow receiveShadow rotation={[0, Math.PI / 4, 0]} material={roofMat}>
        <coneGeometry args={[0.19, 0.15, 4]} />
      </mesh>
      <mesh position={[0, -0.075, 0]} rotation={[0, Math.PI / 4, 0]} material={roofTrimMat}>
        <cylinderGeometry args={[0.195, 0.195, 0.014, 4]} />
      </mesh>
    </group>
  );
}

function RobotEar({
  position,
  scale = 1,
  isLeft = false,
}: {
  position: [number, number, number];
  scale?: number;
  isLeft?: boolean;
}) {
  const dir = isLeft ? -1 : 1;

  return (
    <group position={position} scale={scale}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earBaseMat}
      >
        <cylinderGeometry args={[0.04, 0.04, 0.025, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earRingMat}
      >
        <torusGeometry args={[0.032, 0.008, 16, 32]} />
      </mesh>

      <mesh
        position={[dir * 0.012, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        material={earCenterMat}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.005, 32]} />
      </mesh>

      <group position={[dir * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh
          position={[0, 0.01, 0]}
          castShadow
          receiveShadow
          material={antennaBaseMat}
        >
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
        </mesh>
        <mesh
          position={[0, 0.06, 0]}
          castShadow
          receiveShadow
          material={antennaStickMat}
        >
          <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        </mesh>
        <mesh
          position={[0, 0.11, 0]}
          castShadow
          receiveShadow
          material={antennaTipMat}
        >
          <sphereGeometry args={[0.006, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

const eyeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(2, 2, 2),
  toneMapped: false,
  transparent: true,
});
// Brand orange heart easter-egg (click/tap the robot) instead of the original hot-pink
const heartMat = new THREE.MeshBasicMaterial({
  color: "#d84c01",
  toneMapped: false,
});

function RobotEye({
  position,
  rotation,
  scale = 1,
  blinkDuration = 0.15,
  blinkCycle = 3.0,
  isLovedRef,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  blinkDuration?: number;
  blinkCycle?: number;
  isLovedRef: React.MutableRefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const normalEyesRef = useRef<THREE.Group>(null);
  const heartEyeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !normalEyesRef.current || !heartEyeRef.current)
      return;

    const isHeart = isLovedRef.current;

    normalEyesRef.current.visible = !isHeart;
    heartEyeRef.current.visible = isHeart;

    const cycle = clock.getElapsedTime() % blinkCycle;

    let targetScaleY = 1;

    if (cycle < blinkDuration && !isHeart) {
      const progress = cycle / blinkDuration;
      const blinkClose = Math.sin(progress * Math.PI);

      targetScaleY = Math.max(0.05, 1.0 - blinkClose);
    }

    groupRef.current.scale.set(scale, scale * targetScaleY, scale);
  });

  const { topPath, bottomPath } = useMemo(() => {
    const w = 0.025;
    const h = 0.035;
    const r = 0.02;
    const g = 0.005;

    const tPath = new THREE.CurvePath<THREE.Vector3>();
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w, g, 0),
        new THREE.Vector3(-w, h - r, 0),
      ),
    );
    tPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-w, h - r, 0),
        new THREE.Vector3(-w, h, 0),
        new THREE.Vector3(-w + r, h, 0),
      ),
    );
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w + r, h, 0),
        new THREE.Vector3(w - r, h, 0),
      ),
    );
    tPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(w - r, h, 0),
        new THREE.Vector3(w, h, 0),
        new THREE.Vector3(w, h - r, 0),
      ),
    );
    tPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(w, h - r, 0),
        new THREE.Vector3(w, g, 0),
      ),
    );

    const bPath = new THREE.CurvePath<THREE.Vector3>();
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w, -g, 0),
        new THREE.Vector3(-w, -(h - r), 0),
      ),
    );
    bPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-w, -(h - r), 0),
        new THREE.Vector3(-w, -h, 0),
        new THREE.Vector3(-w + r, -h, 0),
      ),
    );
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(-w + r, -h, 0),
        new THREE.Vector3(w - r, -h, 0),
      ),
    );
    bPath.add(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(w - r, -h, 0),
        new THREE.Vector3(w, -h, 0),
        new THREE.Vector3(w, -(h - r), 0),
      ),
    );
    bPath.add(
      new THREE.LineCurve3(
        new THREE.Vector3(w, -(h - r), 0),
        new THREE.Vector3(w, -g, 0),
      ),
    );

    return { topPath: tPath, bottomPath: bPath };
  }, []);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={heartEyeRef} visible={false} material={heartMat}>
        <tubeGeometry args={[sharedHeartCurve, 64, 0.0035, 8, true]} />
      </mesh>

      <group ref={normalEyesRef}>
        <mesh material={eyeMat}>
          <tubeGeometry args={[topPath, 20, 0.0035, 8, false]} />
        </mesh>
        <mesh material={eyeMat}>
          <tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} />
        </mesh>
      </group>
    </group>
  );
}

function generatePbrTexturesAsync(): Promise<{
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const size = 512;
      const canvasC = document.createElement("canvas");
      const canvasB = document.createElement("canvas");
      canvasC.width = canvasB.width = size;
      canvasC.height = canvasB.height = size;
      const ctxC = canvasC.getContext("2d");
      const ctxB = canvasB.getContext("2d");

      if (ctxC && ctxB) {
        ctxC.fillStyle = "#dcdcdc";
        ctxC.fillRect(0, 0, size, size);
        ctxB.fillStyle = "#808080";
        ctxB.fillRect(0, 0, size, size);

        for (let i = 0; i < 10000; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = 0.5 + Math.random() * 1.5;
          const isDark = Math.random() > 0.15;

          ctxC.beginPath();
          ctxC.arc(x, y, r, 0, Math.PI * 2);
          ctxC.fillStyle = isDark ? "#222222" : "#dddddd";
          ctxC.fill();

          ctxB.beginPath();
          ctxB.arc(x, y, r, 0, Math.PI * 2);
          ctxB.fillStyle = isDark ? "#000000" : "#ffffff";
          ctxB.fill();
        }
      }

      const texC = new THREE.CanvasTexture(canvasC);
      const texB = new THREE.CanvasTexture(canvasB);
      texC.wrapS = texB.wrapS = THREE.RepeatWrapping;
      texC.wrapT = texB.wrapT = THREE.RepeatWrapping;

      texC.repeat.set(6, 3);
      texB.repeat.set(6, 3);
      texC.needsUpdate = true;
      texB.needsUpdate = true;

      resolve({ colorMap: texC, bumpMap: texB });
    }, 0);
  });
}

function RobotPrototype({
  neckParams = {
    baseR: 0.25,
    baseH: -0.01,
    midR: 0.23,
    midH: 0.02,
    lipBottomR: 0.27,
    lipBottomH: 0.025,
    lipTopR: 0.28,
    lipTopH: 0.05,
    innerR: 0.24,
    innerDropH: 0.03,
  },
  bodyParams = { bodyBevelR: 0.21, bodyBevelY: 0.38, bodyBevelT: 0.015 },
  color = "#c4c4c4",
  pantallaColor = "#00ffc6",
  pantallaBrillo = 1.2,
  blinkCycle = 3.0,
  metalness = 0.0,
}: {
  neckParams?: Record<string, number>;
  bodyParams?: Record<string, number>;
  color?: string;
  pantallaColor?: string;
  pantallaBrillo?: number;
  blinkCycle?: number;
  metalness?: number;
}) {
  const isLovedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const [textures, setTextures] = useState<{
    colorMap: THREE.CanvasTexture | null;
    bumpMap: THREE.CanvasTexture | null;
  }>({ colorMap: null, bumpMap: null });

  const design = {
    pantallaColor: pantallaColor,
    pantallaGrosor: 3.8,
    pantallaBrillo: pantallaBrillo,
    separacionOjos: 0.07,
    tamañoOrejas: 1.3,
    escalaOjos: 1.1,
    parpadeoFrecuencia: blinkCycle,
    parpadeoDuracion: 0.45,
    colorChasis: color,
    alturaCabeza: 0.6,
  };

  const config = {
    moveSpeed: 0.35,
    bodyRotSpeed: 10.0,
    headRotSpeed: 20.0,
    bodyTiltX: 0.0,
    bodyTiltY: 0.95,
    headLookX: 0.3,
    headLookY: 1.8,
  };

  useFrame((state, delta) => {
    if (!bodyRef.current || !headRef.current) return;

    const dt = Math.min(delta, 0.1);

    const tx = state.pointer.x;
    const ty = state.pointer.y;

    const maxMoveX = state.viewport.width / 3.5;
    const targetPosX = tx * maxMoveX;
    bodyRef.current.position.x = THREE.MathUtils.lerp(
      bodyRef.current.position.x,
      targetPosX,
      config.moveSpeed * dt,
    );

    const relativeX = tx - bodyRef.current.position.x / 2.5;

    const bodyTargetRotY = -relativeX * config.bodyTiltY;

    const bodyTargetRotX = relativeX * relativeX * config.bodyTiltX - ty * 0.25;

    const bodyTargetRotZ = -relativeX * 0.15;

    bodyRef.current.rotation.y = THREE.MathUtils.lerp(
      bodyRef.current.rotation.y,
      bodyTargetRotY,
      config.bodyRotSpeed * dt,
    );
    bodyRef.current.rotation.x = THREE.MathUtils.lerp(
      bodyRef.current.rotation.x,
      bodyTargetRotX,
      config.bodyRotSpeed * dt,
    );
    bodyRef.current.rotation.z = THREE.MathUtils.lerp(
      bodyRef.current.rotation.z,
      bodyTargetRotZ,
      config.bodyRotSpeed * dt,
    );

    const headTargetRotY = relativeX * config.headLookY;
    const headTargetRotX = -ty * config.headLookX;

    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      headTargetRotY,
      config.headRotSpeed * dt,
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      headTargetRotX,
      config.headRotSpeed * dt,
    );
  });

  useEffect(() => {
    let mounted = true;
    let generatedMaps: {
      colorMap: THREE.CanvasTexture;
      bumpMap: THREE.CanvasTexture;
    } | null = null;

    generatePbrTexturesAsync().then((res) => {
      if (mounted) {
        generatedMaps = res;
        setTextures(res);
      } else {
        res.colorMap.dispose();
        res.bumpMap.dispose();
      }
    });

    return () => {
      mounted = false;

      if (generatedMaps) {
        generatedMaps.colorMap.dispose();
        generatedMaps.bumpMap.dispose();
      }
    };
  }, []);

  const handlePointerDown = (
    e: import("@react-three/fiber").ThreeEvent<PointerEvent>,
  ) => {
    e.stopPropagation();
    isLovedRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isLovedRef.current = false;
    }, 2000);
  };

  const neckProfile = useMemo(() => {
    const points = [];

    points.push(new THREE.Vector2(neckParams.innerR, neckParams.baseH));

    points.push(new THREE.Vector2(neckParams.baseR, neckParams.baseH));

    points.push(new THREE.Vector2(neckParams.midR, neckParams.midH));

    points.push(
      new THREE.Vector2(neckParams.lipBottomR, neckParams.lipBottomH),
    );

    points.push(new THREE.Vector2(neckParams.lipTopR, neckParams.lipTopH));

    points.push(new THREE.Vector2(neckParams.innerR, neckParams.lipTopH));

    points.push(
      new THREE.Vector2(
        neckParams.innerR,
        neckParams.lipTopH - neckParams.innerDropH,
      ),
    );
    return points;
  }, [neckParams]);

  const headMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#111111",
      roughness: 1.0,
      metalness: 0.0,
    });
  }, []);

  if (!textures.colorMap) return null;

  return (
    <group
      ref={bodyRef}
      position={[0, -0.3, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry
          args={[0.43, 64, 64, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]}
        />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={1.0}
          metalness={metalness}
          envMapIntensity={0.0}
        />
      </mesh>

      {bodyParams.bodyBevelT > 0 && (
        <mesh
          position={[0, bodyParams.bodyBevelY, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <torusGeometry
            args={[bodyParams.bodyBevelR, bodyParams.bodyBevelT, 32, 64]}
          />
          <meshStandardMaterial
            color={design.colorChasis}
            map={textures.colorMap || undefined}
            bumpMap={textures.bumpMap || undefined}
            bumpScale={0.005}
            roughness={1.0}
            metalness={metalness}
            envMapIntensity={0.0}
          />
        </mesh>
      )}

      <mesh position={[0, 0.38, 0]} receiveShadow castShadow>
        <latheGeometry args={[neckProfile, 64]} />
        <meshStandardMaterial
          color={design.colorChasis}
          map={textures.colorMap || undefined}
          bumpMap={textures.bumpMap || undefined}
          bumpScale={0.005}
          roughness={1.0}
          metalness={metalness}
          envMapIntensity={0.0}
        />
      </mesh>

      <group ref={headRef} position={[0, design.alturaCabeza, 0]}>
        <mesh material={headMat} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI]} />
        </mesh>

        <RoofHat />

        <GlassCapsule
          color={design.pantallaColor}
          power={design.pantallaGrosor}
          intensity={design.pantallaBrillo}
        />

        <group position={[0, -0.02, 0.29]}>
          <RobotEye
            position={[-design.separacionOjos, 0, 0]}
            rotation={[0, -0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
          <RobotEye
            position={[design.separacionOjos, 0, 0]}
            rotation={[0, 0.2, 0]}
            scale={design.escalaOjos}
            blinkDuration={design.parpadeoDuracion}
            blinkCycle={design.parpadeoFrecuencia}
            isLovedRef={isLovedRef}
          />
        </group>

        <RobotEar
          position={[-0.29, 0, 0]}
          isLeft={true}
          scale={design.tamañoOrejas}
        />
        <RobotEar
          position={[0.29, 0, 0]}
          isLeft={false}
          scale={design.tamañoOrejas}
        />
      </group>
    </group>
  );
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Evening";
}

/**
 * A plain-HTML (not Three.js) thought-bubble overlay near the robot's head,
 * greeting visitors by time of day. Kept as a DOM element rather than in-canvas
 * text/sprite for legible, crisp text at any zoom with none of the extra
 * dependencies real text-in-WebGL would need. Positioned at a fixed point that
 * lines up with the robot's default (centered, no mouse movement) pose — it
 * won't chase the robot during desktop mouse-follow, which is an acceptable
 * trade for staying simple.
 */
function GreetingCloud({ compact }: { compact: boolean }) {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(getTimeGreeting());
    const id = setInterval(() => setGreeting(getTimeGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!greeting) return null;

  return (
    <div
      className={`pointer-events-none absolute z-30 animate-[fade-in-cloud_0.6s_ease-out_0.4s_both] ${
        compact ? "left-1/2 top-[6%] -translate-x-1/2" : "left-[54%] top-[10%]"
      }`}
    >
      <div className="relative">
        {/* Puffs layered behind the main body to read as a cloud silhouette */}
        <div className="absolute -left-3 top-2 h-7 w-7 rounded-full bg-white/95 shadow-sm" />
        <div className="absolute -right-4 top-0 h-9 w-9 rounded-full bg-white/95 shadow-sm" />
        <div className="absolute left-5 -top-3 h-8 w-8 rounded-full bg-white/95 shadow-sm" />
        <div className="relative flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2.5 shadow-lg">
          <span className="text-sm font-bold whitespace-nowrap text-[#01143c]">{greeting}!</span>
          <span aria-hidden="true">👋</span>
        </div>
      </div>
      {/* Thought-bubble tail: shrinking dots trailing down toward the robot's head */}
      <div className="absolute left-[38%] top-full mt-1.5 h-3 w-3 rounded-full bg-white/90 shadow-sm" />
      <div className="absolute left-[32%] top-full mt-6 h-2 w-2 rounded-full bg-white/85 shadow-sm" />
      <div className="absolute left-[28%] top-full mt-9 h-1.5 w-1.5 rounded-full bg-white/80" />
    </div>
  );
}

/** Faint, abstract building silhouettes along the bottom edge — evokes a
 * skyline without being literal renders, sitting behind the (transparent-bg)
 * Canvas so it reads as atmospheric depth rather than competing with the robot. */
function CitySkyline() {
  const buildings = [
    { x: 0, w: 70, h: 130 }, { x: 65, w: 45, h: 190 }, { x: 105, w: 60, h: 110 },
    { x: 160, w: 50, h: 220 }, { x: 205, w: 75, h: 150 }, { x: 275, w: 40, h: 260 },
    { x: 310, w: 65, h: 100 }, { x: 370, w: 55, h: 200 }, { x: 420, w: 80, h: 160 },
    { x: 495, w: 45, h: 230 }, { x: 535, w: 70, h: 120 }, { x: 600, w: 50, h: 190 },
    { x: 645, w: 90, h: 140 }, { x: 730, w: 40, h: 250 }, { x: 765, w: 65, h: 105 },
    { x: 825, w: 55, h: 210 }, { x: 875, w: 75, h: 160 }, { x: 945, w: 45, h: 235 },
    { x: 985, w: 70, h: 125 }, { x: 1050, w: 50, h: 195 }, { x: 1095, w: 85, h: 145 },
    { x: 1175, w: 40, h: 255 }, { x: 1210, w: 65, h: 110 }, { x: 1270, w: 55, h: 205 },
    { x: 1320, w: 75, h: 155 }, { x: 1390, w: 50, h: 230 },
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] w-full"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {buildings.map((b, i) => (
        <rect key={i} x={b.x} y={300 - b.h} width={b.w} height={b.h} fill="#01143c" opacity={0.07} />
      ))}
    </svg>
  );
}

export interface NavItem {
  label: string;
  href: string;
  target?: string;
}

export interface RobotHeroProps {
  backgroundText?: string;
  navItemsLeft?: NavItem[];
  contactText?: string;
  contactHref?: string;
  contactTarget?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  color?: string;
  scale?: number;
  pantallaColor?: string;
  pantallaBrillo?: number;
  blinkCycle?: number;
  metalness?: number;
  /** Set false when the page already renders its own site-wide nav, to avoid a duplicate navbar. */
  showNavbar?: boolean;
  /** Content for the empty bottom-anchored area the original component left blank. */
  eyebrow?: string;
  headline?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

function AntennaNavbar({
  leftItems,
  contactText,
  contactHref,
  contactTarget,
  ctaText,
  onCtaClick,
}: {
  leftItems: NavItem[];
  contactText: string;
  contactHref: string;
  contactTarget?: string;
  ctaText: string;
  onCtaClick?: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const lineOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <nav className="sticky top-0 z-50 w-full pt-8 px-8 pointer-events-none">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col relative pointer-events-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between relative gap-4 lg:gap-0">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 sm:gap-3 z-20">
            {leftItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                rel={
                  item.target === "_blank" ? "noopener noreferrer" : undefined
                }
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-7 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-all overflow-hidden shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
              >
                {item.label}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbar-indicator-left"
                    className="absolute inset-0 border-b-[3px] border-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-auto cursor-pointer group z-10">
            <div className="relative flex items-center justify-center h-12 w-16">
              <div className="absolute left-2 w-1.5 h-4 bg-zinc-300 rounded-l-md transition-transform duration-300 group-hover:-translate-x-1" />
              <div className="absolute right-2 w-1.5 h-4 bg-zinc-300 rounded-r-md transition-transform duration-300 group-hover:translate-x-1" />

              <div className="z-10 w-10 h-10 bg-white/10 border-2 border-white/20 backdrop-blur-md rounded-[12px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_4px_25px_rgba(255,255,255,0.15)]">
                <div className="w-[70%] h-[60%] bg-[#0a0a0a] rounded-lg flex items-center justify-center gap-1.5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                  <div className="w-1.5 h-3 bg-[#d84c01] rounded-[2px] shadow-[0_0_8px_#d84c01] transition-transform duration-200 group-hover:scale-y-[0.2]" />
                  <div className="w-1.5 h-3 bg-[#d84c01] rounded-[2px] shadow-[0_0_8px_#d84c01] transition-transform duration-200 group-hover:scale-y-[0.2]" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2 sm:gap-3 w-full lg:w-auto mt-4 lg:mt-0 z-20">
            <a
              href={contactHref}
              target={contactTarget}
              rel={
                contactTarget === "_blank" ? "noopener noreferrer" : undefined
              }
              className="px-5 sm:px-7 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-bold transition-all shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
            >
              {contactText}
            </a>
            <button
              onClick={onCtaClick}
              className="px-5 sm:px-7 py-2.5 rounded-full bg-[#d84c01] text-white text-xs sm:text-sm font-black hover:bg-[#b33e00] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(216,76,1,0.4)]"
            >
              {ctaText}
              <PiHouseLineBold size={18} />
            </button>
          </div>
        </div>

        <motion.div
          style={{ opacity: lineOpacity }}
          className="w-full mt-6 border-b-2 border-dotted border-white/30"
        />
      </div>
    </nav>
  );
}

export function RobotHero({
  backgroundText = "SMARTDEAL A2Z",
  navItemsLeft = [
    { label: "Buy", href: "/buy" },
    { label: "Sell", href: "/sell" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
  ],
  contactText = "Contact",
  contactHref = "/contact",
  contactTarget,
  ctaText = "Browse Now",
  onCtaClick,
  color = "#c4c4c4",
  scale = 1,
  pantallaColor = "#d84c01",
  pantallaBrillo = 1.2,
  blinkCycle = 3.0,
  metalness = 0.0,
  showNavbar = true,
  eyebrow = "SmartDeal A2Z · Property Platform",
  headline = "Find your next property, the smart way.",
  description = "Browse, search and enquire about verified properties with a fast, modern, elegant experience.",
  primaryCtaText = "Browse Properties",
  primaryCtaHref = "/properties",
  secondaryCtaText = "Sell Your Property",
  secondaryCtaHref = "/sell",
}: RobotHeroProps = {}) {
  const containerRef = useRef<HTMLElement>(null);

  // The original fixed "15vw" watermark size clips long strings (it was tuned
  // for "UITHEFACTORY" and never re-checked against a real caller's text) —
  // scale it to the actual string length instead, so it stays legible without
  // ever overflowing its container regardless of what backgroundText is passed.
  const watermarkVw = Math.min(15, Math.max(6, 88 / (backgroundText.length * 0.62)));

  // react-three-fiber sizes <Canvas> via react-use-measure's ResizeObserver on
  // its container, gated behind a "mounted" ref that only flips true inside a
  // (paint-deferred) useEffect. The observer's very first callback — carrying
  // the correct size — can fire and get silently discarded before that flag
  // flips, and nothing then naturally triggers a re-measure, leaving the
  // canvas stuck at the browser's 300x150 default.
  //
  // Fix, in two parts: (1) measure the real container ourselves and hold off
  // mounting <Canvas> until we have that size, so its own ResizeObserver only
  // ever attaches to an already-settled layout; (2) once mounted, dispatch one
  // extra 'resize' event a tick later — react-use-measure also listens on
  // window 'resize' — timed to land after its mount effect has actually run,
  // so this later measurement isn't dropped by the same guard.
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => setCanvasSize({ width: el.clientWidth, height: el.clientHeight });
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Below `lg`, the content card moves from "beside the robot" to "below it"
  // (see the JSX layout further down) — this tracks that same breakpoint so
  // the 3D robot and the greeting bubble know to reposition in step with it.
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canvasSize) return;

    // A single fixed delay isn't reliable here — how long react-use-measure's
    // mount effect takes to flip its internal "ready" guard varies enough
    // between dev/prod and across loads that a magic number sometimes lands
    // before it and sometimes after. Poll instead: keep nudging with a
    // 'resize' dispatch and checking the real canvas element until its
    // backing buffer actually reflects our measured size (or give up after a
    // couple of seconds — well past any timing this race has shown in
    // practice — rather than retry forever).
    let attempts = 0;
    const maxAttempts = 20;
    const id = setInterval(() => {
      attempts++;
      const canvas = containerRef.current?.querySelector("canvas");
      const fixed = !!canvas && canvas.width > 0 && canvas.height > 0 && canvas.width !== 300 && canvas.height !== 150;
      if (fixed || attempts >= maxAttempts) {
        clearInterval(id);
        return;
      }
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearInterval(id);
  }, [canvasSize]);

  const entorno = {
    fondoArriba: "#cecbcb",
    fondoMedio: "#9a9a9a",
    fondoAbajo: "#bebebe",
    luzAmbiente: 0.75,
    luzPrincipal: 0.0,
    luzPrincipalColor: "#00ffe2",
    luzRelleno: 0.0,
    luzRellenoColor: "#dbdbdb",
    sombraOpacidad: 0.85,
    sombraBlur: 1.7,
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh min-h-[600px] overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${entorno.fondoArriba} 0%, ${entorno.fondoArriba} 55%, ${entorno.fondoMedio} 65%, ${entorno.fondoAbajo} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <h1
          className="font-sans font-black select-none whitespace-nowrap"
          style={{
            color: "#000000",
            opacity: 0.13,
            letterSpacing: "-0.05em",
            fontSize: `clamp(2.4rem, ${watermarkVw}vw, 12rem)`,
            lineHeight: 1,
            transform: `translate(0px, 40px) rotate(0deg)`,
          }}
        >
          {backgroundText}
        </h1>
      </div>

      <CitySkyline />

      <div className="absolute inset-0 z-10">
        {/* Deferred until the container's real size is measured — mounting
            Canvas (and its internal react-use-measure ResizeObserver) only
            once layout has already settled avoids a race where that observer's
            first callback fires before the container has its final size. */}
        {canvasSize && (
        <Canvas
          shadows
          camera={{ position: [0, 0.2, 6], fov: 40 }}
        >
          <ambientLight intensity={entorno.luzAmbiente} color="#ffffff" />

          <directionalLight
            position={[0, 6, 3]}
            intensity={entorno.luzPrincipal}
            color={entorno.luzPrincipalColor}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005}
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-1.5, 1.5, 1.5, -1.5, 0.1, 20]}
            />
          </directionalLight>

          <directionalLight
            position={[-5, 2, -5]}
            intensity={entorno.luzRelleno}
            color={entorno.luzRellenoColor}
          />

          <Environment preset="studio" blur={0.5} />

          <ResponsiveGroup scale={scale} liftUp={isCompact}>
            <ContactShadows
              position={[0, -0.79, 0]}
              opacity={entorno.sombraOpacidad}
              scale={15}
              resolution={1024}
              blur={entorno.sombraBlur}
              far={2.5}
              color="#000000"
            />
            <RobotPrototype
              neckParams={{
                baseR: 0.215,
                baseH: -0.05,
                midR: 0.28,
                midH: 0.02,
                lipBottomR: 0.295,
                lipBottomH: 0.045,
                lipTopR: 0.27,
                lipTopH: 0.055,
                innerR: 0.1,
                innerDropH: 0.0,
              }}
              bodyParams={{
                bodyBevelR: 0.235,
                bodyBevelY: 0.34,
                bodyBevelT: 0.025,
              }}
              color={color}
              pantallaColor={pantallaColor}
              pantallaBrillo={pantallaBrillo}
              blinkCycle={blinkCycle}
              metalness={metalness}
            />
          </ResponsiveGroup>
        </Canvas>
        )}
      </div>

      <GreetingCloud compact={isCompact} />

      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col">
        {showNavbar && (
          <AntennaNavbar
            leftItems={navItemsLeft}
            contactText={contactText}
            contactHref={contactHref}
            contactTarget={contactTarget}
            ctaText={ctaText}
            onCtaClick={onCtaClick}
          />
        )}

        {/* Below `lg` the robot renders roughly centered with no side room for
            the card, so instead of overlaying it (which hid the robot
            entirely on phones) the card is pushed down below the robot's
            visible area via a viewport-height top margin, combined with
            ResponsiveGroup's `liftUp` nudging the robot itself higher. At
            `lg`+ there's enough width for both side by side, so it reverts
            to the original bottom-anchored layout. */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-8 flex-1 flex flex-col">
          <div className="mt-[44vh] sm:mt-[38vh] lg:mt-auto flex flex-col gap-6 pb-8 lg:pb-12 w-full lg:flex-row lg:items-end lg:justify-between">
            <div className="pointer-events-auto max-w-xl rounded-2xl bg-white/75 lg:bg-white/40 p-5 sm:p-6 shadow-xl lg:shadow-none backdrop-blur-md">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#d84c01]">
                {eyebrow}
              </p>
              <h2 className="text-2xl font-black leading-tight text-black sm:text-3xl lg:text-4xl">
                {headline}
              </h2>
              <p className="mt-3 text-sm text-black/70 sm:text-base">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={primaryCtaHref}
                  className="rounded-full bg-[#d84c01] px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(216,76,1,0.35)] transition-colors hover:bg-[#b33e00]"
                >
                  {primaryCtaText}
                </a>
                <a
                  href={secondaryCtaHref}
                  className="rounded-full border border-black/15 bg-white/70 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
                >
                  {secondaryCtaText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RobotHero;
