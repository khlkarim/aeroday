"use client"

import useThreeD from "@/hooks/useThreeD";
import { Loader } from "@react-three/drei";
import { useEffect, useState } from "react";

interface SceneProps {
    delay?: number;
    image: React.ReactNode;
    canvas?: React.ReactNode;
}

export const SceneContainer: React.FC<SceneProps> = ({ delay = 1000, image, canvas }) => {
    const { active } = useThreeD();
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (active) {
            timer = setTimeout(() => {
                setShowCanvas(true);
            }, delay);
        } else {
            setShowCanvas(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [delay, active]);

    let content;
    if (active) {
        if(canvas)
        {
            if (showCanvas) {
                content = <> {canvas} <Loader /> </>;
            } else {
                content = <></>;
            }
        } 
        else 
        {
            content = image;
        }
    } else {
        content = image;
    }

    return content;
};
