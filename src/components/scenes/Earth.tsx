import React, { useRef } from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Model as Plane } from './Plane'

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/Earth.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Box004_1 as THREE.Mesh).geometry} material={materials['09___Default']} />
      <mesh geometry={(nodes.Box004_1_1 as THREE.Mesh).geometry} material={materials['08___Default']} />
      <mesh geometry={(nodes.GeoSphere002_1 as THREE.Mesh).geometry} material={materials['07___Default']} />
      <mesh geometry={(nodes.GeoSphere002_1_1 as THREE.Mesh).geometry} material={materials['03___Default']} />
      <mesh geometry={(nodes.GeoSphere002_1_2 as THREE.Mesh).geometry} material={materials['02___Default']} />
    </group>
  )
}

export default function Earth() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [-5, 3, -7],
        zoom: 40
      }}
    >
      {/* Soft ambient light for base illumination */}
      <ambientLight intensity={0.7} />

      <Model position={[0, 0, 0]} scale={0.01} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/Earth.glb')
