import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { ISS } from '@/components/models/ISS'
import { Earth } from '@/components/models/Earth'
import Lighting from '@/components/scenes/Lighting'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor, OrbitControls } from '@react-three/drei'

function OrbitingISS() {
    const pivot = useRef<THREE.Group>(null!)

    useFrame((state, delta) => {
        if (pivot.current) {
            pivot.current.rotation.y += delta * 0.2
            const t = state.clock.elapsedTime * 0.3
            pivot.current.position.x = Math.sin(t) * 0.5
            pivot.current.position.z = Math.cos(t) * 0.5
        }
    })

    return (
        <group ref={pivot}>
            <ISS position={[5.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.05} />
        </group>
    )
}

export default function Scene() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [-8, 5, -12],
            }}
        >
            <PerformanceMonitor />

            <Suspense fallback={null}>
                <Lighting />
                <OrbitingISS />
                <Earth scale={4} />
            </Suspense>

            <OrbitControls
                enableDamping
                enableZoom={false}
                dampingFactor={0.1}
            />
        </Canvas>
    )
}