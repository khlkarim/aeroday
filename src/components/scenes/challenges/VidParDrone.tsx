import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Lighting from "@/components/scenes/Lighting";
import { AnimatedDrone } from "@/components/models/AnimatedDrone";
import { PerformanceMonitor, Loader } from '@react-three/drei'


export default function VidParDrone() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [7, 3, 1],
            }}
        >
            <PerformanceMonitor />
            <Loader />

            <Suspense fallback={null}>
                <Environment
                    files={"/assets/environments/day.hdr"}
                    background
                    blur={0.05}
                />
                <Lighting />
                <AnimatedDrone position={[3, 2, -5]} />
            </Suspense>
            <OrbitControls 
                enableDamping 
                target={[3, 2, -5]} 
                dampingFactor={0.1} 
                autoRotate
                rotateSpeed={0.02}
            />
        </Canvas>
    );
}