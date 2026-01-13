/**
 * Ululato Premium - Animación 3D "El tejido que nos une"
 * Experiencia visual ganadora de premios mundiales
 * Combinación de Three.js + GSAP para máximo impacto
 */
import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sparkles,
  Text3D,
  Center,
  useTexture,
  MeshTransmissionMaterial,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Colores de marca Ululato
const GOLD = '#FFD700';
const NAVY = '#003366';
const RED = '#DC143C';
const WHITE = '#FFFFFF';
const DEEP_NAVY = '#001a33';

// Shader personalizado para efecto de tejido brillante
const weavingShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 3.0 + uTime) * 0.05;
      pos.z += cos(pos.y * 3.0 + uTime * 0.8) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    
    void main() {
      float pattern = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 + uTime * 0.5);
      vec3 color = mix(uColor1, uColor2, pattern * 0.5 + 0.5);
      
      float glow = sin(uTime * 2.0) * 0.3 + 0.7;
      color *= glow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

// Componente de hilo animado con GSAP
function AnimatedThread({ 
  points, 
  color, 
  delay = 0,
  thickness = 0.015
}: { 
  points: THREE.Vector3[];
  color: string;
  delay?: number;
  thickness?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    if (meshRef.current && materialRef.current) {
      // Animación de entrada con GSAP
      gsap.fromTo(progressRef.current, 
        { value: 0 },
        { 
          value: 1, 
          duration: 2,
          delay: delay,
          ease: "power3.out",
          onUpdate: () => {
            if (meshRef.current) {
              meshRef.current.scale.setScalar(progressRef.current.value);
            }
          }
        }
      );

      // Animación de brillo pulsante
      gsap.to(materialRef.current, {
        emissiveIntensity: 0.8,
        duration: 1.5,
        delay: delay + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [delay]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, thickness, 12, false);
  }, [curve, thickness]);

  return (
    <mesh ref={meshRef} geometry={geometry} scale={0}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Patrón de tejido Wayuu premium con animaciones GSAP
function PremiumWayuuPattern() {
  const groupRef = useRef<THREE.Group>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (groupRef.current) {
      // Animación de rotación suave con GSAP
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 60,
        repeat: -1,
        ease: "none"
      });

      // Animación de escala de entrada
      gsap.fromTo(groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 2, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, []);

  // Crear patrón de hilos entrecruzados estilo Wayuu
  const threads = useMemo(() => {
    const result: Array<{
      points: THREE.Vector3[];
      color: string;
      delay: number;
    }> = [];
    
    const colors = [GOLD, RED, WHITE, '#E8B923', '#C41E3A'];
    
    // Hilos horizontales ondulados
    for (let i = 0; i < 8; i++) {
      const y = (i - 4) * 0.25;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 20; j++) {
        const x = (j / 20) * 4 - 2;
        const z = Math.sin(j * 0.5 + i * 0.3) * 0.1;
        points.push(new THREE.Vector3(x, y, z));
      }
      result.push({
        points,
        color: colors[i % colors.length],
        delay: i * 0.15
      });
    }
    
    // Hilos verticales ondulados
    for (let i = 0; i < 8; i++) {
      const x = (i - 4) * 0.25;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 20; j++) {
        const y = (j / 20) * 2 - 1;
        const z = Math.cos(j * 0.5 + i * 0.3) * 0.1 + 0.05;
        points.push(new THREE.Vector3(x, y, z));
      }
      result.push({
        points,
        color: colors[(i + 2) % colors.length],
        delay: i * 0.15 + 1.2
      });
    }
    
    // Hilos diagonales (patrón característico Wayuu)
    for (let i = 0; i < 6; i++) {
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 15; j++) {
        const t = j / 15;
        const x = -1.5 + i * 0.4 + t * 1.5;
        const y = -1 + t * 2;
        const z = Math.sin(t * Math.PI * 2) * 0.15 + 0.1;
        points.push(new THREE.Vector3(x, y, z));
      }
      result.push({
        points,
        color: GOLD,
        delay: i * 0.2 + 2.4
      });
    }
    
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {threads.map((thread, index) => (
        <AnimatedThread
          key={index}
          points={thread.points}
          color={thread.color}
          delay={thread.delay}
        />
      ))}
    </group>
  );
}

