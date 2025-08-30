import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ISS } from "@/components/models/ISS";
import Lighting from "@/components/scenes/Lighting";
import { OrbitControls, Environment } from "@react-three/drei";

export default function ExpAerospatiales() {
    return (
        <Canvas
            camera={{
                fov: 45,
                position: [-50, 15, 0],
            }}
        >
            <Suspense fallback={null}>
                <Environment 
                    files={"/assets/environments/space.hdr"}
                    background
                    blur={0.05}
                />

                <Lighting />
                <ISS rotation={[0, 0, 0.7]} />
            </Suspense>

            <OrbitControls 
                autoRotate 
                enableDamping 
                rotateSpeed={0.03} 
                dampingFactor={0.1}
            />
        </Canvas>
    );
}
