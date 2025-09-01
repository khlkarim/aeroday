"use client";

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { event } from '@/content/event';
import { Box, Stack, Typography } from '@mui/material';
import { SplitText } from 'gsap/SplitText';
import Title from '@/components/text/Title';
import Scene from '@/components/scenes/Teaser';
import { Paragraph } from '@/components/text/Paragraph';
import { SceneContainer } from '../scenes/SceneContainer';

export default function Teaser() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(containerRef.current) animate();
    }, { scope: containerRef });

    return (
        <Stack ref={containerRef} gap={6} alignItems={'center'} position={'relative'}>
            <Box sx={{
                gap: 4,
                width: "100%",
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
            }}>
                <Title label="Teaser" />
                <Stack flexWrap={'wrap'} flexDirection={'row'} gap={6} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                    <SceneContainer 
                        image={
                            <Box></Box>
                        }
                        canvas={
                            <Box 
                                width={240} 
                                height={240}
                                borderRadius={5}
                                border={theme => ({ xs: `1px solid ${theme.palette.divider}`, sm: `1px solid ${theme.palette.divider}`, md: 'none' })}
                                position={'relative'} 
                            >
                                <Scene />
                            </Box>
                        }
                    />
                    <Box className="split">
                        <Paragraph>
                            <Typography textAlign={{ xs: "center", sm: 'center', md: "left" }}>
                                {event.teaser.description}    
                            </Typography>
                        </Paragraph>
                    </Box>
                </Stack>
            </Box>
            <Box width={{xs: '100%', sm: '100%', md: '80%'}}>
                <iframe
                    style={{
                        width: '100%',
                        borderRadius: 12,
                        aspectRatio: '16/9',
                    }}
                    allowFullScreen
                    title="vimeo-player"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src="https://player.vimeo.com/video/1027667756?h=8cdfcae03"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                />
            </Box>
        </Stack>
    );
}

function animate() {
    const split = new SplitText('.split', {
        type: "words",
        wordsClass: "word"
    });
   
    gsap.set(split.words, {
        opacity: 0.2,
    });
   
    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 1.2,
            trigger: '.split',
            start: 'top 85%',
            end: 'bottom 60%',
        },
    });
   
    tl.to(split.words, {
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",  
        stagger: {
            amount: 2,    
            from: "start",
        },
    });
}
