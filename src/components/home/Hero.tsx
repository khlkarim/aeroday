"use client"

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { event } from '@/content/event';
import { ScrollTrigger } from 'gsap/all';
import Plane from '@/components/scenes/Hero';
import { useTheme } from '@mui/material/styles';
import { SceneContainer } from '@/components/scenes/SceneContainer';
import { Paragraph } from '@/components/text/Paragraph';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';
import { Countdown } from './Countdown';

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
                gap={3}
                alignItems={'start'}
                justifyContent={'center'}
            >
                <Chip
                    color="primary"
                    variant="outlined"
                    className='animated'
                    label={"📅 " + event.subtitle}
                    sx={{
                        borderRadius: 1,
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                />
            
                <Box className='animated'>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '1.65rem', sm: '2.5rem', md: '2.5rem', lg: '2.75rem' },
                        }}
                    >
                        {event.name + " "}
                        <Box
                            component="span"
                            sx={{
                                px: 2,
                                borderRadius: 1,
                                color: theme.palette.secondary.contrastText,
                                backgroundColor: theme.palette.primary.main,
                            }}
                        >
                            {event.date.year}
                        </Box>
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        className='animated'
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        {event.edition}
                    </Typography>
                </Box>

                <Box className='animated'>
                    <Paragraph>
                        {event.description.primary}
                    </Paragraph>
                </Box>

                <Stack 
                    gap={2}
                    className="animated"
                    flexDirection={'row'}
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
                </Stack>
            </Stack>
            
            <Box className='animated'>
                <SceneContainer
                    image={
                        <Countdown />
                    }
                    canvas={
                        <Box 
                            sx={theme => ({ 
                                width: { xs: 330, sm: 400, md: 360 },
                                height: { xs: 240, sm: 300, md: 360 },
                                position: 'relative',
                                borderRadius: 5,
                                background: {
                                    xs: theme.palette.mode === "light"
                                            ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 100%)"
                                            : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                                    sm: theme.palette.mode === "light"
                                            ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 100%)"
                                            : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                                    md: "none"
                                },
                            })}
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
