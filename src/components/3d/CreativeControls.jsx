import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CreativeControls({
  speedMultiplier = 1,
  flashlight = false,
  virtualMove = { x: 0, y: 0 },
  virtualElevate = 0,
  onUpdateStats,
  flyMode = true
}) {
  const { camera, gl } = useThree();
  const keys = useRef({});
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const velocity = useRef(new THREE.Vector3());
  const spotlightRef = useRef();

  // Initialize camera euler angles from current camera rotation
  useEffect(() => {
    euler.current.setFromQuaternion(camera.quaternion, "YXZ");
  }, [camera]);

  // Keyboard event listeners
  useEffect(() => {
    function handleKeyDown(e) {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      keys.current[e.code] = true;
    }

    function handleKeyUp(e) {
      keys.current[e.code] = false;
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Pointer / Mouse Look Listeners on canvas element
  useEffect(() => {
    const domElement = gl.domElement;

    function handlePointerDown(e) {
      if (e.button === 0 || e.pointerType === "touch") {
        isDragging.current = true;
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    }

    function handlePointerMove(e) {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.003;
      euler.current.y -= deltaX * sensitivity;
      euler.current.x -= deltaY * sensitivity;

      // Clamp vertical look angle (-85 deg to +85 deg)
      euler.current.x = Math.max(-Math.PI / 2.05, Math.min(Math.PI / 2.05, euler.current.x));

      camera.quaternion.setFromEuler(euler.current);
    }

    function handlePointerUp() {
      isDragging.current = false;
    }

    domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      domElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [gl, camera]);

  // Frame update loop
  useFrame((_, delta) => {
    // Base speed
    const baseSpeed = 4.5 * speedMultiplier;
    const moveVector = new THREE.Vector3();

    // WASD / Arrow keys
    const forward = (keys.current["KeyW"] || keys.current["ArrowUp"] ? 1 : 0) -
                    (keys.current["KeyS"] || keys.current["ArrowDown"] ? 1 : 0) +
                    virtualMove.y;

    const strafe = (keys.current["KeyD"] || keys.current["ArrowRight"] ? 1 : 0) -
                   (keys.current["KeyA"] || keys.current["ArrowLeft"] ? 1 : 0) +
                   virtualMove.x;

    const elevate = (keys.current["Space"] || keys.current["KeyE"] ? 1 : 0) -
                    (keys.current["ShiftLeft"] || keys.current["ShiftRight"] || keys.current["KeyQ"] ? 1 : 0) +
                    virtualElevate;

    // Movement relative to camera heading
    if (forward !== 0 || strafe !== 0 || elevate !== 0) {
      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);
      
      const horizontalForward = new THREE.Vector3(cameraDir.x, 0, cameraDir.z).normalize();
      const horizontalRight = new THREE.Vector3(-cameraDir.z, 0, cameraDir.x).normalize();

      if (flyMode) {
        moveVector.addScaledVector(cameraDir, forward);
        moveVector.addScaledVector(horizontalRight, strafe);
        moveVector.y += elevate;
      } else {
        moveVector.addScaledVector(horizontalForward, forward);
        moveVector.addScaledVector(horizontalRight, strafe);
        moveVector.y += elevate;
      }

      moveVector.normalize().multiplyScalar(baseSpeed);
    }

    // Smooth inertia damping
    const damping = Math.min(1, delta * 10);
    velocity.current.lerp(moveVector, damping);

    camera.position.addScaledVector(velocity.current, delta);

    // Ground clamp (keep camera at least 0.6m above flat land)
    if (camera.position.y < 0.6) {
      camera.position.y = 0.6;
    }

    // Ceiling clamp (60m)
    if (camera.position.y > 60) {
      camera.position.y = 60;
    }

    // Flashlight positioning attached to camera
    if (spotlightRef.current) {
      spotlightRef.current.position.copy(camera.position);
      const targetPos = new THREE.Vector3();
      camera.getWorldDirection(targetPos);
      targetPos.multiplyScalar(10).add(camera.position);
      spotlightRef.current.target.position.copy(targetPos);
      spotlightRef.current.target.updateMatrixWorld();
    }

    // Report stats for HUD
    if (onUpdateStats) {
      const headingRad = euler.current.y % (Math.PI * 2);
      const headingDeg = (headingRad * (180 / Math.PI) + 360) % 360;
      
      let compass = "N";
      if (headingDeg >= 337.5 || headingDeg < 22.5) compass = "N";
      else if (headingDeg >= 22.5 && headingDeg < 67.5) compass = "NE";
      else if (headingDeg >= 67.5 && headingDeg < 112.5) compass = "E";
      else if (headingDeg >= 112.5 && headingDeg < 157.5) compass = "SE";
      else if (headingDeg >= 157.5 && headingDeg < 202.5) compass = "S";
      else if (headingDeg >= 202.5 && headingDeg < 247.5) compass = "SW";
      else if (headingDeg >= 247.5 && headingDeg < 292.5) compass = "W";
      else if (headingDeg >= 292.5 && headingDeg < 337.5) compass = "NW";

      onUpdateStats({
        x: camera.position.x.toFixed(1),
        y: camera.position.y.toFixed(1),
        z: camera.position.z.toFixed(1),
        headingDeg: Math.round(headingDeg),
        compass
      });
    }
  });

  return (
    <>
      {flashlight && (
        <group>
          <spotLight
            ref={spotlightRef}
            color="#ffffff"
            intensity={4.5}
            distance={30}
            angle={Math.PI / 4}
            penumbra={0.4}
            decay={1.5}
          />
        </group>
      )}
    </>
  );
}
