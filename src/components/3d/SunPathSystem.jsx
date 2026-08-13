import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Calculate solar position based on time of day (0 to 24 hours)
export function getSolarCoordinates(timeOfDay, radius = 22) {
  // Normalize time: 6:00 = sunrise (East, Azimuth 90°), 12:00 = noon (South, Azimuth 180°), 18:00 = sunset (West, Azimuth 270°)
  const isDay = timeOfDay >= 5.5 && timeOfDay <= 18.5;
  
  let altitudeDeg = 0;
  let azimuthDeg = 0;

  if (isDay) {
    // Altitude: 0 deg at 6:00, max ~70 deg at 12:00, 0 deg at 18:00
    const dayProgress = (timeOfDay - 5.5) / 13.0; // 0 to 1
    altitudeDeg = Math.sin(dayProgress * Math.PI) * 72;
    // Azimuth: East (90 deg) to South (180 deg) to West (270 deg)
    azimuthDeg = 90 + dayProgress * 180;
  } else {
    // Night altitude below horizon or moon
    const nightProgress = timeOfDay > 18.5 ? (timeOfDay - 18.5) / 11.0 : (timeOfDay + 5.5) / 11.0;
    altitudeDeg = Math.sin(nightProgress * Math.PI) * 55;
    azimuthDeg = 270 + nightProgress * 180;
  }

  const altRad = THREE.MathUtils.degToRad(altitudeDeg);
  const azRad = THREE.MathUtils.degToRad(azimuthDeg);

  // Convert spherical (altitude, azimuth) to Cartesian coordinates (X, Y, Z)
  // Three.js: +Y is Up, -Z is North, +X is East, +Z is South, -X is West
  const y = Math.max(isDay ? 0.5 : 2.0, radius * Math.sin(altRad));
  const horizontalDist = radius * Math.cos(altRad);
  const x = horizontalDist * Math.sin(azRad - Math.PI); // East-West
  const z = horizontalDist * Math.cos(azRad - Math.PI); // North-South

  return {
    position: [x, y, z],
    altitudeDeg: Math.round(altitudeDeg),
    azimuthDeg: Math.round(azimuthDeg % 360),
    isDay
  };
}

