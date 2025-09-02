import React from 'react'
import * as THREE from 'three'
import { JSX, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function AnimatedGlider(props: JSX.IntrinsicElements['group']) {
  const group = useRef(null);
  const { nodes, materials } = useGLTF('/assets/models/AnimatedGlider.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="0_Sketchfab_DemoScenefbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="V1_SailplaneGlider_1_Animated" rotation={[-1.695, 0, 0]} scale={100}>
                  <group name="V1_SailplaneGlider_1_LandingGear_Door_R" position={[-0.09, -0.382, -0.345]} rotation={[1.763, 0.209, -Math.PI / 2]} scale={0.01}>
                    <mesh name="V1_SailplaneGlider_1_LandingGear_Door_R_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_LandingGear_Door_R_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                  </group>
                  <group name="V1_SailplaneGlider_1_LandingGear_Door_L" position={[0.09, -0.382, -0.345]} rotation={[1.763, -0.209, Math.PI / 2]} scale={0.01}>
                    <mesh name="V1_SailplaneGlider_1_LandingGear_Door_L_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_LandingGear_Door_L_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                  </group>
                  <group name="V1_SailplaneGlider_1_LandingGear_Cable" position={[0, -0.292, 0.017]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <group name="V1_SailplaneGlider_1_LandingGear" position={[0, -20.437, 0]}>
                      <group name="V1_SailplaneGlider_1_Wheel_F" position={[0, -19.983, 6.854]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <mesh name="V1_SailplaneGlider_1_Wheel_F_VehiclesGeneric_0" geometry={(nodes.V1_SailplaneGlider_1_Wheel_F_VehiclesGeneric_0 as THREE.Mesh).geometry} material={materials.VehiclesGeneric} />
                      </group>
                      <mesh name="V1_SailplaneGlider_1_LandingGear_VehiclesGeneric_0" geometry={(nodes.V1_SailplaneGlider_1_LandingGear_VehiclesGeneric_0 as THREE.Mesh).geometry} material={materials.VehiclesGeneric} />
                    </group>
                    <mesh name="V1_SailplaneGlider_1_LandingGear_Cable_VehiclesGeneric_0" geometry={(nodes.V1_SailplaneGlider_1_LandingGear_Cable_VehiclesGeneric_0 as THREE.Mesh).geometry} material={materials.VehiclesGeneric} />
                  </group>
                  <group name="V1_SailplaneGlider_1_Door" position={[0, -1.932, 0.024]}>
                    <mesh name="V1_SailplaneGlider_1_Door_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_Door_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                    <mesh name="V1_SailplaneGlider_1_Door_VehiclesGlass_0" geometry={(nodes.V1_SailplaneGlider_1_Door_VehiclesGlass_0 as THREE.Mesh).geometry} material={materials.VehiclesGlass} />
                  </group>
                  <group name="V1_SailplaneGlider_1_Wheel_R" position={[0, 3.411, 0.057]}>
                    <mesh name="V1_SailplaneGlider_1_Wheel_R_VehiclesGeneric_0" geometry={(nodes.V1_SailplaneGlider_1_Wheel_R_VehiclesGeneric_0 as THREE.Mesh).geometry} material={materials.VehiclesGeneric} />
                  </group>
                  <group name="V1_SailplaneGlider_1_Aileron_L" position={[5.699, 0.128, 0.496]}>
                    <mesh name="V1_SailplaneGlider_1_Aileron_L_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_Aileron_L_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                  </group>
                  <group name="V1_SailplaneGlider_1_Aileron_R" position={[-5.699, 0.128, 0.496]}>
                    <mesh name="V1_SailplaneGlider_1_Aileron_R_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_Aileron_R_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                  </group>
                  <group name="V1_SailplaneGlider_1_Body">
                    <mesh name="V1_SailplaneGlider_1_Body_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_Body_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                    <mesh name="V1_SailplaneGlider_1_Body_VehiclesGeneric_0" geometry={(nodes.V1_SailplaneGlider_1_Body_VehiclesGeneric_0 as THREE.Mesh).geometry} material={materials.VehiclesGeneric} />
                  </group>
                  <group name="V1_SailplaneGlider_1_Rudder" position={[0, 3.746, 0.704]}>
                    <mesh name="V1_SailplaneGlider_1_Rudder_Vehicle_Elements_0" geometry={(nodes.V1_SailplaneGlider_1_Rudder_Vehicle_Elements_0 as THREE.Mesh).geometry} material={materials.Vehicle_Elements} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/AnimatedGlider.glb')