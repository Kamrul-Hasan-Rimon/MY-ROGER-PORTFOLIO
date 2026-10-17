"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function OrbitalCore() {
  const core = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x += delta * 0.08;
      core.current.rotation.x = THREE.MathUtils.damp(core.current.rotation.x, pointer.current.y * 0.13, 2, delta);
      core.current.rotation.y = THREE.MathUtils.damp(core.current.rotation.y, core.current.rotation.y + pointer.current.x * 0.001, 1, delta);
    }
    if (wire.current) { wire.current.rotation.y -= delta * 0.055; wire.current.rotation.z += delta * 0.035; }
    if (ringA.current) ringA.current.rotation.z += delta * 0.045;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.035;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, pointer.current.x * 0.12, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, pointer.current.y * 0.08, 2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group onPointerMove={(event) => { pointer.current.x = event.pointer.x; pointer.current.y = event.pointer.y; }} onPointerLeave={() => { pointer.current.x = 0; pointer.current.y = 0; }}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.15}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.02, 5]} />
          <MeshDistortMaterial color="#101b36" emissive="#2d1b68" emissiveIntensity={0.72} roughness={0.22} metalness={0.8} distort={0.19} speed={1.05} />
        </mesh>
        <mesh ref={wire} scale={1.08}>
          <icosahedronGeometry args={[1.02, 2]} />
          <meshBasicMaterial color="#48e5ff" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
      <mesh ref={ringA} rotation={[1.12, 0.22, 0.42]}>
        <torusGeometry args={[1.52, 0.008, 8, 180]} />
        <meshBasicMaterial color="#48e5ff" transparent opacity={0.76} />
      </mesh>
      <mesh ref={ringB} rotation={[0.38, 1.18, -0.62]}>
        <torusGeometry args={[1.77, 0.005, 8, 180]} />
        <meshBasicMaterial color="#8566ff" transparent opacity={0.66} />
      </mesh>
      <mesh rotation={[0.92, -0.42, 0.15]}>
        <torusGeometry args={[1.27, 0.003, 6, 150]} />
        <meshBasicMaterial color="#e6f7ff" transparent opacity={0.25} />
      </mesh>
      {[
        { p: [1.55, 0.42, 0.15] as [number, number, number], c: "#48e5ff", s: 0.055 },
        { p: [-0.15, 1.76, 0.1] as [number, number, number], c: "#8566ff", s: 0.045 },
        { p: [-1.42, -0.7, 0.18] as [number, number, number], c: "#48e5ff", s: 0.04 },
        { p: [0.3, -1.56, -0.12] as [number, number, number], c: "#b7a7ff", s: 0.035 },
      ].map((node, i) => <mesh key={i} position={node.p}><sphereGeometry args={[node.s, 16, 16]} /><meshBasicMaterial color={node.c} /></mesh>)}
      <pointLight position={[2.5, 2, 3]} color="#48e5ff" intensity={22} distance={8} />
      <pointLight position={[-2.5, -1.5, -1]} color="#704cff" intensity={18} distance={7} />
    </group>
  );
}

function StarField() {
  const positions = useMemo(() => {
    const a = new Float32Array(240 * 3);
    for (let i = 0; i < a.length; i += 3) {
      a[i] = (Math.random() - 0.5) * 8;
      a[i + 1] = (Math.random() - 0.5) * 5.5;
      a[i + 2] = (Math.random() - 0.5) * 4 - 1.5;
    }
    return a;
  }, []);
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} itemSize={3} /></bufferGeometry><pointsMaterial size={0.016} color="#9db7e9" transparent opacity={0.52} sizeAttenuation /></points>;
}

export function HeroScene() {
  return (
    <div className="hero-scene-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.1], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 4, 4]} color="#eefaff" intensity={1.7} />
        <StarField />
        <OrbitalCore />
      </Canvas>
    </div>
  );
}
