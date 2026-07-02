import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function ArchitecturalStructure() {
  const groupRef = useRef();

  // Create subtle architectural massing elements & grid volumes
  const elements = useMemo(() => {
    const arr = [];
    const colors = ["#d4a574", "#e8c9a0", "#b8885a", "#71717a", "#52525b"];
    
    // Core massing blocks
    for (let i = 0; i < 16; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 7;
      const z = (Math.random() - 0.5) * 6 - 2;
      const scaleX = 0.4 + Math.random() * 0.9;
      const scaleY = 0.2 + Math.random() * 1.4;
      const scaleZ = 0.4 + Math.random() * 0.9;
      
      arr.push({
        position: [x, y, z],
        scale: [scaleX, scaleY, scaleZ],
        rotation: [(Math.random() - 0.5) * 0.4, Math.random() * Math.PI, (Math.random() - 0.5) * 0.4],
        color: colors[i % colors.length],
        wireframe: i % 2 === 0,
        speed: 0.1 + Math.random() * 0.2
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    groupRef.current.rotation.y = pointer.x * 0.25;
    groupRef.current.rotation.x = -pointer.y * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Central Architectural Truss Pavilion Form */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 0, -1]}>
          <octahedronGeometry args={[2.2, 0]} />
          <meshStandardMaterial 
            color="#d4a574" 
            wireframe 
            transparent 
            opacity={0.35} 
          />
        </mesh>
        <mesh position={[0, 0, -1]} rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[2.8, 1.6, 2.8]} />
          <meshStandardMaterial 
            color="#e8c9a0" 
            wireframe 
            transparent 
            opacity={0.2} 
          />
        </mesh>
      </Float>

      {/* Floating volumetric massings */}
      {elements.map((el, idx) => (
        <Float key={idx} speed={el.speed * 2} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh 
            position={el.position} 
            rotation={el.rotation} 
            scale={el.scale}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={el.color} 
              wireframe={el.wireframe} 
              transparent 
              opacity={el.wireframe ? 0.25 : 0.08}
              roughness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="three-bg">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 8, 4]} intensity={2.5} color="#d4a574" />
        <pointLight position={[-6, -4, -4]} intensity={1.2} color="#60a5fa" />
        <ArchitecturalStructure />
      </Canvas>
    </div>
  );
}
