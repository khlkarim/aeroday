"use client";

import gsap from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "../../content/event";
import { Paragraph } from "../text/Paragraph";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button, Box, Typography, Chip, useTheme } from "@mui/material";

gsap.registerPlugin(ScrollToPlugin, useGSAP);

const Hero: React.FC = () => {
    const theme = useTheme();
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // gsap.set(".hero-chip", { y: -30, scale: 0.8 });
        // gsap.set(".hero-title", { y: 50 });
        // gsap.set(".hero-subtitle", { y: 30, x: -20 });
        // gsap.set(".hero-paragraph", { y: 40 });
        // gsap.set(".hero-buttons button", { y: 30, scale: 0.9 });

        // Create main timeline
const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
});

// Animate elements in sequence with overlapping timing
tl.from(".hero-chip", { 
    autoAlpha: 0, 
    y: 40, 
    scale: 0.95,
    duration: 0.6, // shorter
    ease: "back.out(1.7)"
})
.from(".hero-title", { 
    autoAlpha: 0, 
    y: 30,
    duration: 0.8, // shorter
    ease: "power3.out"
}, "-=0.35")
.from(".hero-subtitle", { 
    autoAlpha: 0, 
    y: 20,
    duration: 0.5,
    ease: "power2.out"
}, "-=0.45")
.from(".hero-paragraph", { 
    autoAlpha: 0, 
    y: 20,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.4")
.from(".hero-buttons button", { 
    autoAlpha: 0, 
    y: 20,
    scale: 0.9,
    duration: 0.45,
    stagger: 0.12, // tighter staggering
    ease: "back.out(1.4)"
}, "-=0.35");

// Highlight animation after title loads
gsap.fromTo(highlightRef.current, 
  { backgroundSize: "0% 100%" },
  { backgroundSize: "100% 100%", duration: 0.9, ease: "power2.out", delay: 0.6 }
);



    }, { scope: container });

    const handleScroll = (target: string) => {
        gsap.to(window, {
            duration: 1.2,
            ease: "power3.inOut",
            scrollTo: {
                y: target,
                offsetY: 80,
            },
        });
    };

    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleChipHover = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    };

    const handleChipLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    };

    return (
        <Box
            ref={container}
            className="flex flex-col items-start justify-center gap-6"
            sx={{ 
            position: 'relative',
            minHeight: '100vh' // Take 80% of screen height
            }}
        >
            <Chip
            className="hero-chip"
            color="success"
            variant="outlined"
            label={"📅 " + event.subtitle}
            onMouseEnter={handleChipHover}
            onMouseLeave={handleChipLeave}
            sx={{
                borderRadius: 2,
                cursor: "pointer",
                fontSize: "1rem",
                transition: "none", // Disable MUI default transitions
                }}
            />
            
            <Box ref={titleRef}>
                <Typography variant="h2" className="hero-title">
                    {event.name + " "}
                    <span ref={highlightRef} className="bg-emerald-900/40 px-2 rounded-md text-white">
                        {event.date.year}
                    </span>
                </Typography>
                <Typography
                    variant="subtitle1"
                    className="hero-subtitle"
                    sx={{ 
                        color: theme.palette.text.secondary,
                        transition: "none"
                    }}
                >
                    {event.edition}
                </Typography>
            </Box>

            <div className="hero-paragraph">
                <Paragraph>
                    {event.description.primary}
                </Paragraph>
            </div>

            <Box className="flex gap-4 hero-buttons">
                <Button 
                    variant="contained" 
                    onClick={() => handleScroll("#Axes")}
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                    sx={{
                        transition: "none", // Disable MUI default transitions
                        transformOrigin: "center"
                    }}
                >
                    Axes
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => handleScroll("#Challenges")}
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                    sx={{
                        transition: "none", // Disable MUI default transitions
                        transformOrigin: "center"
                    }}
                >
                    Challenges
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;