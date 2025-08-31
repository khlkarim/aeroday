"use client"

import gsap from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Stack } from "@mui/material";
import Title from "@/components/text/Title";
import String from "./deco/String";

interface CardLayoutProps<T> {
    data: T[]; 
    title: string;
    CardComponent: React.ComponentType<{ item: T }>;
}

export function CardLayout<T>({ title, data, CardComponent }: CardLayoutProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(containerRef.current) 
        {
            animate();
        }
    }, { dependencies: [data], scope: containerRef });

    return (
        <Stack id={title} gap={6}>
            <Title label={title} />

            <Stack 
                gap={4}
                ref={containerRef} 
                flexWrap={'wrap'} 
                flexDirection={'row'} 
                justifyContent={'space-around'} 
            >
                {data.map((member, index) => {
                    return (
                        <Box 
                            key={index}
                            className="animated"
                            sx={{ cursor: 'pointer' }}
                        >
                            <CardComponent item={member} />
                        </Box>
                    );
                })}
            </Stack>
        </Stack>
    );
}

export function animate() {
    const elements = gsap.utils.toArray<HTMLElement>(".animated");

    elements.forEach((el) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 40%",
                scrub: 1.2,
            },
            defaults: {
                ease: "power3.out",
                duration: 1,
            },
        });

        tl.from(el, {
            y: 20,
            autoAlpha: 0,
            scale: 0.95,
        });
    });
}

