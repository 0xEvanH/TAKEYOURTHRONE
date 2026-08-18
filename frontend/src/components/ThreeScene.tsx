import { useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Group } from "three";
import { GOLD, PURPLE } from "../constants";

// Split out of ThreeBackdrop.tsx so the three.js/@react-three bundle (the
// heaviest dependency in the project) loads as its own async chunk via
// React.lazy, instead of inflating the main bundle every route pays for.

function DriftGroup({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.015;
    group.current.rotation.x += delta * 0.004;
  });
  return <group ref={group}>{children}</group>;
}

interface ThreeSceneProps {
  isHero: boolean;
  visible: boolean;
}

export default function ThreeScene({ isHero, visible }: ThreeSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      camera={{ position: [0, 0, isHero ? 8 : 10], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <DriftGroup>
        <Sparkles
          count={isHero ? 140 : 60}
          scale={isHero ? [14, 8, 6] : [10, 5, 4]}
          size={isHero ? 2.6 : 1.8}
          speed={0.25}
          opacity={0.7}
          color={GOLD}
        />
        <Sparkles
          count={isHero ? 90 : 40}
          scale={isHero ? [16, 9, 6] : [11, 6, 4]}
          size={isHero ? 3.2 : 2.2}
          speed={0.18}
          opacity={0.5}
          color={PURPLE}
        />
      </DriftGroup>
    </Canvas>
  );
}
