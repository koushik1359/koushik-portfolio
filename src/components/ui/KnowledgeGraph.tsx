"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Points, PointMaterial, Line, Environment } from "@react-three/drei";
import * as THREE from "three";

const KNOWLEDGE_NODES = [
  { name: "Python", pos: [2, 1, 0], color: "#3776ab" },
  { name: "PyTorch", pos: [3, -1, 1], color: "#ee4c2c" },
  { name: "LLMs", pos: [-2, 2, 1], color: "#818cf8" },
  { name: "RAG", pos: [-3, 0, 0], color: "#10b981" },
  { name: "Azure", pos: [0, 2.5, -1], color: "#0078d4" },
  { name: "Databricks", pos: [1, -2.5, 0], color: "#ff3621" },
  { name: "LangGraph", pos: [-1, -2, 2], color: "#a855f7" },
  { name: "FastAPI", pos: [2.5, 0, -2], color: "#05998b" },
  { name: "SQL", pos: [-2.5, -1, -2], color: "#336791" },
];

// Define connections between related concepts
const CONNECTIONS = [
  [0, 1], // Python -> PyTorch
  [0, 7], // Python -> FastAPI
  [2, 3], // LLMs -> RAG
  [2, 6], // LLMs -> LangGraph
  [4, 5], // Azure -> Databricks
  [0, 8], // Python -> SQL
  [1, 2], // PyTorch -> LLMs
];

function Graph() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the entire graph slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes and Labels */}
      {KNOWLEDGE_NODES.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={node.pos as [number, number, number]}>
            {/* The Node Dot */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial 
                color={node.color} 
                emissive={node.color} 
                emissiveIntensity={2} 
                toneMapped={false} 
              />
            </mesh>
            
            {/* The Label */}
            <Text
              position={[0, 0.25, 0]}
              fontSize={0.2}
              color="white"
              font="/fonts/GeistMono-Bold.woff" // Assuming font path or fallback
              anchorX="center"
              anchorY="middle"
              outlineColor="#000"
              outlineWidth={0.02}
            >
              {node.name}
            </Text>
          </group>
        </Float>
      ))}

      {/* Connections (Lines) */}
      {CONNECTIONS.map(([start, end], i) => (
        <Line
          key={i}
          points={[
            KNOWLEDGE_NODES[start].pos as [number, number, number],
            KNOWLEDGE_NODES[end].pos as [number, number, number]
          ]}
          color="#ffffff"
          opacity={0.15}
          transparent
          lineWidth={1}
        />
      ))}

      {/* Ambient background particles for depth */}
      <Points limit={500}>
        <PointMaterial 
            transparent 
            vertexColors={false} 
            size={0.02} 
            sizeAttenuation={true} 
            depthWrite={false} 
            color="#444"
        />
        {/* Placeholder for random particles if needed, but keeping it clean for now */}
      </Points>
    </group>
  );
}

export default function KnowledgeGraph() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Graph />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
