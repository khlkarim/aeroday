import React, { useRef } from 'react'
import * as THREE from 'three'
import type { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

// --- Air streaks component ---
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
      // Reset streak behind the plane
      if (s.z > 5) s.z = -20

      // Fade in/out based on distance
      if (s.z < -18) s.opacity = 0  // far behind plane
      else if (s.z < -15) s.opacity = (s.z + 18) / 3  // fade in
      else if (s.z < 3) s.opacity = 1  // fully visible
      else s.opacity = Math.max(0, 1 - (s.z - 3) / 2)  // fade out

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

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('assets/models/Plane.glb')
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

export default function Plane() {
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

      <Model position={[0, 0, 0]} scale={0.7} />
      <AirStreaks count={5} speed={0.3} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload('assets/models/Plane.glb')
