import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'
import React, { JSX, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Drone(props: JSX.IntrinsicElements['group']) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF('/assets/models/animated_drone.glb')
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone)
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        if (actions) {
            if (animations[0].tracks.length > 4) animations[0].tracks.splice(-2)
            const firstClipName = Object.keys(actions)[0];
            actions[firstClipName]?.play()
        }
    }, [actions, animations])

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={1.004}>
                    <group name="root">
                        <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                            <group name="Sketchfab_model_0" rotation={[-Math.PI / 2, 0, 0]} scale={0.095}>
                                <group name="f337b629572e4d64ad830bb62fa78296fbx_1" rotation={[Math.PI / 2, 0, 0]}>
                                    <group name="Object_2_2">
                                        <group name="RootNode_3">
                                            <group name="Armature_5" position={[-6.283, 0.022, 6.252]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                                                <group name="Object_6_6">
                                                    <group name="GLTF_created_0">
                                                        <primitive object={nodes.GLTF_created_0_rootJoint} />
                                                        <group name="Object_9_9_correction">
                                                            <group name="Object_9_9" />
                                                        </group>
                                                        <group name="Object_10_10_correction">
                                                            <group name="Object_10_10" />
                                                        </group>
                                                        <group name="Object_11_11_correction">
                                                            <group name="Object_11_11" />
                                                        </group>
                                                        <group name="Object_12_12_correction">
                                                            <group name="Object_12_12" />
                                                        </group>
                                                        <group name="Object_13_13_correction">
                                                            <group name="Object_13_13" />
                                                        </group>
                                                        <group name="Object_14_14_correction">
                                                            <group name="Object_14_14" />
                                                        </group>
                                                        <group name="Object_25_25_correction">
                                                            <group name="Object_25_25" />
                                                        </group>
                                                        <group name="Object_26_26_correction">
                                                            <group name="Object_26_26" />
                                                        </group>
                                                        <group name="Object_27_27_correction">
                                                            <group name="Object_27_27" />
                                                        </group>
                                                        <group name="Object_29_29_correction">
                                                            <group name="Object_29_29" />
                                                        </group>
                                                        <skinnedMesh name="Object_23" geometry={(nodes.Object_23 as THREE.SkinnedMesh).geometry} material={materials.Drone_Gray} skeleton={(nodes.Object_23 as THREE.SkinnedMesh).skeleton} />
                                                        <skinnedMesh name="Object_26" geometry={(nodes.Object_26 as THREE.SkinnedMesh).geometry} material={materials.Drone_Outline} skeleton={(nodes.Object_26 as THREE.SkinnedMesh).skeleton} />
                                                        <skinnedMesh name="Object_29" geometry={(nodes.Object_29 as THREE.SkinnedMesh).geometry} material={materials.Drone} skeleton={(nodes.Object_29 as THREE.SkinnedMesh).skeleton} />
                                                        <skinnedMesh name="Object_32" geometry={(nodes.Object_32 as THREE.SkinnedMesh).geometry} material={materials.Drone_Yellow} skeleton={(nodes.Object_32 as THREE.SkinnedMesh).skeleton} />
                                                        <skinnedMesh name="Object_35" geometry={(nodes.Object_35 as THREE.SkinnedMesh).geometry} material={materials.Drone_Red} skeleton={(nodes.Object_35 as THREE.SkinnedMesh).skeleton} />
                                                        <skinnedMesh name="Object_38" geometry={(nodes.Object_38 as THREE.SkinnedMesh).geometry} material={materials.Drone_Red} skeleton={(nodes.Object_38 as THREE.SkinnedMesh).skeleton} />
                                                    </group>
                                                </group>
                                            </group>
                                        </group>
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

useGLTF.preload('/assets/models/animated_drone.glb')
