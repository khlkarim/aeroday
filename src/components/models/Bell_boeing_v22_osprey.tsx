import { JSX } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function Boing(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/bell_boeing_v22_osprey.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={(nodes.Object_2 as THREE.Mesh).geometry} material={materials.DefaultWhite_NONE} />
        <mesh geometry={(nodes.Object_3 as THREE.Mesh).geometry} material={materials['DefaultWhite_ai.png']} />
        <mesh geometry={(nodes.Object_4 as THREE.Mesh).geometry} material={materials['DefaultWhite_ai0.png']} />
        <mesh geometry={(nodes.Object_5 as THREE.Mesh).geometry} material={materials.DefaultWhite} />
        <mesh geometry={(nodes.Object_6 as THREE.Mesh).geometry} material={materials.DefaultWhite} />
        <mesh geometry={(nodes.Object_7 as THREE.Mesh).geometry} material={materials.DefaultWhite} />
        <mesh geometry={(nodes.Object_8 as THREE.Mesh).geometry} material={materials.DefaultWhite} />
        <mesh geometry={(nodes.Object_9 as THREE.Mesh).geometry} material={materials.DefaultWhite} />
        <mesh geometry={(nodes.Object_10 as THREE.Mesh).geometry} material={materials['DefaultWhite_alt.png']} />
        <mesh geometry={(nodes.Object_11 as THREE.Mesh).geometry} material={materials['DefaultWhite_alt.tape.png']} />
        <mesh geometry={(nodes.Object_12 as THREE.Mesh).geometry} material={materials['DefaultWhite_asi.png']} />
        <mesh geometry={(nodes.Object_13 as THREE.Mesh).geometry} material={materials['DefaultWhite_asi.tape.png']} />
        <mesh geometry={(nodes.Object_14 as THREE.Mesh).geometry} material={materials['DefaultWhite_attitude_indicator.png']} />
        <mesh geometry={(nodes.Object_15 as THREE.Mesh).geometry} material={materials['DefaultWhite_interior.png']} />
        <mesh geometry={(nodes.Object_16 as THREE.Mesh).geometry} material={materials['DefaultWhite_map-back.png']} />
        <mesh geometry={(nodes.Object_17 as THREE.Mesh).geometry} material={materials['DefaultWhite_mfd.png']} />
        <mesh geometry={(nodes.Object_18 as THREE.Mesh).geometry} material={materials['DefaultWhite_map.png']} />
        <mesh geometry={(nodes.Object_19 as THREE.Mesh).geometry} material={materials['DefaultWhite_panel.png']} />
        <mesh geometry={(nodes.Object_20 as THREE.Mesh).geometry} material={materials['DefaultWhite_panel1.png']} />
        <mesh geometry={(nodes.Object_21 as THREE.Mesh).geometry} material={materials['DefaultWhite_pfd.png']} />
        <mesh geometry={(nodes.Object_22 as THREE.Mesh).geometry} material={materials['DefaultWhite_pfd.png']} />
        <mesh geometry={(nodes.Object_23 as THREE.Mesh).geometry} material={materials['DefaultWhite_pitchscale.png']} />
        <mesh geometry={(nodes.Object_24 as THREE.Mesh).geometry} material={materials['DefaultWhite_seat.png']} />
        <mesh geometry={(nodes.Object_25 as THREE.Mesh).geometry} material={materials['DefaultWhite_throttle.png']} />
        <mesh geometry={(nodes.Object_26 as THREE.Mesh).geometry} material={materials.Transparent} />
        <mesh geometry={(nodes.Object_27 as THREE.Mesh).geometry} material={materials.Transparent_NONE} />
        <mesh geometry={(nodes.Object_28 as THREE.Mesh).geometry} material={materials['Transparent_interior.png']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/bell_boeing_v22_osprey.glb')
