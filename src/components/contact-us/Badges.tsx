"use client"    

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from "react";
import Badge from "@/components/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Badges: React.FC = () => {
     const badgesRef = useRef<HTMLDivElement>(null);
    
        useGSAP(() => {
            if (!badgesRef.current) return;
    
            const badgeElements = badgesRef.current.children;
            Array.from(badgeElements).forEach((badge) => {
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
    <Stack
        gap={4}
        ref={badgesRef}
        width="100%"
        flexWrap="wrap"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-around"
    >
        <Badge>
            <Stack gap={1} alignItems="center">
                <LocationOnIcon color="primary" fontSize="large" />
                <Box>
                    <Typography variant="h5" textAlign="center">Visit Our Office</Typography>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        color="text.secondary"
                    >
                        INSAT Centre Urbain Nord BP 676 - 1080 Tunis Cedex
                    </Typography>
                </Box>
            </Stack>
        </Badge>
        <Badge>
            <Stack gap={1} alignItems="center">
                <EmailIcon color="primary" fontSize="large" />
                <Box>
                    <Typography variant="h5" textAlign="center">Email Us</Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        contact@aeroday.tn
                    </Typography>
                </Box>
            </Stack>
        </Badge>
        <Badge>
            <Stack gap={1} alignItems="center">
                <PhoneIcon color="primary" fontSize="large" />
                <Box>
                    <Typography variant="h5" textAlign={'center'}>Call Us</Typography>
                    <Typography variant="body1" color="text.secondary" textAlign={'center'}>
                        +216 12 123 123
                    </Typography>
                </Box>
            </Stack>
        </Badge>
    </Stack>);
}

export default Badges;
