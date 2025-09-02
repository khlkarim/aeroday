import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Lighting from "@/components/scenes/Lighting";
import { PerformanceMonitor } from '@react-three/drei';
import { OrbitControls, Environment } from "@react-three/drei";
import { AnimatedDrone } from "@/components/models/AnimatedDrone";

export default function AeroChallenge() {
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
                <AnimatedDrone position={[3, 2, -5]} />
            </Suspense>
            <OrbitControls 
                autoRotate
                enableDamping 
                rotateSpeed={0.02}
                target={[3, 2, -5]} 
                dampingFactor={0.1} 
            />
        </Canvas>
    );
}