"use client"

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { event } from '@/content/event';
import useThreeD from '@/hooks/useThreeD';
import Plane from '@/components/scenes/Plane';
import { useTheme } from '@mui/material/styles';
import { Paragraph } from '@/components/text/Paragraph';
import { Box, Typography, Chip, Button, Stack } from '@mui/material';

const Hero: React.FC = () => {
    const theme = useTheme();   
    const threeD = useThreeD();

    const chipRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => { 
        animate({ chipRef, titleRef, subtitleRef, descriptionRef, buttonsRef });
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
            justifyContent={threeD.active ? "space-between" : "start"}
        >
            <Stack
                gap={3}
                ref={containerRef}
                alignItems={'start'}
                justifyContent={'center'}
            >
                <Chip
                    ref={chipRef}
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
            
                <Box ref={titleRef} className='animated'>
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
                        ref={subtitleRef}
                        variant="subtitle1"
                        className='animated'
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

                <Stack 
                    gap={2}
                    ref={buttonsRef} 
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
            
            {threeD.active &&
                <>
                    <Box 
                        sx={{ 
                            width: 360,
                            height: 360,
                            position: 'relative',
                            display: { xs: 'none', sm: 'block' } 
                        }}
                    >
                        <Plane variant='desktop' />
                    </Box>
                    <Box 
                        sx={{ 
                            width: 360,
                            height: 360,
                            position: 'relative',
                            display: { xs: 'block', sm: 'none' } 
                        }}
                    >
                        <Plane variant='mobile' />
                    </Box>
                </>
            }
        </Stack>
    );
};

export default Hero;

function animate({
    chipRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    buttonsRef,
}: {
    chipRef: React.RefObject<HTMLDivElement | null>
    titleRef: React.RefObject<HTMLDivElement | null>
    subtitleRef: React.RefObject<HTMLSpanElement | null>
    descriptionRef: React.RefObject<HTMLDivElement | null>
    buttonsRef: React.RefObject<HTMLDivElement | null>
}) {
    if (
        !chipRef.current ||
        !titleRef.current ||
        !buttonsRef.current ||
        !subtitleRef.current ||
        !descriptionRef.current
    ) return;

    const onLoad = gsap.timeline();
    onLoad
        .from(chipRef.current, {
            autoAlpha: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        })
        .from(titleRef.current, {
            autoAlpha: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out"
        }, "-=0.8")
        .from(subtitleRef.current, {
            autoAlpha: 0,
            y: 35,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.7")
        .from(descriptionRef.current, {
            autoAlpha: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.6")
        .from(buttonsRef.current, {
            autoAlpha: 0,
            y: 25,
            scale: 0.8,
            duration: 0.9,
            ease: "power3.out"
        }, "-=0.4");
}