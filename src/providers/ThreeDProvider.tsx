"use client"

import { useState, useEffect, type ReactNode } from "react";
import { ThreeDContext } from "@/contexts/ThreeDContext";

const ThreeDProvider = ({ children }: { children: ReactNode }) => {
    const [active, setActive] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("threeDActive");
            return stored ? JSON.parse(stored) : true;
        }
        return true;
    });

    const toggle = () => setActive(prev => !prev);

    useEffect(() => {
        localStorage.setItem("threeDActive", JSON.stringify(active));
    }, [active]);

    return (
        <ThreeDContext.Provider value={{ active, toggle }}>
            {children}
        </ThreeDContext.Provider>
    );
}

export default ThreeDProvider;
