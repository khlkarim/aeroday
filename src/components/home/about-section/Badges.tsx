"use client"

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from "react";
import { Star } from "@mui/icons-material";
import { event } from "../../../content/event";
import { History } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { CardGiftcard } from "@mui/icons-material";
import { SupportAgent } from "@mui/icons-material";

function getIcon(label: string) {
    let IconComponent;

    switch (label) {
        case "trophy":
            IconComponent = EmojiEvents;
            break;
        case "history":
            IconComponent = History;
            break;
        case "gift":
            IconComponent = CardGiftcard;
            break;
        case "support":
            IconComponent = SupportAgent;
            break;
        default:
            IconComponent = Star;
    }

    return IconComponent;
}

const Badges: React.FC = () => {
    const badgesRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!badgesRef.current) return;

        const onScrollIn = gsap.timeline();

        // Animate each badge individually
        const badgeElements = badgesRef.current.children;
        Array.from(badgeElements).forEach((badge) => {
            onScrollIn.from(badge, {
                autoAlpha: 0,
                y: 30,
                scale: 0.8,
                duration: 0.5,
                scrollTrigger: {
                    trigger: badge,
                    start: "top 95%",
                    end: "top 70%",
                    scrub: 1
                }
            });

            const icon = badge.querySelector('svg');
            badge.addEventListener('mouseenter', () => {
                gsap.to(badge, {
                    y: -8,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotation: 10,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                }
            });
            badge.addEventListener('mouseleave', () => {
                gsap.to(badge, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                }
            });
        });
    }, { scope: badgesRef });

    return (
        <Box ref={badgesRef} className="flex flex-wrap justify-center gap-6">
            {event.badges.map((badge, index) => {
                const IconComponent = getIcon(badge.icon);

                return (
                    <Box
                        key={index}
                        className="animated about-badge shadow-md rounded-lg flex flex-col items-center justify-center"
                        sx={{
                            width: 220,
                            height: 160,
                            p: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            backdropFilter: 'blur(10px)',
                            overflow: 'hidden',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                transition: 'left 0.5s'
                            },
                            '&:hover::before': {
                                left: '100%'
                            }
                        }}
                    >
                        <IconComponent 
                            sx={{ 
                                fontSize: 40, 
                                color: 'primary.main', 
                                mb: 1,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                            }} 
                        />
                        <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                            {badge.title}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
                            {badge.subtitle}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Badges;