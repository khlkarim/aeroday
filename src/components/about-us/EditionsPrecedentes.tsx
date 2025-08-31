"use client"

import { gsap } from 'gsap';
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "@/content/event";
import { Box, Stack } from "@mui/material";
import Title from "@/components/text/Title";
import { Paragraph } from "@/components/text/Paragraph";
import { Gallery } from "@/components/about-us/Gallery";
import { SplitText } from 'gsap/SplitText';

export default function EditionsPrecedentes() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(containerRef.current) animate();
    }, { scope: containerRef });

    return (
        <Stack position={"relative"} ref={containerRef} gap={6}>
            <Stack gap={6} alignItems={'center'}>
                <Title label="Editions Précédentes" />
                <Paragraph>
                    <Box className='split'>
                        {event.editionsPrecedentes.description}
                    </Box>
                </Paragraph>
            </Stack>


            <Stack gap={8}>
                {event.editionsPrecedentes.galleries.map((_, index) => {
                    return (
                        <Box key={index}>
                            <Gallery index={index} />
                        </Box>
                    );
                })}
            </Stack>
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
   
    const tl = gsap.timeline();
   
    tl.to(split.words, {
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",  
        stagger: {
            amount: 2,
            from: "start",
        },
    });
}