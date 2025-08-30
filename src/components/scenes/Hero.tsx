import React, { Suspense } from 'react'
import { Plane } from '@/components/models/Plane'
import { Canvas } from "@react-three/fiber"
import Lighting from '@/components/scenes/Lighting'
import { PerformanceMonitor, OrbitControls } from '@react-three/drei'

export default function Scene() {
    return (
        <Canvas
            camera={{ 
                fov: 45, 
                position: [-5, 10, -14] 
            }}
        >
            <PerformanceMonitor />

            <Suspense fallback={null}>
                <Plane />
                <Lighting />
                <OrbitControls 
                    enableDamping 
                    enableZoom={false} 
                    dampingFactor={0.1} 
                />
            </Suspense>
        </Canvas>
    )
}

