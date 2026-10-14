import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// =========================================================================
// ULTRA-SLEEK CINEMATIC LUXURY DARK BACKGROUND (Performance Optimized)
// =========================================================================

function CinematicDarkNebula() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Very subtle, deep animated gradient background shader
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Deep dark core background (almost black)
          vec3 color = vec3(0.015, 0.02, 0.035);

          // Very faint moving cyber/ambient glows at the corners/edges
          float glow1 = smoothstep(1.2, 0.0, length(uv - vec2(0.2, 0.2))) * (0.04 + 0.02 * sin(uTime * 0.4));
          float glow2 = smoothstep(1.3, 0.0, length(uv - vec2(0.8, 0.7))) * (0.05 + 0.02 * cos(uTime * 0.3));
          float glow3 = smoothstep(1.5, 0.0, length(uv - vec2(0.5, 0.9))) * (0.03 + 0.015 * sin(uTime * 0.2));

          vec3 accent1 = vec3(0.0, 0.25, 0.5); // Cyan hint
          vec3 accent2 = vec3(0.3, 0.15, 0.0); // Amber hint
          vec3 accent3 = vec3(0.1, 0.0, 0.2);  // Purple hint

          color += glow1 * accent1;
          color += glow2 * accent2;
          color += glow3 * accent3;

          // Noise grain
          float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
          color -= noise * 0.012; // Extremely subtle noise to prevent banding

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 }
      },
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={[60, 60, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function FloatingCyberParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = window.matchMedia('(max-width: 768px)').matches ? 200 : 800;

  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rands = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread across a huge volume
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = -5 - Math.random() * 20;
      rands[i] = Math.random();
    }
    return { positions: pos, randoms: rands };
  }, [count]);

  const pMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float randoms;
        varying float vRandom;
        uniform float uTime;
        void main() {
          vRandom = randoms;
          vec3 pos = position;

          // Slow floating drift
          pos.y += sin(uTime * 0.1 + randoms * 10.0) * 1.5;
          pos.x += cos(uTime * 0.08 + randoms * 10.0) * 1.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Perspective size scaling
          gl_PointSize = (3.5 * randoms + 1.0) * (15.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying float vRandom;
        void main() {
          vec2 coords = gl_PointCoord - vec2(0.5);
          float dist = length(coords);
          if (dist > 0.5) discard;

          // Soft glowing dot
          float alpha = smoothstep(0.5, 0.1, dist);

          // Mix colors based on random seed
          vec3 col1 = vec3(0.5, 0.8, 1.0); // Cyan/White
          vec3 col2 = vec3(1.0, 0.7, 0.3); // Gold
          vec3 finalCol = mix(col1, col2, vRandom);

          gl_FragColor = vec4(finalCol, alpha * 0.4);
        }
      `,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame((state) => {
    if (pMat) {
      pMat.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-randoms" count={count} array={randoms} itemSize={1} />
      </bufferGeometry>
      <primitive object={pMat} attach="material" />
    </points>
  );
}

function DarkUniverse() {
  const groupRef = useRef<THREE.Group>(null!);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle parallax response to mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mousePos.x * 0.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -mousePos.y * 0.5, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.05, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <CinematicDarkNebula />
      <Stars radius={50} depth={30} count={3000} factor={4} saturation={0} fade speed={1} />
      <FloatingCyberParticles />
      {/* Front layer sparkles for depth */}
      <Sparkles count={50} scale={20} size={4} speed={0.2} color="#ffffff" opacity={0.3} position={[0, 0, -3]} />
    </group>
  );
}

export const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#030407]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={window.matchMedia('(max-width: 768px)').matches ? 1 : [1, 1.5]}
      >
        <AmbientGlow />
        <DarkUniverse />
      </Canvas>
    </div>
  );
};

function AmbientGlow() {
  return <ambientLight intensity={0.1} color="#ffffff" />;
}
