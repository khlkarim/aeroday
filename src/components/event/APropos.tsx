import { gsap } from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "../../content/event";
import { Paragraph } from "../text/Paragraph";
import { Typography, Box } from "@mui/material";

export const APropos = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !logoRef.current || !titleRef.current || !descriptionRef.current) return;

        const onScrollIn = gsap.timeline();

        // Animate logo
        onScrollIn.from( 
            logoRef.current, 
            { 
                y: 50, 
                scale: 0.95, 
                autoAlpha: 0, 
                duration: 0.8, 
                scrollTrigger: 
                { 
                    scrub: 1, 
                    end: "top 60%", 
                    start: "top 90%", 
                    trigger: logoRef.current, 
                } 
            });

        // Animate title
        onScrollIn.from(titleRef.current, {
            autoAlpha: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
                end: "top 60%",
                scrub: 1
            }
        });

        // Animate description
        onScrollIn.from(descriptionRef.current, {
            autoAlpha: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
                scrub: 1,
                end: "top 60%",
                start: "top 90%",
                trigger: descriptionRef.current,
            }
        });

    }, { scope: containerRef });

    return (
        <Box ref={containerRef} className="flex flex-wrap items-center justify-around gap-7">
            <Box
                ref={logoRef}
                component="img"
                src={event.logo}
                alt={`${event.name} logo`}
                className='animated w-70 h-auto object-contain rounded-full'
                sx={{
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    cursor: 'pointer'
                }}
            />
            <Box>
                <Typography ref={titleRef} className="animated" variant="h3" sx={{ mb: 2 }}>
                    A propos de {event.name}
                </Typography>
                <Box ref={descriptionRef} className="animated">
                    <Paragraph>{event.description.secondary}</Paragraph>
                </Box>
            </Box>
        </Box>
    );
};