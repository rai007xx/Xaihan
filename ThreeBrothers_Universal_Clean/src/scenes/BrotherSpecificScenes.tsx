import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Ring, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Brother } from '../data/brothers';
import { createBrotherPlaceholderTexture, loadBrotherPhotoTexture } from './PhotoTextureHelper';

// =========================================================
// REUSABLE ULTRA-HD 3D PORTRAIT CARD WITH GLOWING NEON EDGES
// =========================================================
function UltraSharpPortraitCard({
  texture,
  borderColor
}: {
  brother?: Brother;
  texture: THREE.Texture | null;
  borderColor: string;
}) {
  return (
    <Float speed={2.0} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={[0, 0, 0]}>
        {/* Layer 1: Minimalist Dark Glass Chassis */}
        <RoundedBox args={[3.46, 4.66, 0.12]} radius={0.16} position={[0, 0, -0.06]}>
          <meshPhysicalMaterial
            roughness={0.15}
            metalness={0.9}
            color="#050810"
            emissive={borderColor}
            emissiveIntensity={0.15}
          />
        </RoundedBox>

        {/* Layer 2: Ultra-HD Photo Plane (Clean, Unobscured & Razor Sharp) */}
        <mesh position={[0, 0.22, 0.02]}>
          <planeGeometry args={[3.2, 4.0]} />
          {texture ? (
            <meshBasicMaterial
              map={texture}
              toneMapped={false}
              side={THREE.FrontSide}
            />
          ) : (
            <meshStandardMaterial color="#0f172a" />
          )}
        </mesh>

        {/* Layer 3: Inner Precision Bezel */}
        <lineSegments position={[0, 0.22, 0.03]}>
          <edgesGeometry args={[new THREE.BoxGeometry(3.24, 4.04, 0.04)]} />
          <lineBasicMaterial
            color={borderColor}
            transparent
            opacity={0.7}
            linewidth={1}
          />
        </lineSegments>

        {/* Layer 4: Glowing Precision Neon Edge Frame */}
        <lineSegments position={[0, 0, 0.04]}>
          <edgesGeometry args={[new THREE.BoxGeometry(3.48, 4.68, 0.16)]} />
          <lineBasicMaterial
            color={borderColor}
            transparent
            opacity={1}
            linewidth={2}
          />
        </lineSegments>
      </group>
    </Float>
  );
}

// =========================================================
// BROTHER 01: RAIHAN HOSSAIN (CYBER KNOWLEDGE MATRIX & CIRCLES)
// =========================================================
function RaihanCyberCircles() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const nodes = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.45;
      ring1.current.rotation.y = t * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.5;
      ring2.current.rotation.z = t * 0.3;
    }
    if (ring3.current) {
      ring3.current.rotation.x = -t * 0.25;
      ring3.current.rotation.z = -t * 0.4;
    }
    if (nodes.current) {
      nodes.current.rotation.y = t * 0.25;
    }
  });

  return (
    <>
      {/* Dynamic 3D Orbital Cyber Rings */}
      <Ring ref={ring1} args={[2.7, 2.76, 64]} position={[0, 0, -0.4]}>
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.75} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2} args={[3.3, 3.36, 64]} position={[0, 0, -0.7]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring3} args={[3.8, 3.85, 64]} position={[0, 0, -1.0]}>
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>

      {/* Floating Cyber Polyhedron Crystals */}
      <group ref={nodes}>
        {[-3.2, 3.2].map((x, i) => (
          <mesh key={i} position={[x, (i - 0.5) * 2.8, -0.6]} rotation={[0.4, 0.4, 0]}>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.95} wireframe />
          </mesh>
        ))}
      </group>
    </>
  );
}

export function RaihanScene3D({ brother }: { brother: Brother }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    loadBrotherPhotoTexture(
      brother.image,
      (t) => setTexture(t),
      () => setTexture(createBrotherPlaceholderTexture(brother.number, brother.name, brother.role, brother.themeColor))
    );
  }, [brother]);

  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 1 : [1, 1.5]}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={3.5} color="#00f2fe" distance={20} />
      <pointLight position={[-5, -5, 3]} intensity={2.5} color="#38bdf8" distance={15} />

      <Sparkles count={45} scale={7} size={3} speed={0.5} color="#00f2fe" opacity={0.8} />

      <UltraSharpPortraitCard
        brother={brother}
        texture={texture}
        borderColor="#00f2fe"
      />

      <RaihanCyberCircles />
    </Canvas>
  );
}

