import * as THREE from 'three'
import type { JSX } from 'react'
import { Suspense } from 'react'
import React, { useRef } from 'react'
import { useGLTF, CameraControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

export function ISS(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/ISS.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.InternationalSpaceStation_mesh as THREE.Mesh).geometry}
        material={materials.InternationalSpaceStation_mat}
        castShadow
        receiveShadow
      />
    </group>
  )
}

export function Earth(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/EarthWithBanner5.glb')
  const earthRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05
      earthRef.current.rotation.z = Math.sin(Date.now() * 0.0001) * 0.05
    }
  })

  return (
    <group ref={earthRef} {...props} dispose={null} rotation={[Math.PI * 0.05, Math.PI * 0.6, 0]}>
      <mesh geometry={(nodes.Text as THREE.Mesh).geometry} material={materials['Material.001']} position={[0.981, 0.329, 0]} rotation={[1.556, 0.209, -1.499]} scale={0.3} />
      <mesh geometry={(nodes.Text001 as THREE.Mesh).geometry} material={materials['Material.002']} position={[1.021, 0, -0.236]} rotation={[1.577, 0.122, -1.624]} scale={0.3} />
      <mesh geometry={(nodes.Text002 as THREE.Mesh).geometry} material={materials['Material.003']} position={[1.009, -0.323, -0.523]} rotation={[1.585, 0.104, -1.711]} scale={0.3} />
      <mesh geometry={(nodes.Object_Planet_0 as THREE.Mesh).geometry} material={materials.Planet} rotation={[-Math.PI, 0.262, 3.054]} />
    </group>
  )
}

function OrbitingISS() {
  const pivot = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y += delta * 0.2
      pivot.current.position.x = Math.sin(Date.now() * 0.0003) * 0.5
      pivot.current.position.z = Math.cos(Date.now() * 0.0003) * 0.5
    }
  })

  return (
    <group ref={pivot}>
      <ISS position={[5.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.05} />
    </group>
  )
}

export interface SceneProps {
  variant?: 'desktop' | 'mobile'
}

export default function Scene({ variant = 'desktop' }: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        position: [-8, 5, -12],
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, -10]} intensity={1} />

      <Suspense fallback={null}>
        <Earth position={[0, 0, 0]} scale={4} />
        <OrbitingISS />
      </Suspense>

      <CameraControls smoothTime={1.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/ISS.glb')
useGLTF.preload('/assets/models/EarthWithBanner5.glb')
useGLTF.preload('/assets/models/LowPolyEarth-transformed.glb')
