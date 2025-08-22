import React, { useRef } from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

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
  const { nodes, materials } = useGLTF('/assets/models/LowPolyEarth.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Object_Planet_0 as THREE.Mesh).geometry}
        material={materials.Planet}
        position={[0, 0, 0]}
        rotation={[Math.PI, 0, Math.PI]}
      />
    </group>
  )
}

function OrbitingISS() {
  const pivot = useRef<THREE.Group>(null!)

  // Animate rotation of the pivot
  useFrame((_, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y += delta * 0.2 // speed of orbit
    }
  })

  return (
    <group ref={pivot}>
      {/* Place ISS at some distance along X axis so orbit is visible */}
      <ISS position={[3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.05} />
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [-5, 3, -7],
        zoom: 40,
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 12, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-8, 5, -10]} intensity={0.4} color="#b0c4de" />
      <directionalLight position={[0, 10, -10]} intensity={0.6} color="#fffbe6" />

      {/* Earth at center */}
      <Earth position={[0, 0, 0]} scale={2.5} />

      {/* ISS orbiting */}
      <OrbitingISS />

      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/ISS.glb')
useGLTF.preload('/assets/models/LowPolyEarth.glb')
