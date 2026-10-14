import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { BROTHERS_DATA, Brother } from '../data/brothers';
import { loadBrotherPhotoTexture, createBrotherPlaceholderTexture } from './PhotoTextureHelper';

// =========================================================================
// LUXURY 3D HOLO-CORE NUCLEUS (Replaces simple wireframe sphere)
// =========================================================================

function HoloCoreNucleus() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.4;
      coreRef.current.rotation.y = t * 0.5;
    }
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.6;
      ring1.current.rotation.y = t * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.5;
      ring2.current.rotation.z = t * 0.4;
    }
    if (ring3.current) {
      ring3.current.rotation.x = -t * 0.3;
      ring3.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Floating Geometric Crystal */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#00f2fe"
          wireframe
          emissive="#00f2fe"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Inner Glowing Plasma Sphere */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Concentric Gimbal Rings */}
      <Ring ref={ring1} args={[1.15, 1.22, 64]}>
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.7} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2} args={[1.38, 1.44, 64]}>
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.65} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring3} args={[1.62, 1.68, 64]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} side={THREE.DoubleSide} />
      </Ring>

      {/* Point Lights */}
      <pointLight intensity={3.5} color="#00f2fe" distance={10} />
      <pointLight intensity={2.0} color="#f59e0b" distance={8} />
    </group>
  );
}

// =========================================================================
// ULTRA-SHARP ORBITING BROTHER CARDS (Always Faces Front & Crystal Clear)
// =========================================================================

interface OrbitCardProps {
  brother: Brother;
  angleOffset: number;
  radius: number;
  activeId: string | null;
  onHover: (id: string | null) => void;
}

function OrbitCard({ brother, angleOffset, radius, activeId, onHover }: OrbitCardProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const isHovered = activeId === brother.number;

  useEffect(() => {
    loadBrotherPhotoTexture(
      brother.image,
      (tex) => setTexture(tex),
      () => {
        const fallback = createBrotherPlaceholderTexture(
          brother.number,
          brother.name,
          brother.role,
          brother.themeColor
        );
        setTexture(fallback);
      }
    );
  }, [brother]);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const time = state.clock.getElapsedTime();
    // Gentle orbiting motion
    const currentAngle = angleOffset + time * 0.18;
    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * (radius * 0.45); // Elliptical orbit for dynamic perspective
    const y = Math.sin(time * 0.8 + angleOffset) * 0.25;

    nodeRef.current.position.set(x, y, z);
    // Orient slightly towards the camera so face is ALWAYS visible and sharp!
    nodeRef.current.rotation.y = Math.sin(currentAngle) * 0.35;
    nodeRef.current.rotation.x = Math.cos(time * 0.5) * 0.05;
  });

  const nodeRef = groupRef;
  const boxGeoEdges = useMemo(() => new THREE.BoxGeometry(2.32, 3.12, 0.12), []);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => onHover(brother.number)}
      onPointerOut={() => onHover(null)}
      scale={isHovered ? 1.08 : 1.0}
    >
      {/* Outer Sleek Dark Chassis */}
      <RoundedBox args={[2.3, 3.1, 0.1]} radius={0.12} smoothness={3}>
        <meshPhysicalMaterial
          transparent
          opacity={0.92}
          roughness={0.2}
          metalness={0.8}
          color="#03060c"
          emissive={brother.themeColor}
          emissiveIntensity={isHovered ? 0.5 : 0.15}
        />
      </RoundedBox>

      {/* High-Resolution Front Photo Plane */}
      <mesh position={[0, 0.15, 0.06]}>
        <planeGeometry args={[2.1, 2.6]} />
        {texture ? (
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial color="#0f172a" />
        )}
      </mesh>

      {/* High-Resolution Back Photo Plane (so even from behind it looks amazing) */}
      <mesh position={[0, 0.15, -0.06]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.1, 2.6]} />
        {texture ? (
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial color="#0f172a" />
        )}
      </mesh>

      {/* Cyber Glowing Border Line */}
      <lineSegments position={[0, 0, 0.07]}>
        <edgesGeometry args={[boxGeoEdges]} />
        <lineBasicMaterial
          color={brother.themeColor}
          transparent
          opacity={isHovered ? 1 : 0.8}
          linewidth={2}
        />
      </lineSegments>

      {/* Glowing Orbital Halo Ring around Card */}
      <Ring args={[1.7, 1.76, 48]} position={[0, 0, -0.15]}>
        <meshBasicMaterial
          color={brother.themeColor}
          transparent
          opacity={isHovered ? 0.85 : 0.4}
          side={THREE.DoubleSide}
        />
      </Ring>
    </group>
  );
}

// =========================================================================
// CONNECTING ENERGY ORBIT TRAILS
// =========================================================================

function OrbitEnergyPath({ radius }: { radius: number }) {
  const lineObj = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * (radius * 0.45)));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: '#00f2fe',
      transparent: true,
      opacity: 0.25,
      linewidth: 1
    });
    return new THREE.Line(geo, mat);
  }, [radius]);

  return <primitive object={lineObj} />;
}

// =========================================================================
// MAIN EXPORT SCENE
// =========================================================================

export const FamilyOrbitScene = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

  return (
    <div className="w-full h-[480px] sm:h-[560px] md:h-[620px] relative" style={{ touchAction: 'pan-y' }}>
      <Canvas
        camera={{ position: [0, 2.2, 8.8], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 5, 8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 0, 4]} intensity={2.0} color="#00f2fe" distance={15} />

        <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.35}>
          <HoloCoreNucleus />
          <OrbitEnergyPath radius={4.2} />

          {BROTHERS_DATA.map((brother, i) => (
            <OrbitCard
              key={brother.number}
              brother={brother}
              angleOffset={angles[i]}
              radius={4.2}
              activeId={activeId}
              onHover={setActiveId}
            />
          ))}
        </Float>
      </Canvas>
    </div>
  );
};
