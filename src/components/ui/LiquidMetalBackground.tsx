"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LiquidMetalOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Optional: subtle rotation based on mouse movement (parallax)
  useFrame((state) => {
    if (meshRef.current) {
      // Very gentle smoothing of rotation towards mouse position
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.pointer.y * Math.PI) / 4, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (state.pointer.x * Math.PI) / 4, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#0f172a" // Deep slate/black base
          envMapIntensity={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={1}
          roughness={0.1}
          distort={0.45} // The amount of fluid distortion
          speed={2.5} // Speed of the rippling
        />
      </mesh>
    </Float>
  );
}

export default function LiquidMetalBackground() {
  return (
    <div className="absolute inset-0 w-full h-[150vh] md:h-full z-0 opacity-70 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        {/* Base ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Dynamic colored accent lights hitting the metal */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#6366f1" /> {/* Indigo */}
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#10b981" /> {/* Emerald */}
        <directionalLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" /> {/* Front fill */}
        
        {/* The Liquid Metal Blob */}
        <LiquidMetalOrb />
        
        {/* Soft shadow directly underneath to ground it visually */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={3} far={5} />

        {/* Studio environment for cinematic, high-contrast reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
