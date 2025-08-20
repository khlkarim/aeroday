"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "@/content/event";
import { Box, Typography } from "@mui/material";

export default function Sponsors() {
    const sponsors = event.sponsors;
    const titleRef = useRef<HTMLDivElement>(null);
    const sponsorsRef = useRef<HTMLDivElement>(null); 
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(!titleRef.current || !sponsorsRef.current) return;

        const onScrollIn = gsap.timeline();

        onScrollIn.from(
            titleRef.current,
            {
                y: 20, 
                autoAlpha: 0,
                scrollTrigger: {
                    scrub: 1,
                    end: "top 50%",
                    start: "top 90%",
                    trigger: containerRef.current,
                },
            }
        );

        const sponsorElements = sponsorsRef.current.children;
        Array.from(sponsorElements).forEach((sponsor) => {
            onScrollIn.from(sponsor, {
                autoAlpha: 0,
                y: 30,
                scale: 0.8,
                duration: 0.5,
                scrollTrigger: {
                    trigger: sponsor,
                    start: "top 95%",
                    end: "top 70%",
                    scrub: 1
                }
            });
        });
    });

    return (
        <Box
            ref={containerRef}
            sx={{
                p: { xs: 2, sm: 4 },
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    pr: 12,
                    pl: 1,
                    mb: { xs: 2, sm: 4 },
                    position: "relative",
                    display: "inline-block",
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div ref={titleRef}
                className="animated">
                    Brought to you by
                </div>
            </Typography>

            <Box
                ref={sponsorsRef}
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: { xs: 2, sm: 4 },
                    justifyContent: "space-around",
                }}
            >
            {sponsors.map((sponsor) => (
                <Box
                    component="img"
                    key={sponsor.name}
                    src={sponsor.logo}
                    alt={sponsor.name}
                    sx={{
                        borderRadius: 100,
                    }}
                />
            ))}
            </Box>
        </Box>
    );
}
