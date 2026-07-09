"use client";

import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import { ParticleField } from "./ParticleField";

export function HeroScene({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0">
      <ParticleField progress={progress} />
    </Canvas>
  );
}
