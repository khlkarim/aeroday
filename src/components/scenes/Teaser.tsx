import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import Lighting from "@/components/scenes/Lighting";
import { Drone } from "@/components/models/Drone";

export default function Teaser() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [-2, 6, 5],
            }}
        >
            <PerformanceMonitor />
            <Loader />

            <Suspense fallback={null}>
                <Lighting />
                <Drone scale={2} position={[0, 0.5, 0]} />
            </Suspense>
            <OrbitControls 
                enableDamping 
                target={[-2, 0, -2]} 
                dampingFactor={0.1} 
            />
        </Canvas>
    );
}