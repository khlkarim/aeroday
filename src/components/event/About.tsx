"use client"

import { gsap } from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Star } from "@mui/icons-material";
import { event } from "../../content/event";
import { History } from "@mui/icons-material";
import { Paragraph } from "../text/Paragraph";
import { Typography, Box } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardGiftcard } from "@mui/icons-material";
import { SupportAgent } from "@mui/icons-material";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    const container = useRef<HTMLDivElement>(null);
    const badges = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current || !badges.current) return;

        // Animate logo
        gsap.from(".about-logo", {
            autoAlpha: 0,
            y: 50,
            duration: 0.8,
            scale: 0.95,
            transformOrigin: "center",
            scrollTrigger: {
                trigger: ".about-logo",
                start: "top 90%",
                end: "top 60%",
                scrub: true
            }
        });

        // Animate title
        gsap.from(".about-title", {
            autoAlpha: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
                trigger: ".about-title",
                start: "top 90%",
                end: "top 60%",
                scrub: true
            }
        });

        // Animate description
        gsap.from(".about-description", {
            autoAlpha: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
                trigger: ".about-description",
                start: "top 90%",
                end: "top 60%",
                scrub: true
            }
        });

        // Animate each badge individually
        const badgeElements = badges.current.children;
        Array.from(badgeElements).forEach((badge) => {
            gsap.from(badge, {
                autoAlpha: 0,
                y: 30,
                scale: 0.8,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: badge,
                    start: "top 95%",
                    end: "top 70%",
                    scrub: true
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
    }, { scope: container });


    return (
        <Box ref={container} className="flex flex-col items-center justify-around gap-6" sx={{ minHeight: '100vh' }}>
            <Box className="flex flex-wrap items-center justify-around gap-15">
                <Box
                    component="img"
                    src={event.logo}
                    alt={`${event.name} logo`}
                    className='about-logo w-60 h-auto object-contain rounded-full'
                    sx={{
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                        cursor: 'pointer'
                    }}
                />
                <Box>
                    <Box className="about-title">
                        <Typography variant="h3" sx={{ mb: 2 }}>
                            A propos de {event.name}
                        </Typography>
                    </Box>
                    <Box className="about-description">
                        <Paragraph>{event.description.secondary}</Paragraph>
                    </Box>
                </Box>
            </Box>
            
            <Box ref={badges} className="flex flex-wrap justify-center gap-6">
                {event.badges.map((badge, index) => {
                    let IconComponent;
                    switch (badge.icon) {
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

                    return (
                        <Box
                            key={index}
                            className="about-badge shadow-md rounded-lg flex flex-col items-center justify-center"
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
        </Box>
    );
};

export default About;