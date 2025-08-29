import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import Spinner from "../Spinner";
import { ISS } from "@/components/models/ISS";
import Lighting from "@/components/scenes/Lighting";

export default function ExpAerospatiales() {
  return (
    <Canvas
      camera={{
        fov: 45,
        position: [-50, 10, 0],
      }}
    >
      <Suspense fallback={null}>
        <Environment 
            files={"/assets/environments/space.hdr"}
            background
        />

        <Lighting />
        <ISS rotation={[0, 0, 0.7]} />

      </Suspense>

      <OrbitControls enableDamping dampingFactor={0.1} />
    </Canvas>
  );
}
