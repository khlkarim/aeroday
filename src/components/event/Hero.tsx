"use client"

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { event } from '@/content/event';
import { useTheme } from '@mui/material/styles';
import { Paragraph } from '@/components/text/Paragraph';
import { Box, Typography, Chip, Button } from '@mui/material';
import { useAnimation } from '@/hooks/animations/useAnimation';
import { useHoverAnimation } from '@/hooks/animations/useHoverAnimation';
import { useParallaxAnimation } from '@/hooks/animations/useParallaxAnimation';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const Hero: React.FC = () => {
    const theme = useTheme();
    
    const containerRef = useRef<HTMLDivElement>(null);
    const chipRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    // ===== ENTRANCE ANIMATIONS =====
    
    // Chip animation - Scale in with bounce
    useAnimation(chipRef, {
        preset: 'scaleIn',
        duration: 0.6,
        ease: "back.out(1.7)",
    });

    // Title animation - Slide in from left
    useAnimation(titleRef, {
        preset: 'slideInLeft',
        distance: 80,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
    });

    // Subtitle animation - Fade in
    useAnimation(subtitleRef, {
        preset: 'fadeIn',
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
    });

    // Description animation - Slide up
    useAnimation(descriptionRef, {
        preset: 'slideInUp',
        distance: 30,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.6,
    });

    // Buttons animation - Slide up
    useAnimation(buttonsRef, {
        delay: 0.8,
        distance: 40,
        duration: 0.5,
        ease: "power3.out",
        preset: 'slideInUp',
    });

    // ===== HOVER ANIMATIONS =====
    
    // Chip hover effect
    useHoverAnimation(chipRef, {
        lift: 0,
        scale: 1.05,
        duration: 0.5
    });

    useParallaxAnimation(
        descriptionRef, 
        {
            trigger: containerRef, 
            scrollTrigger: { start: "bottom 100%" } 
        }
    );

    // ===== SCROLL HANDLER =====
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

    return (
        <Box
            ref={containerRef}
            className="flex flex-col items-start justify-center gap-6"
            sx={{
                minHeight: '82vh',
                position: 'relative',
                paddingBottom: '12vh',
            }}
        >
            <Chip
                ref={chipRef}
                className='animated'
                color="success"
                variant="outlined"
                label={"📅 " + event.subtitle}
                sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    fontSize: "1rem",
                }}
            />
           
            <Box ref={titleRef} className='animated'>
                <Typography variant="h2">
                    {event.name + " "}
                    <span className="bg-emerald-900/40 px-2 rounded-md text-white">
                        {event.date.year}
                    </span>
                </Typography>
                <Typography
                    ref={subtitleRef}
                    variant="subtitle1"
                    sx={{
                        color: theme.palette.text.secondary,
                    }}
                >
                    {event.edition}
                </Typography>
            </Box>

            <Box ref={descriptionRef} className='animated'>
                <Paragraph>
                    {event.description.primary}
                </Paragraph>
            </Box>

            <Box 
                ref={buttonsRef} 
                className="animated flex gap-4"
            >
                <Button
                    variant="contained"
                    onClick={() => handleScroll("#Axes")}
                >
                    Axes
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleScroll("#Challenges")}
                >
                    Challenges
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;