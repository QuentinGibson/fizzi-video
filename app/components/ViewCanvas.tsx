"use client"

import { Canvas } from "@react-three/fiber"
import { SodaCan } from "./SodaCan";

// type Props = {}

export default function ViewCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true}}
      camera={{ fov: 100 }}
    >
      <SodaCan />
      <spotLight intensity={4} position={[1, 1, 1]} />
    </Canvas>
  );
}