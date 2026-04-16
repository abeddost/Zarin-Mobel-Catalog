"use client";

/*
 * Quiet Italian Modernism
 * File intent: build a cinematic, sculptural hero that presents Toscana as a luxury object in motion.
 * Keep movement slow and editorial, favor warm limestone and bronze atmospherics, and avoid playful or retail-like interactions.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const HERO_BACKDROP_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663561989346/nLgKoZKeUx6VRLWuH84e6i/casalini-hero-architectural-backdrop-SKzto7Zwhkd3k2uHfocY6Y.webp";
const BRONZE_ATMOSPHERE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663561989346/nLgKoZKeUx6VRLWuH84e6i/casalini-bronze-atmosphere-4YrxVNGJTCo2ieg3QXB5gM.webp";
const LIGHT_PANEL_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663561989346/nLgKoZKeUx6VRLWuH84e6i/casalini-soft-light-panel-JsmV6bdJdG9Sw2995R6nd4.webp";
const TOSCANA_CUTOUT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663561989346/nLgKoZKeUx6VRLWuH84e6i/toscana-hero-cutout_3a298e0e.png";

type ToscanaHeroProps = {
  onExploreCatalogue: () => void;
};

type HeroSceneProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

function createShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(512, 512, 120, 512, 512, 420);
  gradient.addColorStop(0, "rgba(17, 11, 7, 0.55)");
  gradient.addColorStop(0.5, "rgba(17, 11, 7, 0.22)");
  gradient.addColorStop(1, "rgba(17, 11, 7, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function HeroScene({ progress, reducedMotion }: HeroSceneProps) {
  const sofaRef = useRef<THREE.Group>(null);
  const bronzePlaneRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const panelRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const glowRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const { camera, pointer, viewport } = useThree();
  const [backdropTexture, bronzeTexture, panelTexture, sofaTexture] = useTexture([
    HERO_BACKDROP_URL,
    BRONZE_ATMOSPHERE_URL,
    LIGHT_PANEL_URL,
    TOSCANA_CUTOUT_URL,
  ]);
  const shadowTexture = useMemo(createShadowTexture, []);

  useEffect(() => {
    [backdropTexture, bronzeTexture, panelTexture, sofaTexture].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });
    sofaTexture.flipY = true;
  }, [backdropTexture, bronzeTexture, panelTexture, sofaTexture]);

  useFrame((state, delta) => {
    const heroProgress = progress.get();
    const eased = THREE.MathUtils.smoothstep(heroProgress, 0, 1);
    const pointerX = reducedMotion ? 0 : pointer.x * 0.14;
    const pointerY = reducedMotion ? 0 : pointer.y * 0.08;

    const cameraX = THREE.MathUtils.lerp(1.05, -0.55, eased) + pointerX;
    const cameraY = THREE.MathUtils.lerp(0.46, 0.72, eased) + pointerY;
    const cameraZ = THREE.MathUtils.lerp(6.1, 3.85, eased);
    camera.position.lerp(new THREE.Vector3(cameraX, cameraY, cameraZ), 1 - Math.exp(-delta * 2.6));
    camera.lookAt(0, 0.18, 0);

    if (sofaRef.current) {
      const x = THREE.MathUtils.lerp(1.34, -0.44, eased) + pointer.x * 0.14;
      const y = THREE.MathUtils.lerp(-0.18, 0.26, eased) + pointer.y * 0.05;
      const z = THREE.MathUtils.lerp(0.05, 0.55, eased);
      const rotY = THREE.MathUtils.lerp(-0.34, 0.22, eased) + pointer.x * 0.08;
      const rotX = THREE.MathUtils.lerp(0.05, -0.03, eased) + pointer.y * 0.04;
      const scale = THREE.MathUtils.lerp(1.9, 1.38, eased);

      sofaRef.current.position.lerp(new THREE.Vector3(x, y, z), 1 - Math.exp(-delta * 3.2));
      sofaRef.current.rotation.x = THREE.MathUtils.lerp(sofaRef.current.rotation.x, rotX, 1 - Math.exp(-delta * 3.2));
      sofaRef.current.rotation.y = THREE.MathUtils.lerp(sofaRef.current.rotation.y, rotY, 1 - Math.exp(-delta * 3.2));
      sofaRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-delta * 3.2));
    }

    if (bronzePlaneRef.current) {
      bronzePlaneRef.current.material.opacity = THREE.MathUtils.lerp(0.15, 0.5, eased);
      bronzePlaneRef.current.rotation.z = -0.18 + eased * 0.32;
      bronzePlaneRef.current.position.x = 1.2 - eased * 0.7;
    }

    if (panelRef.current) {
      panelRef.current.position.x = -2.7 + eased * 0.35;
      panelRef.current.position.y = 0.18 + Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
      panelRef.current.material.opacity = THREE.MathUtils.lerp(0.45, 0.74, eased);
    }

    if (glowRef.current) {
      glowRef.current.scale.x = THREE.MathUtils.lerp(glowRef.current.scale.x, 3.3 + eased * 0.55, 1 - Math.exp(-delta * 2.4));
      glowRef.current.scale.y = THREE.MathUtils.lerp(glowRef.current.scale.y, 1.4 + eased * 0.3, 1 - Math.exp(-delta * 2.4));
      glowRef.current.position.x = THREE.MathUtils.lerp(0.15, -0.1, eased);
      glowRef.current.material.opacity = THREE.MathUtils.lerp(0.12, 0.24, eased);
    }
  });

  return (
    <>
      <color attach="background" args={["#120d09"]} />
      <fog attach="fog" args={["#120d09", 5.4, 9.7]} />
      <ambientLight intensity={1.45} color="#f2e7da" />
      <directionalLight position={[3.8, 3.2, 2.5]} intensity={2.1} color="#f7e4cb" />
      <directionalLight position={[-3.4, 2.4, 1.8]} intensity={0.95} color="#b7ad9d" />
      <spotLight position={[0.4, 4, 3]} intensity={10} angle={0.48} penumbra={0.85} color="#f6d5a6" />

      <mesh position={[0, 0.25, -3.8]}>
        <planeGeometry args={[viewport.width * 1.8, viewport.height * 1.65]} />
        <meshBasicMaterial map={backdropTexture} toneMapped={false} />
      </mesh>

      <mesh ref={bronzePlaneRef} position={[1.2, 0.1, -1.7]} rotation={[0, 0, -0.18]}>
        <planeGeometry args={[5.8, 3.8]} />
        <meshBasicMaterial map={bronzeTexture} transparent opacity={0.15} toneMapped={false} />
      </mesh>

      <mesh ref={panelRef} position={[-2.7, 0.18, -1.1]}>
        <planeGeometry args={[1.35, 3.5]} />
        <meshBasicMaterial map={panelTexture} transparent opacity={0.55} toneMapped={false} />
      </mesh>

      <mesh ref={glowRef} position={[0.15, -0.55, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.3, 1.4]} />
        <meshBasicMaterial map={shadowTexture} transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <group ref={sofaRef} position={[1.34, -0.18, 0.05]} rotation={[0.05, -0.34, 0]} scale={1.9}>
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[1.95, 1.1]} />
          <meshBasicMaterial map={sofaTexture} transparent alphaTest={0.04} toneMapped={false} />
        </mesh>
        <mesh position={[0.06, -0.42, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.5, 0.56]} />
          <meshBasicMaterial map={shadowTexture} transparent opacity={0.56} depthWrite={false} />
        </mesh>
      </group>

      <Html position={[0, -1.5, 0]} center>
        <div className="sr-only">Toscana featured sofa animation scene</div>
      </Html>
    </>
  );
}

export function ToscanaHero({ onExploreCatalogue }: ToscanaHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const heroProgress = useSpring(scrollYProgress, {
    damping: 22,
    stiffness: 90,
    mass: 0.35,
  });

  const headlineY = useTransform(heroProgress, [0, 1], [0, reducedMotion ? -12 : -82]);
  const eyebrowOpacity = useTransform(heroProgress, [0, 0.2, 0.62, 1], [0.7, 1, 0.72, 0.12]);
  const paragraphOpacity = useTransform(heroProgress, [0, 0.3, 0.75, 1], [0.65, 1, 0.8, 0.08]);
  const progressWidth = useTransform(heroProgress, (value) => `${Math.max(8, value * 100)}%`);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[240svh] overflow-clip border-b border-white/8 bg-[#0e0b08] text-stone-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,226,187,0.16),transparent_28%),radial-gradient(circle_at_82%_28%,rgba(136,96,62,0.18),transparent_32%),linear-gradient(90deg,rgba(7,5,4,0.68)_0%,rgba(7,5,4,0.28)_42%,rgba(7,5,4,0.05)_72%),linear-gradient(180deg,rgba(8,6,4,0.12)_0%,rgba(8,6,4,0.72)_100%)]" />
      <div className="sticky top-0 h-svh">
        <div className="absolute inset-0">
          <Canvas dpr={[1, 1.8]} camera={{ position: [1.05, 0.46, 6.1], fov: 30 }}>
            <HeroScene progress={heroProgress} reducedMotion={Boolean(reducedMotion)} />
          </Canvas>
        </div>

        <div className="relative z-10 h-full">
          <div className="container flex h-full flex-col justify-between py-7 sm:py-8 lg:py-10">
            <header className="flex items-center justify-between gap-6">
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.42em] text-stone-300/72">
                  Zarin Möbelhaus
                </p>
                <p className="mt-2 font-[Cormorant_Garamond] text-2xl tracking-[0.08em] text-stone-100 sm:text-3xl">
                  Signature Collection
                </p>
              </div>
              <div className="hidden items-center gap-4 text-[0.7rem] uppercase tracking-[0.34em] text-stone-300/60 md:flex">
                <span>Scroll for Motion</span>
                <span className="h-px w-16 bg-white/18" />
                <span>24 Models</span>
              </div>
            </header>

            <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:py-0">
              <div className="max-w-xl self-center">
                <motion.p
                  style={{ opacity: eyebrowOpacity }}
                  className="mb-6 text-[0.68rem] uppercase tracking-[0.48em] text-stone-300/72 sm:text-[0.72rem]"
                >
                  Featured Sofa — Toscana
                </motion.p>
                <motion.div style={{ y: headlineY }}>
                  <h1 className="max-w-[10ch] font-[Cormorant_Garamond] text-[3.8rem] leading-[0.88] text-stone-100 sm:text-[5.2rem] lg:text-[7rem]">
                    Sculpted comfort in cinematic motion.
                  </h1>
                </motion.div>
                <motion.p
                  style={{ opacity: paragraphOpacity }}
                  className="mt-6 max-w-lg text-sm leading-7 text-stone-200/90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-base"
                >
                  Eine exklusive Kollektion, präsentiert wie ein Produktfilm: warme Architektur,
                  taktiles Detail und eine scroll-verknüpfte Toscana-Präsentation, die Winkel,
                  Maßstab und Perspektive verändert, während die Kollektion sich entfaltet.
                </motion.p>
                <motion.div
                  style={{ opacity: paragraphOpacity }}
                  className="mt-8 flex flex-col items-start gap-4 sm:flex-row"
                >
                  <button
                    onClick={onExploreCatalogue}
                    className="group inline-flex items-center rounded-none border border-[#b98a5a]/65 bg-[#b98a5a] px-7 py-[1.1rem] text-[0.72rem] uppercase tracking-[0.28em] text-[#140f0b] transition-colors hover:bg-[#d8b488] cursor-pointer"
                  >
                    Koleksiyonu Keşfet
                    <ArrowDownRight className="ml-3 size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                  </button>
                  <div className="border-l border-white/10 pl-5 text-[0.72rem] uppercase tracking-[0.3em] text-stone-300/62">
                    Editorial navigation
                    <div className="mt-3 h-px w-28 bg-white/12" />
                  </div>
                </motion.div>
              </div>

              <div className="hidden h-full items-end justify-end lg:flex">
                <div className="max-w-[18rem] border-l border-white/10 pl-6 text-right">
                  <p className="text-[0.65rem] uppercase tracking-[0.42em] text-stone-300/55">
                    Interactive Product Sequence
                  </p>
                  <p className="mt-4 text-sm leading-7 text-stone-200/82 drop-shadow-[0_8px_24px_rgba(0,0,0,0.42)]">
                    Scroll to transition from a wide editorial reveal to an intimate close framing of
                    Toscana, with camera drift and ambient light designed to feel calm, premium, and
                    cinematic.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid items-end gap-8 border-t border-white/8 pt-4 sm:grid-cols-[1fr_auto] sm:pt-6">
              <div className="max-w-sm">
                <p className="text-[0.65rem] uppercase tracking-[0.38em] text-stone-300/62">
                  Scroll Progress
                </p>
                <div className="mt-4 h-px w-full bg-white/10">
                  <motion.div style={{ width: progressWidth }} className="h-px bg-[#d0aa80]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-right text-[0.72rem] uppercase tracking-[0.28em] text-stone-300/58">
                <div>
                  <div className="text-xl text-stone-100">24</div>
                  <div className="mt-1">Models</div>
                </div>
                <div>
                  <div className="text-xl text-stone-100">01</div>
                  <div className="mt-1">Featured</div>
                </div>
                <div>
                  <div className="text-xl text-stone-100">DE</div>
                  <div className="mt-1">Region</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
