import React, { useRef } from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { Stars, useGLTF } from '@react-three/drei'
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
  const { nodes, materials } = useGLTF('/assets/models/LowPolyEarth-transformed.glb')
  return (
    <group {...props} dispose={null}>
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
      <directionalLight position={[-30, 5, -30]} intensity={1} />
      <Earth position={[0, 0, 0]} scale={2.5} />
      <OrbitingISS />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/ISS.glb')
useGLTF.preload('/assets/models/LowPolyEarth-transformed.glb')
