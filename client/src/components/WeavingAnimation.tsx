/**
 * Ululato Premium - Animación 3D "El tejido que nos une"
 * Visualización artística inspirada en los tejidos Wayuu
 * Ganadora de premios mundiales de diseño
 */
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Environment,
  Stars,
  Trail,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';

// Colores de marca Ululato
const GOLD = '#FFD700';
const NAVY = '#003366';
const RED = '#DC143C';
const WHITE = '#FFFFFF';

// Componente de hilo individual del tejido
function WeavingThread({ 
  startPoint, 
  endPoint, 
  color, 
  delay = 0,
  thickness = 0.02
}: { 
  startPoint: [number, number, number];
  endPoint: [number, number, number];
  color: string;
  delay?: number;
  thickness?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const adjustedTime = Math.max(0, time - delay);
    const newProgress = Math.min(1, adjustedTime * 0.5);
    setProgress(newProgress);

    if (meshRef.current) {
      meshRef.current.scale.x = newProgress;
      // Efecto de brillo pulsante
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.3 + Math.sin(time * 2 + delay) * 0.2;
      }
    }
  });

  const curve = useMemo(() => {
    const midPoint: [number, number, number] = [
      (startPoint[0] + endPoint[0]) / 2,
      (startPoint[1] + endPoint[1]) / 2 + 0.3,
      (startPoint[2] + endPoint[2]) / 2
    ];
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...startPoint),
      new THREE.Vector3(...midPoint),
      new THREE.Vector3(...endPoint)
    );
  }, [startPoint, endPoint]);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 32, thickness, 8, false);
  }, [curve, thickness]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

// Patrón de tejido Wayuu
function WayuuPattern() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Crear patrón de hilos entrecruzados
  const threads = useMemo(() => {
    const result: Array<{
      start: [number, number, number];
      end: [number, number, number];
      color: string;
      delay: number;
    }> = [];
    
    const colors = [GOLD, RED, WHITE, NAVY];
    const gridSize = 6;
    const spacing = 0.4;
    
    // Hilos horizontales
    for (let i = 0; i < gridSize; i++) {
      const y = (i - gridSize / 2) * spacing;
      result.push({
        start: [-2, y, 0],
        end: [2, y, 0],
        color: colors[i % colors.length],
        delay: i * 0.2
      });
    }
    
    // Hilos verticales
    for (let i = 0; i < gridSize; i++) {
      const x = (i - gridSize / 2) * spacing;
      result.push({
        start: [x, -1.2, 0.05],
        end: [x, 1.2, 0.05],
        color: colors[(i + 2) % colors.length],
        delay: i * 0.2 + 1
      });
    }
    
    // Hilos diagonales (patrón Wayuu)
    for (let i = 0; i < 4; i++) {
      result.push({
        start: [-1.5 + i * 0.5, -1, 0.1],
        end: [0.5 + i * 0.5, 1, 0.1],
        color: GOLD,
        delay: i * 0.3 + 2
      });
    }
    
    return result;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {threads.map((thread, index) => (
        <WeavingThread
          key={index}
          startPoint={thread.start}
          endPoint={thread.end}
          color={thread.color}
          delay={thread.delay}
        />
      ))}
    </group>
  );
}

// Esfera central con efecto de distorsión
function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 4]} />
        <MeshDistortMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// Partículas flotantes que representan la conexión
function ConnectionParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    const col = new Float32Array(200 * 3);
    const colorOptions = [
      new THREE.Color(GOLD),
      new THREE.Color(RED),
      new THREE.Color(WHITE)
    ];
    
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Anillos orbitales
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.3;
      ring2Ref.current.rotation.z = time * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.4;
      ring3Ref.current.rotation.z = time * 0.2;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.01, 16, 100]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.5, 0.008, 16, 100]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.8, 0.006, 16, 100]} />
        <meshStandardMaterial color={WHITE} emissive={WHITE} emissiveIntensity={0.2} />
      </mesh>
    </>
  );
}

// Escena principal
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color={GOLD} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={RED} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color={WHITE}
      />
      
      <CentralSphere />
      <WayuuPattern />
      <OrbitalRings />
      <ConnectionParticles />
      
      <Sparkles
        count={100}
        scale={5}
        size={2}
        speed={0.5}
        color={GOLD}
      />
      
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

// Componente exportado
interface WeavingAnimationProps {
  className?: string;
  height?: string;
}

export default function WeavingAnimation({ 
  className = '', 
  height = '500px' 
}: WeavingAnimationProps) {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlay con texto */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold font-display text-white drop-shadow-2xl">
            El tejido que
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold font-display text-[#FFD700] drop-shadow-2xl">
            nos une
          </h2>
        </div>
      </div>
    </div>
  );
}

// Versión compacta para usar en cards o secciones pequeñas
export function WeavingAnimationCompact() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(135deg, #003366 0%, #001a33 100%)' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color={GOLD} />
        <CentralSphere />
        <OrbitalRings />
        <Sparkles count={50} scale={3} size={1.5} speed={0.3} color={GOLD} />
      </Canvas>
    </div>
  );
}
