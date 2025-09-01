import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import Lighting from '@/components/scenes/Lighting'
import { 
    PerformanceMonitor, OrbitControls, GizmoHelper, 
    GizmoViewport, Sky 
} from '@react-three/drei'
import { Boing } from '@/components/models/Bell_boeing_v22_osprey'

export default function CAO() {
    return (
        <Canvas
            camera={{ 
                fov: 45, 
                position: [-12, 12, 14] 
            }}
        >
            <PerformanceMonitor />

            <Suspense fallback={null}>
                <Boing position={[0, 3, 0]} />
                <Lighting />

                {/* Simple skybox */}
                <Sky 
                    sunPosition={[100, 20, 100]} 
                    turbidity={8} 
                    rayleigh={6} 
                    mieCoefficient={0.005} 
                    mieDirectionalG={0.8} 
                />

                {/* CAD-like orbit navigation */}
                <OrbitControls 
                    enableDamping 
                    dampingFactor={0.1} 
                />

                {/* Coordinate system widget */}
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
                </GizmoHelper>

                {/* Coordinate grid */}
                <gridHelper args={[50, 50, 'red', 'gray']} />
            </Suspense>
        </Canvas>
    )
}
