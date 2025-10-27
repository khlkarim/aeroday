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
                            <Typography textAlign={"justify"}>
                                {event.teaser.description}    
                            </Typography>
                        </Paragraph>
                    </Box>
                </Stack>
            </Box>
            <Box
                sx={{
                    width: { xs: '100%', sm: '100%', md: '80%' },
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                }}
            >
                <iframe
                    title="Facebook video"
                    src="https://www.facebook.com/plugins/video.php?height=302&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1308313737121492%2F&show_text=false&width=560&t=0&autoplay=1&mute=1"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
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
