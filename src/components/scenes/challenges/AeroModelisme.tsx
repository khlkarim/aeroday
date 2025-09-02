import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Lighting from "@/components/scenes/Lighting";
import { PerformanceMonitor } from '@react-three/drei';
import { OrbitControls, Environment } from "@react-three/drei";
import { AnimatedGlider } from "@/components/models/AnimatedGlider";

export default function AeroModelisme() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [7, 3, 1],
            }}
        >
            <PerformanceMonitor />

            <Suspense fallback={null}>
                <Environment
                    background
                    blur={0.05}
                    files={"/assets/environments/day.exr"}
                />
                <Lighting />
                <AnimatedGlider />
            </Suspense>
            <OrbitControls autoRotate />
        </Canvas>
    );
}