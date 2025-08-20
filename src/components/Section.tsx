"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Box, useTheme } from "@mui/material";

interface SectionProps {
    index: number;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
    index,
    children,
}) => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.timeline({ 
            scrollTrigger: {
                scrub: 1,
                pin: true,
                start: "bottom bottom",
                trigger: containerRef.current,
            }
        });
    }, { scope: containerRef });

    return (
        <Box
            ref={containerRef}
            sx={{
                zIndex: index,
                background: theme.palette.background.default,
            }}
        >
            {children}
        </Box>
    );
};

export default Section;
