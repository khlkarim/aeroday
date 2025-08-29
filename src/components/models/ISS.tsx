import React from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { useGLTF } from '@react-three/drei'

useGLTF.preload('/assets/models/ISS.glb')

export function ISS(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/assets/models/ISS.glb');

    return (
        <group {...props} dispose={null}>
            <mesh
                material={materials.InternationalSpaceStation_mat}
                geometry={(nodes.InternationalSpaceStation_mesh as THREE.Mesh).geometry}
            />
        </group>
    )
}
