"use client"

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { event } from '@/content/event';
import { ScrollTrigger } from 'gsap/all';
import useThreeD from '@/hooks/useThreeD';
import Plane from '@/components/scenes/Hero';
import { useTheme } from '@mui/material/styles';
import { SceneContainer } from '@/components/scenes/SceneContainer';
import { Paragraph } from '@/components/text/Paragraph';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';

const Hero: React.FC = () => {
    const theme = useTheme();   
    const threeD = useThreeD();
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
            alignItems={'center'}
            sx={{ minHeight: '76vh' }} 
            flexDirection={{ sm: 'column', md: 'row' }} 
            justifyContent={
                threeD.active ? 
                    { xs: 'space-around', sm: 'space-around', md: 'space-between' }
                        : 
                    { xs: "center", sm: "center", md: 'start' }
                }
        >
            <Stack
                gap={3}
                ref={containerRef}
                alignItems={'start'}
                justifyContent={'center'}
            >
                <Chip
                    color="secondary"
                    variant="outlined"
                    className='animated'
                    label={"📅 " + event.subtitle}
                    sx={{
                        borderRadius: 2,
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                />
            
                <Box className='animated'>
                    <Typography variant="h2">
                        {event.name + " "}
                        <Box
                            component="span"
                            sx={{
                                px: 2,
                                borderRadius: 1,
                                color: theme.palette.secondary.contrastText,
                                backgroundColor: theme.palette.secondary.main,
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
            
            <SceneContainer
                image={
                    <></>
                }
                canvas={
                    <Box 
                        sx={{ 
                            width: 360,
                            height: 360,
                            position: 'relative',
                        }}
                    >
                        <Plane />
                    </Box>
                }
            />
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
