import React, { useRef, Suspense } from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { CameraControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"

function AirStreaks({ count = 50, speed = 0.2 }) {
    const groupRef = useRef<THREE.Group>(null!)

    const streaks = useRef(
        Array.from({ length: count }, () => ({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 4,
            z: Math.random() * -20,
            length: 0.5 + Math.random() * 1.5,
            opacity: 0
        }))
    )

    useFrame(() => {
        if (!groupRef.current) return

        streaks.current.forEach((s, i) => {
            s.z += speed
            if (s.z > 5) s.z = -20

            if (s.z < -18) s.opacity = 0 
            else if (s.z < -15) s.opacity = (s.z + 18) / 3 
            else if (s.z < 3) s.opacity = 1 
            else s.opacity = Math.max(0, 1 - (s.z - 3) / 2) 

            const mesh = groupRef.current!.children[i] as THREE.Mesh
            mesh.position.set(s.x, s.y, s.z)
            ;(mesh.material as THREE.MeshBasicMaterial).opacity = s.opacity * 0.5
        })
    })

    return (
        <group ref={groupRef}>
            {streaks.current.map((s, i) => (
                <mesh key={i} position={[s.x, s.y, s.z]}>
                    <boxGeometry args={[0.05, 0.05, s.length]} />
                    <meshBasicMaterial color="white" transparent opacity={s.opacity} />
                </mesh>
            ))}
        </group>
    )
}

export function Plane(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/assets/models/Plane.glb')
    const propellerRef = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {
        if (propellerRef.current) {
            propellerRef.current.rotation.z += delta * 20
        }
    })

    return (
        <group {...props} dispose={null}>
            <mesh geometry={(nodes['Fuselage_Cube003-Mesh'] as THREE.Mesh).geometry} material={materials.White} />
            <mesh geometry={(nodes['Fuselage_Cube003-Mesh_1'] as THREE.Mesh).geometry} material={materials.Red} />
            <mesh geometry={(nodes['Fuselage_Cube003-Mesh_2'] as THREE.Mesh).geometry} material={materials.Gray} />
            <mesh geometry={(nodes['Fuselage_Cube003-Mesh_3'] as THREE.Mesh).geometry} material={materials.Black} />
            <mesh ref={propellerRef} geometry={(nodes['Propeller_Cone-Mesh'] as THREE.Mesh).geometry} material={materials.Black} />
            <mesh geometry={(nodes['Propeller_Cone-Mesh_1'] as THREE.Mesh).geometry} material={materials.Gray} />
        </group>
    )
}

export interface SceneProps {
    variant?: 'desktop' | 'mobile';
}

export default function Scene({ variant = 'desktop' }: SceneProps) {
  return (
     <Canvas
        shadows
        camera={{
            fov: 45,
            position: [-8, 10, -12],
        }}
    >
      <Suspense fallback={null}>
        <CameraControls smoothTime={1.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, -10]} intensity={1} />

        {/* Scene elements */}
        <Plane position={[0, 0, 0]} scale={variant === 'desktop' ? 1 : 0.5} />
        <AirStreaks count={7} speed={0.3} />

      </Suspense>
    </Canvas>
  )
}


useGLTF.preload('assets/models/Plane.glb')
