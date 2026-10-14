import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Html, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { BROTHERS_DATA, Brother } from '../data/brothers';
import { createBrotherPlaceholderTexture, loadBrotherPhotoTexture } from './PhotoTextureHelper';

interface ProfileCard3DProps {
  brother: Brother;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isPrimary?: boolean;
  mousePos: { x: number; y: number };
  onCardClick?: () => void;
}

function CardOrbitalRings({ themeColor, hovered }: { themeColor: string; hovered: boolean }) {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const crystal = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.45;
      ring1.current.rotation.y = t * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.4;
      ring2.current.rotation.z = t * 0.3;
    }
    if (crystal.current) {
      crystal.current.rotation.x = t * 0.6;
      crystal.current.rotation.y = t * 0.5;
      crystal.current.position.y = 2.2 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <>
      {/* 3D Dynamic Counter-Rotating Orbital Rings */}
      <Ring ref={ring1} args={[2.5, 2.56, 64]} position={[0, 0, -0.2]}>
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={hovered ? 0.95 : 0.6}
          side={THREE.DoubleSide}
        />
      </Ring>
      <Ring ref={ring2} args={[2.95, 3.01, 64]} position={[0, 0, -0.35]}>
        <meshBasicMaterial
          color={themeColor}
          transparent
          opacity={hovered ? 0.75 : 0.4}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Floating Rotating 3D Geometric Crystal */}
      <mesh ref={crystal} position={[1.8, 2.2, 0.2]}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color={themeColor}
          wireframe
          emissive={themeColor}
          emissiveIntensity={hovered ? 1.4 : 0.9}
        />
      </mesh>
    </>
  );
}

