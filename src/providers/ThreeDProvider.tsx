"use client"

import { useState, type ReactNode } from "react";
import { ThreeDContext } from "@/contexts/ThreeDContext";

const ThreeDProvider = ({ children }: { children: ReactNode }) => {
    const [active, setActive] = useState<boolean>(false);
    const toggle = () => setActive((prev) => !prev);

    return (
        <ThreeDContext.Provider value={{ active, toggle }}>
            {children}
        </ThreeDContext.Provider>
    );
}

export default ThreeDProvider;