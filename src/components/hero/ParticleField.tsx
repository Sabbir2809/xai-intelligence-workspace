/* eslint-disable react-hooks/refs */
"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const COUNT = 2400;
const GRID_COLS = 60;
const GRID_ROWS = 40;

function buildPositions() {
  const raw = new Float32Array(COUNT * 3);
  const grid = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const r = 6 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    raw[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    raw[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    raw[i * 3 + 2] = r * Math.cos(phi) - 2;

    const col = i % GRID_COLS;
    const row = Math.floor(i / GRID_COLS) % GRID_ROWS;
    const gx = (col / (GRID_COLS - 1) - 0.5) * 9;
    const gy = (row / (GRID_ROWS - 1) - 0.5) * 5.4;
    grid[i * 3] = gx;
    grid[i * 3 + 1] = gy;
    grid[i * 3 + 2] = -1.2;
  }
  return { raw, grid };
}

export function ParticleField({
  progress,
}: {
  progress: React.RefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const dataRef = useRef<{ raw: Float32Array; grid: Float32Array } | null>(
    null,
  );
  const currentRef = useRef<Float32Array | null>(null);
  if (!dataRef.current) {
    dataRef.current = buildPositions();
    currentRef.current = new Float32Array(dataRef.current.raw);
  }

  useFrame((state, delta) => {
    const t = progress.current ?? 0;
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const { raw, grid } = dataRef.current!;
    const current = currentRef.current!;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const targetX = THREE.MathUtils.lerp(raw[ix], grid[ix], t);
      const targetY = THREE.MathUtils.lerp(raw[ix + 1], grid[ix + 1], t);
      const targetZ = THREE.MathUtils.lerp(raw[ix + 2], grid[ix + 2], t);

      current[ix] = THREE.MathUtils.damp(current[ix], targetX, 3, delta);
      current[ix + 1] = THREE.MathUtils.damp(
        current[ix + 1],
        targetY,
        3,
        delta,
      );
      current[ix + 2] = THREE.MathUtils.damp(
        current[ix + 2],
        targetZ,
        3,
        delta,
      );
    }
    posAttr.array.set(current);
    posAttr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.damp(
        pointsRef.current.rotation.y,
        mouseX * 0.15 + t * 0.02,
        4,
        delta,
      );
      pointsRef.current.rotation.x = THREE.MathUtils.damp(
        pointsRef.current.rotation.x,
        -mouseY * 0.08,
        4,
        delta,
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentRef.current!, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#5b8def"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
