import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Earth } from '@/components/models/Earth'
import Lighting from '@/components/scenes/Lighting'
import { PerformanceMonitor, OrbitControls } from '@react-three/drei'

export default function Scene() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [-3, 1, -2],
            }}
        >
            <PerformanceMonitor />

            <Suspense fallback={null}>
                <Lighting />
                <Earth scale={1} />
            </Suspense>

            <OrbitControls
                enableDamping
                enableZoom={false}
                dampingFactor={0.1}
            />
        </Canvas>
    )
}