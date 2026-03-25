"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 300; // Dense network
  const radius = 6;
  const maxDistance = 1.4;

  const [positions, lines] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        // Generate random points inside a sphere
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }

    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        // If nodes are close, draw a connecting line
        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }
    return [pos, new Float32Array(linePositions)];
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle, continuous rotation to simulate a hovering neural mesh
      groupRef.current.rotation.y += delta * 0.03;
      groupRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
        </bufferGeometry>
        {/* Nodes are deeply glowing indigo points */}
        <pointsMaterial size={0.03} color="#818cf8" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} args={[lines, 3]} />
        </bufferGeometry>
        {/* Faint connecting lines, almost emerald/cyan in tint */}
        <lineBasicMaterial color="#34d399" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

export default function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 w-full h-[150vh] md:h-full z-0 opacity-40 pointer-events-none mix-blend-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
        {/* Fog fades out the points in the deep distance */}
        <fog attach="fog" args={["#161616", 4, 10]} />
        <Network />
      </Canvas>
      {/* Gentle center glow to ground the 3D canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] -z-10" />
    </div>
  );
}