// =========================================================
// BROTHER 02: IBRAHIM HOSSAIN (DIGITAL BUSINESS ORBITAL CIRCLES - AMBER GOLD)
// =========================================================
function IbrahimCyberCircles() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const crystalGroup = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.4;
      ring1.current.rotation.y = t * 0.45;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.45;
      ring2.current.rotation.z = -t * 0.35;
    }
    if (ring3.current) {
      ring3.current.rotation.x = -t * 0.3;
      ring3.current.rotation.z = t * 0.5;
    }
    if (crystalGroup.current) {
      crystalGroup.current.rotation.y = t * 0.22;
      crystalGroup.current.rotation.z = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <>
      {/* High-End Amber Gold Cyber Orbital Circles */}
      <Ring ref={ring1} args={[2.7, 2.76, 64]} position={[0, 0, -0.4]}>
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.85} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2} args={[3.3, 3.36, 64]} position={[0, 0, -0.7]}>
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.65} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring3} args={[3.8, 3.85, 64]} position={[0, 0, -1.0]}>
        <meshBasicMaterial color="#d97706" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>

      {/* Floating 3D Geometric Data Nodes & Crystals */}
      <group ref={crystalGroup}>
        <mesh position={[-3.1, 1.8, -0.6]} rotation={[0.5, 0.5, 0]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#f59e0b" wireframe emissive="#f59e0b" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[3.1, -1.6, -0.6]} rotation={[-0.4, 0.4, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#fbbf24" wireframe emissive="#fbbf24" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </>
  );
}

export function IbrahimScene3D({ brother }: { brother: Brother }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    loadBrotherPhotoTexture(
      brother.image,
      (t) => setTexture(t),
      () => setTexture(createBrotherPlaceholderTexture(brother.number, brother.name, brother.role, brother.themeColor))
    );
  }, [brother]);

  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 1 : [1, 1.5]}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={3.5} color="#f59e0b" distance={20} />
      <pointLight position={[-5, -5, 3]} intensity={2.5} color="#fbbf24" distance={15} />

      <Sparkles count={50} scale={7} size={3} speed={0.5} color="#f59e0b" opacity={0.8} />

      <UltraSharpPortraitCard
        brother={brother}
        texture={texture}
        borderColor="#f59e0b"
      />

      <IbrahimCyberCircles />
    </Canvas>
  );
}

// =========================================================
// BROTHER 03: RABIUL ISLAM (EXECUTIVE FOUNDER CIRCLES & SHIELDS)
// ==========================================
function RabiulCyberCircles() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const crystalGroup = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = -t * 0.4;
      ring1.current.rotation.y = t * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.45;
      ring2.current.rotation.z = t * 0.3;
    }
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.35;
      ring3.current.rotation.z = -t * 0.45;
    }
    if (crystalGroup.current) {
      crystalGroup.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <>
      {/* Majestic Royal Blue & Cyan Executive Orbital Circles */}
      <Ring ref={ring1} args={[2.7, 2.76, 64]} position={[0, 0, -0.4]}>
        <meshBasicMaterial color="#2563eb" transparent opacity={0.85} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2} args={[3.3, 3.36, 64]} position={[0, 0, -0.7]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring3} args={[3.8, 3.85, 64]} position={[0, 0, -1.0]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} side={THREE.DoubleSide} />
      </Ring>

      {/* Floating Diamond Icosahedrons & Leadership Geometry */}
      <group ref={crystalGroup}>
        <mesh position={[3.2, 1.8, -0.6]} rotation={[0.4, 0.4, 0]}>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#60a5fa" wireframe emissive="#2563eb" emissiveIntensity={0.95} />
        </mesh>
        <mesh position={[-3.2, -1.6, -0.6]} rotation={[-0.4, 0.4, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#38bdf8" wireframe emissive="#3b82f6" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </>
  );
}

export function RabiulScene3D({ brother }: { brother: Brother }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    loadBrotherPhotoTexture(
      brother.image,
      (t) => setTexture(t),
      () => setTexture(createBrotherPlaceholderTexture(brother.number, brother.name, brother.role, brother.themeColor))
    );
  }, [brother]);

  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 1 : [1, 1.5]}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={3.5} color="#2563eb" distance={20} />
      <pointLight position={[-5, -5, 3]} intensity={2.5} color="#60a5fa" distance={15} />

      <Sparkles count={45} scale={7} size={3} speed={0.5} color="#3b82f6" opacity={0.8} />

      <UltraSharpPortraitCard
        brother={brother}
        texture={texture}
        borderColor="#3b82f6"
      />

      <RabiulCyberCircles />
    </Canvas>
  );
}
