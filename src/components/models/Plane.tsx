import * as THREE from 'three'
import type { JSX } from 'react'
import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"

useGLTF.preload('/assets/models/Plane.glb')

type PlaneProps = JSX.IntrinsicElements['group'] & {
  wireframe?: boolean
}

export function Plane({ wireframe = false, ...props }: PlaneProps) {
  const planeRef = useRef<THREE.Group>(null)
  const propellerRef = useRef<THREE.Mesh>(null)
  const { nodes, materials } = useGLTF('/assets/models/Plane.glb')

  // Create one wireframe material to reuse
  const wireframeMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
    []
  )

  useFrame(({ clock }, delta) => {
    if (propellerRef.current) {
      propellerRef.current.rotation.z += delta * 20
    }

    if (planeRef.current) {
      const t = clock.getElapsedTime()
      planeRef.current.position.y = Math.sin(t * 0.8) * 0.2 
      planeRef.current.rotation.z = Math.sin(t * 0.4) * 0.05
      planeRef.current.rotation.x = Math.cos(t * 0.3) * 0.03
    }
  })

  return (
    <group ref={planeRef} {...props} dispose={null}>
      <mesh geometry={(nodes['Fuselage_Cube003-Mesh'] as THREE.Mesh).geometry} material={wireframe ? wireframeMaterial : materials.White} />
      <mesh geometry={(nodes['Fuselage_Cube003-Mesh_1'] as THREE.Mesh).geometry} material={wireframe ? wireframeMaterial : materials.Red} />
      <mesh geometry={(nodes['Fuselage_Cube003-Mesh_2'] as THREE.Mesh).geometry} material={wireframe ? wireframeMaterial : materials.Gray} />
      <mesh geometry={(nodes['Fuselage_Cube003-Mesh_3'] as THREE.Mesh).geometry} material={wireframe ? wireframeMaterial : materials.Black} />
      <mesh ref={propellerRef} geometry={(nodes['Propeller_Cone-Mesh'] as THREE.Mesh).geometry} material={wireframe ? wireframeMaterial : materials.Black} />
      <mesh geometry={(nodes['Propeller_Cone-Mesh_1'] as THREE.Mesh).geometry} material={wireframe ? wireframeMaterial : materials.Gray} />
    </group>
  )
}
