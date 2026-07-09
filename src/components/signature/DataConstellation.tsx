/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/refs */
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 90;
const MORPH_DURATION = 1.1;

function fibonacciSphere(i: number) {
  const r = 3.2;
  const theta = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
  const phi = Math.PI * (1 + Math.sqrt(5)) * i;
  return new THREE.Vector3(
    r * Math.sin(theta) * Math.cos(phi),
    r * Math.sin(theta) * Math.sin(phi),
    r * Math.cos(theta),
  );
}

function doubleHelix(i: number) {
  const strand = i % 2;
  const t = Math.floor(i / 2) / (NODE_COUNT / 2);
  const angle = t * Math.PI * 6 + strand * Math.PI;
  const radius = 1.7;
  return new THREE.Vector3(
    radius * Math.cos(angle),
    (t - 0.5) * 6.4,
    radius * Math.sin(angle),
  );
}

function torusKnot(i: number) {
  const p = 2;
  const q = 3;
  const R = 2.2;
  const r = 0.9;
  const t = (i / NODE_COUNT) * Math.PI * 2;
  return new THREE.Vector3(
    (R + r * Math.cos(q * t)) * Math.cos(p * t),
    (R + r * Math.cos(q * t)) * Math.sin(p * t),
    r * Math.sin(q * t),
  );
}

const BUILDERS = [fibonacciSphere, doubleHelix, torusKnot];

function buildGraph() {
  const scattered: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    scattered.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
      ),
    );
  }

  const formations = BUILDERS.map((build) =>
    Array.from({ length: NODE_COUNT }, (_, i) => build(i)),
  );

  const reference = formations[0];
  const edges: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const nearest = reference
      .map((p, j) => ({ j, d: p.distanceTo(reference[i]) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    nearest.forEach(({ j }) => {
      if (i < j) edges.push([i, j]);
    });
  }

  return { scattered, formations, edges };
}

type Graph = ReturnType<typeof buildGraph>;

export function DataConstellation({
  progress,
  formationIndex,
}: {
  progress: React.RefObject<number>;
  formationIndex: number;
}) {
  const graphRef = useRef<Graph | null>(null);
  const buffersRef = useRef<{
    positions: Float32Array;
    linePositions: Float32Array;
  } | null>(null);
  if (!graphRef.current) {
    graphRef.current = buildGraph();
    buffersRef.current = {
      positions: new Float32Array(NODE_COUNT * 3),
      linePositions: new Float32Array(graphRef.current.edges.length * 2 * 3),
    };
  }
  const { scattered, formations, edges } = graphRef.current;
  const { positions, linePositions } = buffersRef.current!;

  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const drag = useRef({ active: false, x: 0, y: 0, rotX: 0, rotY: 0 });
  const clock = useRef(0);
  const morph = useRef({ from: 0, to: formationIndex, blend: 1 });
  const { camera } = useThree();

  if (morph.current.to !== formationIndex) {
    morph.current = { from: morph.current.to, to: formationIndex, blend: 0 };
  }

  useFrame((_, delta) => {
    const t = progress.current ?? 0;
    const m = morph.current;
    if (m.blend < 1) m.blend = Math.min(1, m.blend + delta / MORPH_DURATION);
    const eased = THREE.MathUtils.smoothstep(m.blend, 0, 1);
    const from = formations[m.from];
    const to = formations[m.to];

    for (let i = 0; i < NODE_COUNT; i++) {
      const a = from[i];
      const b = to[i];
      const tx = THREE.MathUtils.lerp(a.x, b.x, eased);
      const ty = THREE.MathUtils.lerp(a.y, b.y, eased);
      const tz = THREE.MathUtils.lerp(a.z, b.z, eased);
      const s = scattered[i];
      positions[i * 3] = THREE.MathUtils.lerp(s.x, tx, t);
      positions[i * 3 + 1] = THREE.MathUtils.lerp(s.y, ty, t);
      positions[i * 3 + 2] = THREE.MathUtils.lerp(s.z, tz, t);
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      attr.array.set(positions);
      attr.needsUpdate = true;
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = THREE.MathUtils.lerp(0.35, 1, t);
    }

    edges.forEach(([a, b], i) => {
      linePositions[i * 6] = positions[a * 3];
      linePositions[i * 6 + 1] = positions[a * 3 + 1];
      linePositions[i * 6 + 2] = positions[a * 3 + 2];
      linePositions[i * 6 + 3] = positions[b * 3];
      linePositions[i * 6 + 4] = positions[b * 3 + 1];
      linePositions[i * 6 + 5] = positions[b * 3 + 2];
    });
    if (linesRef.current) {
      const attr = linesRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      attr.array.set(linePositions);
      attr.needsUpdate = true;
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(0, 0.5, t);
    }

    clock.current += delta * 0.08;
    if (groupRef.current) {
      const d = drag.current;
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        d.rotY + clock.current,
        4,
        delta,
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        d.rotX,
        4,
        delta,
      );
    }

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      8 - t * 1.5,
      3,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        drag.current.active = true;
        drag.current.x = e.clientX;
        drag.current.y = e.clientY;
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }}
      onPointerUp={() => (drag.current.active = false)}
      onPointerLeave={() => (drag.current.active = false)}
      onPointerMove={(e) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.x;
        const dy = e.clientY - drag.current.y;
        drag.current.rotY += dx * 0.005;
        drag.current.rotX += dy * 0.005;
        drag.current.x = e.clientX;
        drag.current.y = e.clientY;
      }}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#5b8def"
          transparent
          opacity={0.35}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#5b8def"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