function ProfileCard3D({
  brother,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isPrimary = false,
  mousePos,
  onCardClick
}: ProfileCard3DProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [imageTexture, setImageTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    loadBrotherPhotoTexture(
      brother.image,
      (tex) => setImageTexture(tex),
      () => {
        const fallback = createBrotherPlaceholderTexture(
          brother.number,
          brother.name,
          brother.role,
          brother.themeColor
        );
        setImageTexture(fallback);
      }
    );
  }, [brother]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetRotX = rotation[0] + (mousePos.y * 0.18);
    const targetRotY = rotation[1] + (mousePos.x * 0.22) + (hovered ? 0.08 : 0);
    const targetPosZ = position[2] + (hovered ? 0.5 : 0);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.08);
  });

  const outerBoxEdges = useMemo(() => new THREE.BoxGeometry(3.38, 4.58, 0.12), []);
  const innerPhotoEdges = useMemo(() => new THREE.BoxGeometry(3.12, 3.92, 0.04), []);

  return (
    <Float
      speed={isPrimary ? 2.2 : 1.7}
      rotationIntensity={0.2}
      floatIntensity={0.45}
    >
      <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onCardClick}
      >
        {/* Dynamic Counter-Rotating Orbital Rings & Crystals */}
        <CardOrbitalRings themeColor={brother.themeColor} hovered={hovered} />

        {/* Outer Dark Glass Backplate Chassis */}
        <RoundedBox
          args={[3.36, 4.56, 0.1]}
          radius={0.14}
          smoothness={3}
          position={[0, 0, -0.02]}
        >
          <meshPhysicalMaterial
            transparent
            opacity={0.92}
            roughness={0.2}
            metalness={0.8}
            color="#070a13"
            emissive={brother.themeColor}
            emissiveIntensity={hovered ? 0.4 : 0.08}
          />
        </RoundedBox>

        {/* Photo Plane - Full Portrait Format, Razor Sharp & 100% Clear */}
        <mesh position={[0, 0.22, 0.06]}>
          <planeGeometry args={[3.08, 3.88]} />
          {imageTexture ? (
            <meshBasicMaterial
              map={imageTexture}
              toneMapped={false}
              side={THREE.FrontSide}
            />
          ) : (
            <meshStandardMaterial color="#111827" />
          )}
        </mesh>

        {/* Inner Precision Photo Bezel */}
        <lineSegments position={[0, 0.22, 0.07]}>
          <edgesGeometry args={[innerPhotoEdges]} />
          <lineBasicMaterial
            color={brother.themeColor}
            transparent
            opacity={hovered ? 0.9 : 0.6}
            linewidth={1}
          />
        </lineSegments>

        {/* Outer Glowing Neon Border Frame */}
        <lineSegments position={[0, 0, 0.08]}>
          <edgesGeometry args={[outerBoxEdges]} />
          <lineBasicMaterial
            color={hovered ? "#00f2fe" : brother.themeColor}
            transparent
            opacity={hovered ? 1 : 0.85}
            linewidth={2}
          />
        </lineSegments>

        {/* Info Label - Placed Safely with NO occlude glitch for 100% crystal clear visibility */}
        <Html
          position={[0, -2.4, 0.12]}
          transform
          center
          distanceFactor={5.2}
          className="pointer-events-none select-none w-64 text-center"
        >
          <div
            className="px-4 py-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
            style={{
              backgroundColor: 'rgba(7, 10, 19, 0.94)',
              borderColor: hovered ? brother.themeColor : 'rgba(255, 255, 255, 0.15)',
              boxShadow: hovered ? `0 0 25px ${brother.themeColor}55` : '0 10px 30px rgba(0,0,0,0.85)'
            }}
          >
            <div className="flex items-center justify-center space-x-1.5 mb-1">
              <span
                className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${brother.themeColor}25`,
                  color: brother.themeColor,
                  border: `1px solid ${brother.themeColor}55`
                }}
              >
                {brother.number}
              </span>
              <span className="text-[9px] tracking-wider text-gray-300 uppercase font-mono">
                {brother.relationship}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide truncate">
              {brother.name}
            </h3>
            <p className="text-[11px] font-medium truncate mt-0.5" style={{ color: brother.themeColor }}>
              {brother.role}
            </p>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function ConnectingEnergyLines({ pos1, pos2, pos3 }: { pos1: number[]; pos2: number[]; pos3: number[] }) {
  const line1 = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pos1[0], pos1[1], pos1[2]),
      new THREE.Vector3(pos2[0], pos2[1], pos2[2])
    ]);
    const mat = new THREE.LineBasicMaterial({ color: '#2563eb', transparent: true, opacity: 0.45 });
    return new THREE.Line(geo, mat);
  }, [pos1, pos2]);

  const line2 = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pos2[0], pos2[1], pos2[2]),
      new THREE.Vector3(pos3[0], pos3[1], pos3[2])
    ]);
    const mat = new THREE.LineBasicMaterial({ color: '#f59e0b', transparent: true, opacity: 0.45 });
    return new THREE.Line(geo, mat);
  }, [pos2, pos3]);

  return (
    <>
      <primitive object={line1} />
      <primitive object={line2} />
    </>
  );
}

function HeroSceneContent() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 9;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToSection = (brotherNumber: string) => {
    const el = document.getElementById(`brother-${brotherNumber}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Reordered Hero Showcase:
  // Left: 03 Rabiul Islam (Eldest)
  // Center: 02 Ibrahim Hossain (Middle)
  // Right: 01 Raihan Hossain (Youngest)
  const pos03_Rabiul = isMobile ? [-1.3, 0.4, 0.4] : [-3.8, -1.2, 0.2];
  const pos02_Ibrahim = isMobile ? [0, -0.6, 0.8] : [0, -0.9, 0.7]; // Center-stage prominence
  const pos01_Raihan = isMobile ? [1.3, 0.4, 0.4] : [3.8, -1.2, 0.2];
  const cardScale = isMobile ? 0.38 : 0.88;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 4, 10]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-6, 4, 4]} intensity={2.5} color="#2563eb" distance={22} />
      <pointLight position={[0, 2, 6]} intensity={2.5} color="#f59e0b" distance={18} />
      <pointLight position={[6, 4, 4]} intensity={2.5} color="#00f2fe" distance={22} />

      <ConnectingEnergyLines pos1={pos03_Rabiul} pos2={pos02_Ibrahim} pos3={pos01_Raihan} />

      <group position={[0, 0, 0]}>
        {/* 03 RABIUL ISLAM (LEFT) */}
        <ProfileCard3D
          brother={BROTHERS_DATA[2]}
          position={pos03_Rabiul as [number, number, number]}
          rotation={[0.04, isMobile ? 0.05 : 0.18, -0.02]}
          scale={cardScale}
          isPrimary={false}
          mousePos={mousePos}
          onCardClick={() => handleScrollToSection('03')}
        />

        {/* 02 IBRAHIM HOSSAIN (CENTER) */}
        <ProfileCard3D
          brother={BROTHERS_DATA[1]}
          position={pos02_Ibrahim as [number, number, number]}
          rotation={[0, 0, 0]}
          scale={cardScale + 0.04}
          isPrimary={true}
          mousePos={mousePos}
          onCardClick={() => handleScrollToSection('02')}
        />

        {/* 01 RAIHAN HOSSAIN (RIGHT) */}
        <ProfileCard3D
          brother={BROTHERS_DATA[0]}
          position={pos01_Raihan as [number, number, number]}
          rotation={[-0.04, isMobile ? -0.05 : -0.18, 0.02]}
          scale={cardScale}
          isPrimary={false}
          mousePos={mousePos}
          onCardClick={() => handleScrollToSection('01')}
        />
      </group>
    </>
  );
}

export const HeroScene = () => {
  return (
    <div className="w-full h-full relative" style={{ touchAction: 'pan-y' }}>
      <Canvas
        camera={{ position: [0, 0, 9.8], fov: 46 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={window.matchMedia('(max-width: 768px)').matches ? 1 : [1, 2]}
      >
        <HeroSceneContent />
      </Canvas>
    </div>
  );
};
