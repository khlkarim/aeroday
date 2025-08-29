import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import Spinner from "../Spinner";
import { ISS } from "@/components/models/ISS";
import Lighting from "@/components/scenes/Lighting";
import { AnimatedDrone } from "@/components/models/AnimatedDrone";

export default function VidParDrone() {
  return (
    <Canvas
      camera={{
        fov: 45,
        position: [7, 3, 1],
      }}
    >
      <Suspense fallback={null}>
        <Environment preset="park" background />

        <Lighting />
        <AnimatedDrone position={[3, 2, -5]} />

      </Suspense>

      <OrbitControls target={[3, 2, -5]} enableDamping dampingFactor={0.1} />
    </Canvas>
  );
}
