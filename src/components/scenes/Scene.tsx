import useThreeD from "@/hooks/useThreeD";
import { useEffect, useState } from "react";

interface SceneProps {
    delay?: number;
    image: React.ReactNode;
    canvas: React.ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ delay = 1000, image, canvas }) => {
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

    return <>{showCanvas ? canvas : image}</>;
};
