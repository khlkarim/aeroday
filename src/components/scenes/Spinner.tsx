import * as THREE from 'three';
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";

type SpinnerProps = {
    speed?: number;                
    paused?: boolean;
    children: React.ReactNode;    
    axis?: [number, number, number];
    position?: [number, number, number];
    scale?: number | [number, number, number];
};

export default function Spinner({
    children,
    axis = [0, 1, 0],
    speed = 0.02,
    paused = false,
    position = [0, 0, 0],
    scale = 1,
}: SpinnerProps) {
    const group = useRef<THREE.Group>(null!);
    const axisVec = useMemo(() => new Vector3(...axis).normalize(), [axis]);

    useFrame((_, delta) => {
        if (paused) return;
        group.current.rotateOnWorldAxis(axisVec, speed * delta);
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {children}
        </group>
    );
}
