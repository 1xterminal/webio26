'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

function Geometry() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef} position={[2, 0, 0]} scale={1.8}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#ff003c"
            envMapIntensity={0.5}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.5}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[-2, -1, -1]} scale={0.8}>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={1}
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-1, 2, -2]} scale={0.5}>
          <octahedronGeometry />
          <meshStandardMaterial
            color="#7000ff"
            emissive="#7000ff"
            emissiveIntensity={2}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none opacity-40 z-0">
      <Canvas frameloop={isInView ? "always" : "never"}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -5, -10]} color="#00f0ff" intensity={5} />
        <pointLight position={[10, 5, 5]} color="#ff003c" intensity={5} />
        <Geometry />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
