import React from "react";

const Lighting: React.FC = () => (
    <>
        <ambientLight intensity={0.25} color={0xffffff} />

        <directionalLight
            position={[15, 20, -10]}
            intensity={2.0}
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-bias={-0.0005}
        />

        <directionalLight
            position={[-10, 5, -10]}
            intensity={0.8}
            color={0xaaaaff}
        />

        <spotLight
            position={[0, 15, -10]}
            intensity={1.2}
            angle={0.3}
            penumbra={0.7}
            castShadow
            shadow-mapSize={[2048, 2048]}
        />

        <pointLight
            position={[5, 5, -15]}
            intensity={0.4}
            color={0xffffff}
        />
    </>
);

export default Lighting;