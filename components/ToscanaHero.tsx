"use client";

/*
 * Quiet Italian Modernism
 * File intent: build a cinematic, sculptural hero that presents Toscana as a luxury object in motion.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import { MotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
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

type HeroSceneProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

type ToscanaHeroProps = {
  onExploreCatalogue: () => void;
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
  const shadowTexture = useMemo(() => createShadowTexture(), []);

  useEffect(() => {
    [backdropTexture, bronzeTexture, panelTexture, sofaTexture].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });
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
      sofaRef.current.rotation.x = THREE.MathUtils.lerp(
        sofaRef.current.rotation.x,
        rotX,
        1 - Math.exp(-delta * 3.2),
      );
      sofaRef.current.rotation.y = THREE.MathUtils.lerp(
        sofaRef.current.rotation.y,
        rotY,
        1 - Math.exp(-delta * 3.2),
      );
      sofaRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        1 - Math.exp(-delta * 3.2),
      );
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
      glowRef.current.scale.x = THREE.MathUtils.lerp(
        glowRef.current.scale.x,
        3.3 + eased * 0.55,
        1 - Math.exp(-delta * 2.4),
      );
      glowRef.current.scale.y = THREE.MathUtils.lerp(
        glowRef.current.scale.y,
        1.4 + eased * 0.3,
        1 - Math.exp(-delta * 2.4),
      );
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200svh] overflow-clip border-b border-white/8 bg-[#0e0b08] text-stone-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,226,187,0.16),transparent_28%),radial-gradient(circle_at_82%_28%,rgba(136,96,62,0.18),transparent_32%),linear-gradient(90deg,rgba(7,5,4,0.68)_0%,rgba(7,5,4,0.28)_42%,rgba(7,5,4,0.05)_72%),linear-gradient(180deg,rgba(8,6,4,0.12)_0%,rgba(8,6,4,0.72)_100%)]" />

      <div className="sticky top-0 h-svh">
        <div className="absolute inset-0">
          <Canvas dpr={[1, 1.8]} camera={{ position: [1.05, 0.46, 6.1], fov: 30 }}>
            <HeroScene progress={heroProgress} reducedMotion={Boolean(reducedMotion)} />
          </Canvas>
        </div>

        <div className="relative z-10 h-full">
          <div className="container relative h-full px-6 pb-8 lg:block lg:py-16">
            <div className="absolute left-1/2 top-32 w-[min(88vw,24rem)] -translate-x-1/2 text-center sm:top-36 lg:left-6 lg:top-1/2 lg:w-[min(46vw,38rem)] lg:max-w-none lg:translate-x-0 lg:-translate-y-1/2 lg:rounded-sm lg:border lg:border-white/14 lg:bg-[rgba(8,6,4,0.56)] lg:p-8 lg:text-left lg:backdrop-blur-sm">
              <h1 className="font-[Cormorant_Garamond] text-[1.95rem] leading-[0.94] tracking-[0.06em] text-stone-100 sm:text-[2.25rem] lg:text-[4rem]">
                Zarin Möbelhaus
              </h1>
              <p className="mt-2 font-[Cormorant_Garamond] text-[1.02rem] tracking-[0.1em] text-stone-200/92 sm:text-[1.18rem] lg:mt-3 lg:text-[1.6rem]">
                Online Katalog
              </p>
            </div>

            <button
              onClick={onExploreCatalogue}
              className="absolute bottom-[calc(env(safe-area-inset-bottom)+4.5rem)] left-5 inline-flex cursor-pointer items-center justify-center border border-[#c9a96e]/75 bg-[#c9a96e] px-8 py-3.5 font-sans text-[0.82rem] uppercase tracking-[0.22em] text-[#1b140d] shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#ddbe87] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1c28d]/90 lg:hidden"
            >
              Kollektionen
              <ArrowDownRight className="ml-3 size-5" />
            </button>

            <button
              onClick={onExploreCatalogue}
              className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 cursor-pointer items-center justify-center border border-[#c9a96e]/75 bg-[#c9a96e] px-11 py-4 font-sans text-[0.84rem] uppercase tracking-[0.24em] text-[#1b140d] shadow-[0_14px_34px_rgba(0,0,0,0.46)] transition-colors hover:bg-[#ddbe87] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1c28d]/90 lg:inline-flex"
            >
              Kollektionen
              <ArrowDownRight className="ml-3 size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