export default function SunPathSystem({
  timeOfDay = 12,
  showSunPathArc = true,
  showSunDisc = true
}) {
  const dirLightRef = useRef();

  const solarData = useMemo(() => getSolarCoordinates(timeOfDay, 24), [timeOfDay]);

  // Generate 3D Sun Path Arc curve (sunrise to sunset arc)
  const arcCurve = useMemo(() => {
    const points = [];
    const steps = 48;
    for (let i = 0; i <= steps; i++) {
      const t = 5.5 + (i / steps) * 13;
      const coord = getSolarCoordinates(t, 24);
      points.push(new THREE.Vector3(...coord.position));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const arcGeometry = useMemo(() => {
    return new THREE.TubeGeometry(arcCurve, 48, 0.08, 6, false);
  }, [arcCurve]);

  // Determine light colors and intensities based on time of day
  const lightSettings = useMemo(() => {
    if (timeOfDay >= 5.5 && timeOfDay < 7.5) {
      // Dawn / Sunrise
      return {
        sunColor: "#fba359",
        sunIntensity: 2.2,
        ambientColor: "#fed7aa",
        ambientIntensity: 0.7,
        skyBg: "#fae8d2",
        type: "dawn"
      };
    } else if (timeOfDay >= 7.5 && timeOfDay < 11.5) {
      // Morning
      return {
        sunColor: "#fef3c7",
        sunIntensity: 2.6,
        ambientColor: "#fde68a",
        ambientIntensity: 0.85,
        skyBg: "#f5f0e8",
        type: "morning"
      };
    } else if (timeOfDay >= 11.5 && timeOfDay < 15.5) {
      // Solar Noon / Early Afternoon
      return {
        sunColor: "#ffffff",
        sunIntensity: 2.8,
        ambientColor: "#fafaf9",
        ambientIntensity: 0.9,
        skyBg: "#f8fafc",
        type: "noon"
      };
    } else if (timeOfDay >= 15.5 && timeOfDay < 18.5) {
      // Golden Hour / Sunset
      return {
        sunColor: "#f97316",
        sunIntensity: 2.4,
        ambientColor: "#fdba74",
        ambientIntensity: 0.75,
        skyBg: "#fee2e2",
        type: "sunset"
      };
    } else if (timeOfDay >= 18.5 && timeOfDay < 20.0) {
      // Twilight / Dusk
      return {
        sunColor: "#818cf8",
        sunIntensity: 1.0,
        ambientColor: "#6366f1",
        ambientIntensity: 0.45,
        skyBg: "#1e1b4b",
        type: "twilight"
      };
    } else {
      // Night / Moon
      return {
        sunColor: "#93c5fd",
        sunIntensity: 0.6,
        ambientColor: "#38bdf8",
        ambientIntensity: 0.3,
        skyBg: "#090d16",
        type: "night"
      };
    }
  }, [timeOfDay]);

  // Keep directional light targeted at center
  useFrame(() => {
    if (dirLightRef.current) {
      dirLightRef.current.target.position.set(0, 0, 0);
      dirLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <group name="SunPathSystem">
      {/* Ambient Lighting */}
      <ambientLight 
        color={lightSettings.ambientColor} 
        intensity={lightSettings.ambientIntensity} 
      />

      {/* Directional Sun / Moon Light */}
      <directionalLight
        ref={dirLightRef}
        position={solarData.position}
        color={lightSettings.sunColor}
        intensity={lightSettings.sunIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
      />

      {/* Secondary Fill Light */}
      <directionalLight
        position={[-solarData.position[0] * 0.4, 6, -solarData.position[2] * 0.4]}
        color={solarData.isDay ? "#d4a574" : "#1e293b"}
        intensity={solarData.isDay ? 0.6 : 0.3}
      />

      {/* Night Uplights for Architectural Model when dark */}
      {!solarData.isDay && (
        <group name="ArchitecturalUplights">
          <pointLight position={[3, 0.4, 3]} intensity={2.5} color="#fbbf24" distance={8} />
          <pointLight position={[-3, 0.4, 3]} intensity={2.5} color="#fbbf24" distance={8} />
          <pointLight position={[0, 0.4, -3]} intensity={2.5} color="#38bdf8" distance={8} />
        </group>
      )}

      {/* 3D Celestial Sun Path Arc */}
      {showSunPathArc && (
        <group>
          {/* Glowing Arc Line */}
          <mesh geometry={arcGeometry}>
            <meshBasicMaterial 
              color="#d4a574" 
              transparent 
              opacity={0.5} 
            />
          </mesh>

          {/* Key Hour Markers along the Arc (6 AM, 9 AM, 12 PM, 3 PM, 6 PM) */}
          {[6, 9, 12, 15, 18].map((h) => {
            const coord = getSolarCoordinates(h, 24);
            return (
              <group key={h} position={coord.position}>
                <mesh>
                  <sphereGeometry args={[0.25, 12, 12]} />
                  <meshBasicMaterial color="#b8885a" />
                </mesh>
              </group>
            );
          })}
        </group>
      )}

      {/* Sun Disc / Sphere with Corona Halo */}
      {showSunDisc && (
        <group position={solarData.position}>
          <mesh>
            <sphereGeometry args={[solarData.isDay ? 0.9 : 0.6, 24, 24]} />
            <meshBasicMaterial 
              color={solarData.isDay ? "#ffedd5" : "#e0f2fe"} 
            />
          </mesh>
          {/* Outer Solar Glow */}
          <mesh>
            <sphereGeometry args={[solarData.isDay ? 1.5 : 0.9, 16, 16]} />
            <meshBasicMaterial 
              color={lightSettings.sunColor} 
              transparent 
              opacity={0.35} 
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
