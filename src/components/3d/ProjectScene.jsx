import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Html } from "@react-three/drei";
import * as THREE from "three";

import CreativeControls from "./CreativeControls";
import FlatLandEnvironment from "./FlatLandEnvironment";
import SunPathSystem from "./SunPathSystem";

function Model({ url, scale = 1, autoRotate = false, castShadow = true }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  // Enable shadows on all child meshes
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.max(0.3, child.material.roughness || 0.5);
          child.material.side = THREE.DoubleSide;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={group}>
      <Center bottom>
        <primitive 
          object={scene.clone(true)} 
          scale={scale} 
        />
      </Center>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="loading-3d">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading Architectural CAD...</div>
      </div>
    </Html>
  );
}

export default function ProjectScene({ 
  modelUrl = "/models/12.glb", 
  scale = 1, 
  autoRotate = false,
  interactive = false,
  traversalMode = "orbit", // 'orbit' | 'creative'
  timeOfDay = 13.5, // 0 to 24
  showSunPath = true,
  showFlatLand = true,
  flashlight = false,
  speedMultiplier = 1,
  virtualMove = { x: 0, y: 0 },
  virtualElevate = 0,
  onUpdateStats,
  lightPreset = "sunpath", // 'sunpath' | 'studio' | 'sunset' | 'night'
  cameraPosition = [4.5, 3.2, 5.5],
  groundColor = "#f5f0e8",
  gridColor = "#d4a574"
}) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 48, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      shadows
      gl={{ 
        antialias: true, 
        alpha: true, 
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05
      }}
    >
      {/* Flat Land Simulated Landscape */}
      {showFlatLand && (
        <FlatLandEnvironment 
          showGrid={true} 
          showTrees={true} 
          groundColor={groundColor}
          gridColor={gridColor}
        />
      )}

      {/* Lighting: Sun Path or Fixed Preset */}
      {lightPreset === "sunpath" || !["studio", "sunset", "night"].includes(lightPreset) ? (
        <SunPathSystem 
          timeOfDay={timeOfDay} 
          showSunPathArc={showSunPath}
          showSunDisc={showSunPath}
        />
      ) : lightPreset === "sunset" ? (
        <>
          <ambientLight intensity={0.6} color="#fed7aa" />
          <directionalLight position={[7, 4, 5]} intensity={2.5} color="#f97316" castShadow />
          <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#6366f1" />
        </>
      ) : lightPreset === "night" ? (
        <>
          <ambientLight intensity={0.25} color="#38bdf8" />
          <pointLight position={[0, 4, 0]} intensity={3} color="#60a5fa" distance={12} />
          <directionalLight position={[-4, 5, 4]} intensity={0.6} color="#93c5fd" />
          <pointLight position={[3, 0.4, 3]} intensity={2.5} color="#fbbf24" distance={8} />
          <pointLight position={[-3, 0.4, -3]} intensity={2.5} color="#fbbf24" distance={8} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.85} color="#fafaf9" />
          <directionalLight position={[6, 8, 6]} intensity={2.4} color="#ffffff" castShadow />
          <directionalLight position={[-6, -4, -6]} intensity={0.6} color="#d4a574" />
          <directionalLight position={[0, 10, 0]} intensity={1.0} color="#e8c9a0" />
        </>
      )}

      {/* 3D CAD Architectural Model */}
      <Suspense fallback={<Loader />}>
        <Model 
          url={modelUrl} 
          scale={scale} 
          autoRotate={autoRotate}
        />
      </Suspense>

      {/* Camera Controls Mode */}
      {interactive && traversalMode === "orbit" && (
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.02} // Stop right at ground level
          minDistance={1.2}
          maxDistance={35}
          target={[0, 0.8, 0]}
        />
      )}

      {interactive && traversalMode === "creative" && (
        <CreativeControls
          speedMultiplier={speedMultiplier}
          flashlight={flashlight}
          virtualMove={virtualMove}
          virtualElevate={virtualElevate}
          onUpdateStats={onUpdateStats}
          flyMode={true}
        />
      )}
    </Canvas>
  );
}
