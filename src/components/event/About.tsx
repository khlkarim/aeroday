"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Badges from "./Badges";
import React, { useRef } from "react";
import { APropos } from "./APropos";
import { Box } from "@mui/material";

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const onScroll = gsap.timeline({
            scrollTrigger: {
                scrub: 1,
                markers: true,
                start: "bottom bottom",
                trigger: containerRef.current,
            }
        });

        onScroll.to(containerRef.current, { y: -80, autoAlpha: 0 });
    }, { scope: containerRef });

    return (
        <Box 
            ref={containerRef}
            sx={{ 
                gap: 6,
                pt: 10,pb: 10,
                height: '100vh',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-around', 
            }}
        >
            <APropos />
            <Badges />
        </Box>
    );
};

export default About;