import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Drone } from "@/components/models/Drone";
import Lighting from "@/components/scenes/Lighting";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";

export default function Teaser() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [-2, 6, 5],
            }}
        >
            <PerformanceMonitor />

            <Suspense fallback={null}>
                <Lighting />
                <Drone scale={2} position={[0, 0.5, 0]} />
            </Suspense>
            <OrbitControls 
                enableDamping 
                enableZoom={false}
                dampingFactor={0.1} 
                target={[-2, 0, -2]} 
            />
        </Canvas>
    );
}