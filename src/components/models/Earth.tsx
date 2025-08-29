import * as THREE from 'three'
import { useRef, type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

useGLTF.preload('/assets/models/EarthWithBanner.glb')

export function Earth(props: JSX.IntrinsicElements['group']) {
    const earthRef = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF('/assets/models/EarthWithBanner.glb');

    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.05
            earthRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
        }
    })

    return (
        <group
            ref={earthRef}
            {...props}
            dispose={null}
            rotation={[Math.PI * 0.05, Math.PI * 0.6, 0]}
        >
            <mesh
                geometry={(nodes.Text as THREE.Mesh).geometry}
                material={materials['Material.001']}
                position={[0.981, 0.329, 0]}
                rotation={[1.556, 0.209, -1.499]}
                scale={0.3}
            />
            <mesh
                geometry={(nodes.Text001 as THREE.Mesh).geometry}
                material={materials['Material.002']}
                position={[1.021, 0, -0.236]}
                rotation={[1.577, 0.122, -1.624]}
                scale={0.3}
            />
            <mesh
                geometry={(nodes.Text002 as THREE.Mesh).geometry}
                material={materials['Material.003']}
                position={[1.009, -0.323, -0.523]}
                rotation={[1.585, 0.104, -1.711]}
                scale={0.3}
            />
            <mesh
                geometry={(nodes.Object_Planet_0 as THREE.Mesh).geometry}
                material={materials.Planet}
                rotation={[-Math.PI, 0.262, 3.054]}
            />
        </group>
    )
}