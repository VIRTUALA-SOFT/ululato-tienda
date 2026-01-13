/**
 * Ululato Premium - Animación 3D Revolucionaria
 * "El ADN del Conocimiento" - Una experiencia visual sin precedentes
 * 
 * Conceptos vanguardistas:
 * - Doble hélice de ADN representando el conocimiento ancestral + moderno
 * - Partículas morfológicas que fluyen como neuronas conectándose
 * - Geometría generativa basada en patrones Wayuu
 * - Efecto de gravedad y atracción entre elementos
 * - Ondas de energía que pulsan desde el centro
 * - Transiciones fluidas con física realista
 */
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial,
  Sparkles,
  Trail,
  MeshWobbleMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Colores de marca Ululato
const GOLD = new THREE.Color('#FFD700');
const GOLD_LIGHT = new THREE.Color('#FFA500');
const NAVY = new THREE.Color('#003366');
const NAVY_DEEP = new THREE.Color('#001a33');
const RED = new THREE.Color('#DC143C');
const WHITE = new THREE.Color('#FFFFFF');
const CYAN = new THREE.Color('#00D4FF');
const MAGENTA = new THREE.Color('#FF00FF');

// ============================================
// COMPONENTE: Doble Hélice del Conocimiento
// Representa la fusión del conocimiento ancestral y moderno
// ============================================
function KnowledgeDNA() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const helixRef1 = useRef<THREE.Group>(null);
  const helixRef2 = useRef<THREE.Group>(null);

  // Crear partículas que fluyen por la hélice
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8;
      const radius = 0.8 + Math.random() * 0.4;
      
      positions[i * 3] = Math.cos(t) * radius;
      positions[i * 3 + 1] = (i / count) * 6 - 3;
      positions[i * 3 + 2] = Math.sin(t) * radius;
      
      // Gradiente de colores
      const colorMix = i / count;
      const color = new THREE.Color().lerpColors(GOLD, CYAN, colorMix);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  // Crear esferas de la hélice
  const helixSpheres = useMemo(() => {
    const spheres: Array<{ position: THREE.Vector3; color: THREE.Color; scale: number }> = [];
    const segments = 40;
    
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 4;
      const y = (i / segments) * 6 - 3;
      
      // Hélice 1
      spheres.push({
        position: new THREE.Vector3(Math.cos(t) * 1.2, y, Math.sin(t) * 1.2),
        color: i % 2 === 0 ? GOLD : RED,
        scale: 0.08 + Math.sin(i * 0.5) * 0.03
      });
      
      // Hélice 2 (opuesta)
      spheres.push({
        position: new THREE.Vector3(Math.cos(t + Math.PI) * 1.2, y, Math.sin(t + Math.PI) * 1.2),
        color: i % 2 === 0 ? CYAN : WHITE,
        scale: 0.08 + Math.cos(i * 0.5) * 0.03
      });
    }
    
    return spheres;
  }, []);

  // Conexiones entre hélices (puentes del ADN)
  const bridges = useMemo(() => {
    const result: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];
    const segments = 20;
    
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 4;
      const y = (i / segments) * 6 - 3;
      
      result.push({
        start: new THREE.Vector3(Math.cos(t) * 1.2, y, Math.sin(t) * 1.2),
        end: new THREE.Vector3(Math.cos(t + Math.PI) * 1.2, y, Math.sin(t + Math.PI) * 1.2)
      });
    }
    
    return result;
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      // Animación de entrada épica
      gsap.fromTo(groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { 
          x: 1, y: 1, z: 1, 
          duration: 2.5, 
          ease: "elastic.out(1, 0.3)",
          delay: 0.5
        }
      );

      // Rotación continua elegante
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animar partículas fluyendo
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        const idx = i * 3;
        const t = (i / (positions.length / 3)) * Math.PI * 8 + time * 0.5;
        const radius = 0.8 + Math.sin(time + i * 0.1) * 0.2;
        
        positions[idx] = Math.cos(t) * radius;
        positions[idx + 2] = Math.sin(t) * radius;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      {/* Partículas fluyendo */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Esferas de la hélice */}
      {helixSpheres.map((sphere, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={sphere.position} scale={sphere.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Puentes de conexión */}
      {bridges.map((bridge, i) => {
        const midPoint = new THREE.Vector3().lerpVectors(bridge.start, bridge.end, 0.5);
        const direction = new THREE.Vector3().subVectors(bridge.end, bridge.start);
        const length = direction.length();
        
        return (
          <mesh
            key={`bridge-${i}`}
            position={midPoint}
            rotation={[0, 0, Math.atan2(direction.y, direction.x)]}
          >
            <cylinderGeometry args={[0.015, 0.015, length, 8]} />
            <meshStandardMaterial
              color={GOLD}
              emissive={GOLD}
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ============================================
// COMPONENTE: Neuronas del Aprendizaje
// Partículas que se conectan como sinapsis
// ============================================
function LearningNeurons() {
  const groupRef = useRef<THREE.Group>(null);
  const neuronsRef = useRef<THREE.InstancedMesh>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  
  const neuronCount = 100;
  
  const [positions] = useState(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < neuronCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      
      pos.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    return pos;
  });

  const connectionGeometry = useMemo(() => {
    const vertices: number[] = [];
    
    // Conectar neuronas cercanas
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < 1.2) {
          vertices.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
        }
      }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [positions]);

  useEffect(() => {
    if (neuronsRef.current) {
      const dummy = new THREE.Object3D();
      const color = new THREE.Color();
      
      positions.forEach((pos, i) => {
        dummy.position.copy(pos);
        dummy.scale.setScalar(0.05 + Math.random() * 0.03);
        dummy.updateMatrix();
        neuronsRef.current!.setMatrixAt(i, dummy.matrix);
        
        // Color gradiente
        color.lerpColors(GOLD, CYAN, i / positions.length);
        neuronsRef.current!.setColorAt(i, color);
      });
      
      neuronsRef.current.instanceMatrix.needsUpdate = true;
      if (neuronsRef.current.instanceColor) {
        neuronsRef.current.instanceColor.needsUpdate = true;
      }
    }

    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 60,
        repeat: -1,
        ease: "none"
      });
    }
  }, [positions]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (neuronsRef.current) {
      const dummy = new THREE.Object3D();
      
      positions.forEach((pos, i) => {
        // Movimiento orgánico
        const offset = Math.sin(time * 0.5 + i * 0.1) * 0.1;
        dummy.position.set(
          pos.x + Math.sin(time + i) * offset,
          pos.y + Math.cos(time + i) * offset,
          pos.z + Math.sin(time * 0.5 + i) * offset
        );
        dummy.scale.setScalar(0.05 + Math.sin(time * 2 + i) * 0.02);
        dummy.updateMatrix();
        neuronsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      neuronsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Pulso en las conexiones
    if (connectionsRef.current) {
      const material = connectionsRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={neuronsRef} args={[undefined, undefined, neuronCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          emissive={GOLD}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>
      
      <lineSegments ref={connectionsRef} geometry={connectionGeometry}>
        <lineBasicMaterial
          color={GOLD}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// ============================================
// COMPONENTE: Núcleo Central de Energía
// El corazón pulsante del conocimiento
// ============================================
function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (coreRef.current) {
      // Pulso del núcleo
      gsap.to(coreRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (ringsRef.current) {
      // Rotación de anillos
      ringsRef.current.children.forEach((ring, i) => {
        gsap.to(ring.rotation, {
          x: Math.PI * 2,
          y: Math.PI * (i % 2 === 0 ? 1 : -1),
          z: Math.PI * 2 * (i % 3 === 0 ? 1 : -1),
          duration: 10 + i * 2,
          repeat: -1,
          ease: "none"
        });
      });
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 3) * 0.2;
    }
  });

  return (
    <group>
      {/* Núcleo principal */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <MeshDistortMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
          distort={0.4}
          speed={3}
        />
      </mesh>

      {/* Glow exterior */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Anillos orbitales */}
      <group ref={ringsRef}>
        {[0.8, 1.1, 1.4, 1.7].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 4 * i, Math.PI / 3 * i, 0]}>
            <torusGeometry args={[radius, 0.008, 16, 100]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? GOLD : CYAN}
              emissive={i % 2 === 0 ? GOLD : CYAN}
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================
// COMPONENTE: Ondas de Energía
// Pulsos que emanan del centro
// ============================================
function EnergyWaves() {
  const wavesRef = useRef<THREE.Group>(null);
  const waveCount = 5;

  useEffect(() => {
    if (wavesRef.current) {
      wavesRef.current.children.forEach((wave, i) => {
        const mesh = wave as THREE.Mesh;
        
        // Animación de expansión
        gsap.fromTo(mesh.scale,
          { x: 0.1, y: 0.1, z: 0.1 },
          {
            x: 4,
            y: 4,
            z: 4,
            duration: 3,
            delay: i * 0.6,
            repeat: -1,
            ease: "power1.out"
          }
        );

        // Desvanecimiento
        gsap.fromTo(mesh.material,
          { opacity: 0.6 },
          {
            opacity: 0,
            duration: 3,
            delay: i * 0.6,
            repeat: -1,
            ease: "power1.out"
          }
        );
      });
    }
  }, []);

  return (
    <group ref={wavesRef}>
      {Array.from({ length: waveCount }).map((_, i) => (
        <mesh key={i}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? GOLD : CYAN}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// COMPONENTE: Patrones Wayuu Flotantes
// Geometría sagrada inspirada en la cultura Wayuu
// ============================================
function WayuuPatterns() {
  const groupRef = useRef<THREE.Group>(null);
  
  const patterns = useMemo(() => {
    const result: Array<{
      position: THREE.Vector3;
      rotation: THREE.Euler;
      scale: number;
      type: 'diamond' | 'cross' | 'zigzag';
    }> = [];
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.5;
      
      result.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        scale: 0.15 + Math.random() * 0.1,
        type: ['diamond', 'cross', 'zigzag'][i % 3] as 'diamond' | 'cross' | 'zigzag'
      });
    }
    
    return result;
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        // Flotación individual
        gsap.to(child.position, {
          y: child.position.y + 0.3,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });

        // Rotación suave
        gsap.to(child.rotation, {
          y: child.rotation.y + Math.PI * 2,
          duration: 15 + Math.random() * 10,
          repeat: -1,
          ease: "none"
        });
      });

      // Rotación del grupo completo
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 80,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {patterns.map((pattern, i) => (
        <Float key={i} speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh
            position={pattern.position}
            rotation={pattern.rotation}
            scale={pattern.scale}
          >
            {pattern.type === 'diamond' && (
              <octahedronGeometry args={[1, 0]} />
            )}
            {pattern.type === 'cross' && (
              <boxGeometry args={[0.2, 1.5, 0.2]} />
            )}
            {pattern.type === 'zigzag' && (
              <tetrahedronGeometry args={[1, 0]} />
            )}
            <MeshWobbleMaterial
              color={i % 3 === 0 ? GOLD : i % 3 === 1 ? RED : WHITE}
              emissive={i % 3 === 0 ? GOLD : i % 3 === 1 ? RED : WHITE}
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.3}
              factor={0.3}
              speed={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ============================================
// COMPONENTE: Campo de Estrellas Dinámico
// Fondo inmersivo con profundidad
// ============================================
function StarField() {
  const starsRef = useRef<THREE.Points>(null);
  
  const [positions, colors, sizes] = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      // Colores variados
      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.5) color = WHITE;
      else if (colorChoice < 0.7) color = GOLD;
      else if (colorChoice < 0.85) color = CYAN;
      else color = new THREE.Color('#FF6B6B');
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      siz[i] = 0.5 + Math.random() * 1.5;
    }
    
    return [pos, col, siz];
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.1;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================
// ESCENA PRINCIPAL
// ============================================
function RevolutionaryScene() {
  const { camera } = useThree();

  useEffect(() => {
    // Animación cinematográfica de cámara
    gsap.timeline()
      .fromTo(camera.position,
        { x: 0, y: 8, z: 12 },
        { x: 0, y: 0, z: 6, duration: 3, ease: "power2.out" }
      )
      .to(camera.position, {
        x: 2,
        y: 1,
        z: 5,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }, "+=1");
  }, [camera]);

  return (
    <>
      {/* Iluminación dramática */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color={GOLD} distance={10} />
      <pointLight position={[5, 5, 5]} intensity={1} color={CYAN} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color={RED} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color={WHITE}
      />

      {/* Componentes de la escena */}
      <StarField />
      <EnergyCore />
      <EnergyWaves />
      <KnowledgeDNA />
      <LearningNeurons />
      <WayuuPatterns />
      
      {/* Sparkles ambientales */}
      <Sparkles
        count={300}
        scale={8}
        size={4}
        speed={0.4}
        color={GOLD}
        opacity={0.6}
      />
    </>
  );
}

// ============================================
// COMPONENTE EXPORTADO
// ============================================
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
      {/* Fondo con gradiente profundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000510] via-[#001020] to-[#001a33]" />
      
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <RevolutionaryScene />
      </Canvas>
      
      {/* Overlay con texto */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white drop-shadow-2xl animate-fade-in mb-4">
            El ADN del
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] drop-shadow-2xl animate-fade-in-delay">
            Conocimiento
          </h2>
          <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-delay-2">
            Donde la sabiduría ancestral se fusiona con el aprendizaje moderno
          </p>
        </div>
      </div>

      {/* Efecto de viñeta */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,5,16,0.6)_100%)]" />
      
      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
    </div>
  );
}

// Versión compacta para otras secciones
export function WeavingAnimationCompact() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(135deg, #000510 0%, #001a33 100%)' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color={GOLD} />
        <EnergyCore />
        <Sparkles count={100} scale={4} size={2} speed={0.3} color={GOLD} />
      </Canvas>
    </div>
  );
}
