import React, { useRef } from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Model as Plane } from './Plane'

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/EarthAndMoon.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes['Node-Mesh'] as THREE.Mesh).geometry} material={materials.mat15} />
      <mesh geometry={(nodes['Node-Mesh_1'] as THREE.Mesh).geometry} material={materials.mat4} />
      <mesh geometry={(nodes['Node-Mesh_2'] as THREE.Mesh).geometry} material={materials.mat9} />
    </group>
  )
}

export default function EarthAndMoon() {
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

      {/* Key directional light with shadows */}
      <directionalLight
        position={[8, 12, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />

      {/* Fill light to soften shadows */}
      <directionalLight
        position={[-8, 5, -10]}
        intensity={0.4}
        color="#b0c4de"
      />

      {/* Rim light for highlights */}
      <directionalLight
        position={[0, 10, -10]}
        intensity={0.6}
        color="#fffbe6"
      />

      <Model position={[0, 0, 0]} scale={10} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/EarthAndMoon.glb')
