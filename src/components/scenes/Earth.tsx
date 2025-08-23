import * as THREE from 'three'
import type { JSX } from 'react'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"

export function ISS(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/assets/models/ISS.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={(nodes.InternationalSpaceStation_mesh as THREE.Mesh).geometry}
                material={materials.InternationalSpaceStation_mat}
            />
        </group>
    )
}

export function Earth(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/assets/models/LowPolyEarth-transformed.glb')
    const earthRef = useRef<THREE.Group>(null!)

    useFrame((_, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.05 
        }
    })

    return (
        <group ref={earthRef} {...props} dispose={null}>
            <mesh
                position={[0, 0, 0]}
                rotation={[Math.PI, 0, Math.PI]}
                geometry={(nodes.Object_Planet_0 as THREE.Mesh).geometry}
                material={new THREE.MeshLambertMaterial({ map: (materials.Planet as THREE.MeshLambertMaterial).map })}
            />
        </group>
    )
}


function OrbitingISS() {
    const pivot = useRef<THREE.Group>(null!)

    useFrame((_, delta) => {
        if (pivot.current) {
            pivot.current.rotation.y += delta * 0.2
        }
    })

    return (
        <group ref={pivot}>
            <ISS position={[3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.05} />
        </group>
    )
}

export interface SceneProps {
    variant?: 'desktop' | 'mobile';
}

export default function Scene({ variant = 'desktop' }: SceneProps) {
    return (
        <Canvas
            orthographic
            camera={{
                zoom: 40,
                position: [-5, 3, -7],
            }}
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[-30, 5, -30]} intensity={1.5} />
            <Earth position={[0, 0, 0]} scale={2.5} />
            <OrbitingISS />
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

useGLTF.preload('/assets/models/ISS.glb')
useGLTF.preload('/assets/models/LowPolyEarth-transformed.glb')
