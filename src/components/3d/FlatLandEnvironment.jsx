import { useMemo } from "react";
import * as THREE from "three";

function ArchitecturalTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.8, 6]} />
        <meshStandardMaterial color="#8c786a" roughness={0.9} />
      </mesh>
      {/* Foliage - Minimalist Architectural Octahedron / Cone */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.45, 1.2, 6]} />
        <meshStandardMaterial color="#7a9e6b" roughness={0.7} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.35, 0.9, 6]} />
        <meshStandardMaterial color="#9bb88e" roughness={0.7} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function FlatLandEnvironment({ 
  showGrid = true, 
  showTrees = true, 
  groundColor = "#f5f0e8",
  gridColor = "#d4a574"
}) {
  // Generate random tree positions around perimeter (not overlapping center site)
  const trees = useMemo(() => {
    const arr = [];
    const minRadius = 5.5;
    const maxRadius = 16;
    const count = 18;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.7 + Math.random() * 0.5;
      arr.push({ position: [x, 0, z], scale });
    }
    return arr;
  }, []);

  return (
    <group name="FlatLandLandscape">
      {/* Main Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial 
          color={groundColor} 
          roughness={0.95} 
          metalness={0.02}
        />
      </mesh>

      {/* Central Architectural Site Platform / Paved Terrace */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5.2, 0.04, 48]} />
        <meshStandardMaterial 
          color="#ebe4d8" 
          roughness={0.85} 
        />
      </mesh>

      {/* Site Boundary Ring / Scale Contours */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[4.95, 5.05, 64]} />
        <meshBasicMaterial color={gridColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[9.95, 10.05, 64]} />
        <meshBasicMaterial color={gridColor} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[15.95, 16.05, 64]} />
        <meshBasicMaterial color={gridColor} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Architectural Grid Helper */}
      {showGrid && (
        <gridHelper 
          args={[40, 40, gridColor, "#dcd4c8"]} 
          position={[0, 0.02, 0]} 
        />
      )}

      {/* Perimeter Minimalist Trees */}
      {showTrees && trees.map((t, idx) => (
        <ArchitecturalTree key={idx} position={t.position} scale={t.scale} />
      ))}

      {/* Cardinal Direction Compass Markers on Ground */}
      <group position={[0, 0.03, 0]}>
        {/* North */}
        <mesh position={[0, 0, -5.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.15, 0.4, 3]} />
          <meshBasicMaterial color="#c86a45" />
        </mesh>
        {/* East */}
        <mesh position={[5.4, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.12, 0.3, 3]} />
          <meshBasicMaterial color="#a1a1aa" />
        </mesh>
        {/* South */}
        <mesh position={[0, 0, 5.4]} rotation={[-Math.PI / 2, 0, Math.PI]}>
          <coneGeometry args={[0.12, 0.3, 3]} />
          <meshBasicMaterial color="#a1a1aa" />
        </mesh>
        {/* West */}
        <mesh position={[-5.4, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <coneGeometry args={[0.12, 0.3, 3]} />
          <meshBasicMaterial color="#a1a1aa" />
        </mesh>
      </group>
    </group>
  );
}
