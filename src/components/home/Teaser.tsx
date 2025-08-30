"use client";

import React, { useRef } from 'react';
import { event } from '@/content/event';
import { Box, Stack } from '@mui/material';
import Title from '@/components/text/Title';
import { Paragraph } from '@/components/text/Paragraph';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

export default function Teaser() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(containerRef.current) animate();
    }, { scope: containerRef });

    return (
        <Stack ref={containerRef} gap={6} alignItems={'center'}>
            <Box sx={{
                gap: 4,
                width: "100%",
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
            }}>
                <Title label="Teaser" />
                <Paragraph>
                    <Box className='split'>
                        {event.teaser.description}
                    </Box>
                </Paragraph>
            </Box>
            <Box width={'80%'}>
                <iframe
                    style={{
                        width: '100%',
                        borderRadius: 12,
                        aspectRatio: '16/9',
                    }}
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/1027667756?h=8cdfcae03"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
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
