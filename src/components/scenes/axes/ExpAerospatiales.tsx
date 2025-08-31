import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ISS } from "@/components/models/ISS";
import Lighting from "@/components/scenes/Lighting";
import { OrbitControls, Environment, PerformanceMonitor, Loader } from "@react-three/drei";

export default function ExpAerospatiales() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [-50, 15, 0],
            }}
        >
            <PerformanceMonitor />
            <Loader />

            <Suspense fallback={null}>
                <Environment 
                    background
                    blur={0.05} 
                    files={"/assets/environments/space.hdr"}
                />

                <Lighting />
                <ISS rotation={[0, 0, 0.7]} />
            </Suspense>

            <OrbitControls 
                autoRotate 
                enableDamping 
                rotateSpeed={0.03} 
                dampingFactor={0.1}
            />
        </Canvas>
    );
}
