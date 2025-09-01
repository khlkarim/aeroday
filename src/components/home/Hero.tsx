"use client"

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { Countdown } from './Countdown';
import { event } from '@/content/event';
import { ScrollTrigger } from 'gsap/all';
import Plane from '@/components/scenes/Hero';
import { useTheme } from '@mui/material/styles';
import { Paragraph } from '@/components/text/Paragraph';
import { SceneContainer } from '@/components/scenes/SceneContainer';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';

const Hero: React.FC = () => {
    const theme = useTheme();   
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => { 
        if(containerRef.current) 
        {
            animate({ container: containerRef.current });
        }
    }, { scope: containerRef });

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
        <Stack 
            gap={6} 
            ref={containerRef}
            alignItems={'center'}
            sx={{ 
                minHeight: '76vh',
            }} 
            position={'relative'}
            flexDirection={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} 
            justifyContent={
                    { xs: 'space-around', sm: 'space-around', md: 'space-between' }
                }
        >
            <Stack
                mt={{ xs: 4, sm: 3, md: 3 }}
                gap={{ xs: 2, md: 3 }}
                justifyContent="center"
                textAlign={{ xs: "center", sm: 'center', md: "left" }}
                alignItems={{ xs: "center", sm: 'center', md: "flex-start" }}
            >
                <Chip
                    color="primary"
                    variant="outlined"
                    className="animated"
                    label={"📅 " + event.subtitle}
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        cursor: "pointer",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                />

                <Box className="animated">
                    <Typography
                        variant="h2"
                        lineHeight={1.2}
                        fontWeight="bold"
                        fontSize={{ xs: "2.2rem", sm: "2.4rem", md: "3rem" }}
                    >
                        {event.name + " "}
                        <Box
                            component="span"
                            sx={{
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                color: theme.palette.secondary.contrastText,
                                backgroundColor: theme.palette.primary.main,
                                display: "inline-block",
                            }}
                        >
                            {event.date.year}
                        </Box>
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        className="animated"
                        sx={{
                            color: theme.palette.text.secondary,
                            mt: 0.5,
                        }}
                    >
                        {event.edition}
                    </Typography>
                </Box>

                {/* Description */}
                <Box className="animated">
                    <Paragraph>
                        <Typography textAlign={{ xs: "center", sm: 'center', md: "left" }}>
                            {event.description.primary}    
                        </Typography>
                    </Paragraph>
                </Box>

                {/* Action Buttons */}
                <Stack
                    gap={2}
                    className="animated"
                    flexDirection={{ xs: "column", sm: "row" }}
                    width={{ xs: "100%", sm: "auto" }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => handleScroll("#Axes")}
                    >
                        Axes
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => handleScroll("#Challenges")}
                    >
                        Challenges
                    </Button>
                </Stack>
            </Stack>
            <Box className='animated'>
                <SceneContainer
                    image={
                        <Countdown />
                    }
                    canvas={
                        <Box 
                            sx={{ 
                                width: { xs: 240, sm: 360},
                                height: { xs: 240, sm: 360},
                                borderRadius: 5,
                                position: 'relative',
                                border: { xs: `1px solid ${theme.palette.divider}`, sm: `1px solid ${theme.palette.divider}`, md: 'none' },
                            }}
                        >
                            <Plane />
                        </Box>
                    }
                />
            </Box>
        </Stack>
    );
};

export default Hero;

type AnimateRefs = {
    container: HTMLElement;
};

export function animate({ container }: AnimateRefs) {
    const onLoad = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => animateScroll({ container }),
    });

    onLoad.from('.animated', {
        y: 40,
        scale: 0.95,
        autoAlpha: 0,
        stagger: 0.15,
    });
}

function animateScroll({ container }: AnimateRefs) {
    const onScroll = gsap.timeline({
        overwrite: "auto",
        defaults: { ease: "power2.inOut" },
    });

    onScroll.to('.animated', {
        y: -50,
        autoAlpha: 0,
        stagger: 0.1,
    });

    ScrollTrigger.create({
        scrub: 1,
        end: "bottom 15%",
        trigger: container,
        animation: onScroll,
        start: "bottom center",
    });
}
