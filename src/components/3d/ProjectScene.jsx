import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Html } from "@react-three/drei";

function Model({ url, scale = 1, autoRotate = true, wireframe = false }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  useFrame((state, delta) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={group}>
      <Center>
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
        <div className="loading-text">Loading 3D CAD...</div>
      </div>
    </Html>
  );
}

export default function ProjectScene({ 
  modelUrl = "/models/12.glb", 
  scale = 1, 
  autoRotate = true,
  interactive = false,
  lightPreset = "studio",
  wireframe = false
}) {
  return (
    <Canvas
      camera={{ position: [3.5, 2.5, 4.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={lightPreset === "night" ? 0.2 : lightPreset === "sunset" ? 0.6 : 0.8} />
      
      {lightPreset === "sunset" ? (
        <>
          <directionalLight position={[5, 8, 3]} intensity={2.5} color="#f59e0b" />
          <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#6366f1" />
        </>
      ) : lightPreset === "night" ? (
        <>
          <pointLight position={[0, 4, 0]} intensity={2} color="#60a5fa" distance={10} />
          <directionalLight position={[-3, 4, 3]} intensity={0.5} color="#38bdf8" />
        </>
      ) : (
        <>
          <directionalLight position={[6, 8, 6]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-6, -4, -6]} intensity={0.6} color="#d4a574" />
          <directionalLight position={[0, 10, 0]} intensity={1.0} color="#e8c9a0" />
        </>
      )}

      <Suspense fallback={<Loader />}>
        <Model 
          url={modelUrl} 
          scale={scale} 
          autoRotate={autoRotate}
          wireframe={wireframe}
        />
      </Suspense>

      {interactive && (
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minDistance={1.5}
          maxDistance={12}
        />
      )}
    </Canvas>
  );
}