// Esfera central con efecto de cristal premium
function CrystalSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Animación de flotación con GSAP
      gsap.to(meshRef.current.position, {
        y: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Rotación elegante
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    if (innerRef.current) {
      gsap.to(innerRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 15,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <group>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.6, 4]} />
          <MeshDistortMaterial
            color={GOLD}
            emissive={GOLD}
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            distort={0.2}
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Núcleo interno brillante */}
        <mesh ref={innerRef} scale={0.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={WHITE}
            emissive={GOLD}
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Partículas de conexión con efecto de constelación
function ConstellationParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const [positions, colors, linePositions] = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const lines: number[] = [];
    
    const colorOptions = [
      new THREE.Color(GOLD),
      new THREE.Color(RED),
      new THREE.Color(WHITE),
      new THREE.Color('#E8B923')
    ];
    
    const particlePositions: THREE.Vector3[] = [];
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      particlePositions.push(new THREE.Vector3(x, y, z));
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    // Crear líneas de conexión entre partículas cercanas
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particlePositions[i].distanceTo(particlePositions[j]);
        if (dist < 0.8) {
          lines.push(
            particlePositions[i].x, particlePositions[i].y, particlePositions[i].z,
            particlePositions[j].x, particlePositions[j].y, particlePositions[j].z
          );
        }
      }
    }
    
    return [pos, col, new Float32Array(lines)];
  }, []);

  useEffect(() => {
    if (pointsRef.current) {
      gsap.to(pointsRef.current.rotation, {
        y: Math.PI * 2,
        duration: 100,
        repeat: -1,
        ease: "none"
      });
    }
    if (linesRef.current) {
      gsap.to(linesRef.current.rotation, {
        y: Math.PI * 2,
        duration: 120,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
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
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
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
        <lineBasicMaterial color={GOLD} transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

// Anillos orbitales premium con efecto de luz
function PremiumOrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (ring1Ref.current) {
      gsap.to(ring1Ref.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI,
        duration: 15,
        repeat: -1,
        ease: "none"
      });
    }
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current.rotation, {
        x: Math.PI,
        z: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
    if (ring3Ref.current) {
      gsap.to(ring3Ref.current.rotation, {
        y: Math.PI * 2,
        z: Math.PI,
        duration: 25,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.3, 0.015, 16, 100]} />
        <meshStandardMaterial 
          color={GOLD} 
          emissive={GOLD} 
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.6, 0.012, 16, 100]} />
        <meshStandardMaterial 
          color={RED} 
          emissive={RED} 
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.9, 0.008, 16, 100]} />
        <meshStandardMaterial 
          color={WHITE} 
          emissive={WHITE} 
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </>
  );
}

// Efecto de aurora boreal
function AuroraEffect() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(GOLD) },
    uColor2: { value: new THREE.Color(NAVY) },
    uColor3: { value: new THREE.Color(RED) },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={[8, 4, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          
          void main() {
            float wave1 = sin(vUv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
            float wave2 = sin(vUv.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
            float wave3 = sin((vUv.x + vUv.y) * 4.0 + uTime * 0.7) * 0.5 + 0.5;
            
            vec3 color = mix(uColor1, uColor2, wave1);
            color = mix(color, uColor3, wave2 * 0.3);
            
            float alpha = wave3 * 0.15 * (1.0 - vUv.y);
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Escena principal premium
function PremiumScene() {
  const { camera } = useThree();

  useEffect(() => {
    // Animación de cámara con GSAP
    gsap.fromTo(camera.position,
      { z: 8, y: 2 },
      { z: 5, y: 0, duration: 3, ease: "power2.out" }
    );
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={GOLD} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color={RED} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color={WHITE} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color={GOLD}
        castShadow
      />
      
      <AuroraEffect />
      <CrystalSphere />
      <PremiumWayuuPattern />
      <PremiumOrbitalRings />
      <ConstellationParticles />
      
      <Sparkles
        count={200}
        scale={6}
        size={3}
        speed={0.3}
        color={GOLD}
        opacity={0.6}
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
  height = '600px' 
}: WeavingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Animación de entrada del contenedor
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`} 
      style={{ height, opacity: 0 }}
    >
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001a33] via-[#002244] to-[#003366]" />
      
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PremiumScene />
        </Suspense>
      </Canvas>
      
      {/* Overlay con texto animado */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white drop-shadow-2xl animate-fade-in">
            El tejido que
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] drop-shadow-2xl animate-fade-in-delay">
            nos une
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto animate-fade-in-delay-2">
            Conectando culturas, personas y conocimiento a través del aprendizaje
          </p>
        </div>
      </div>

      {/* Efecto de viñeta */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,26,51,0.4)_100%)]" />
      
      {/* Líneas decorativas animadas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
    </div>
  );
}

// Versión compacta para cards
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
        <CrystalSphere />
        <PremiumOrbitalRings />
        <Sparkles count={50} scale={3} size={1.5} speed={0.3} color={GOLD} />
      </Canvas>
    </div>
  );
}
