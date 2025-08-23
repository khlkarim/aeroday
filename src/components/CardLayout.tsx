"use client"

import gsap from "gsap";
import Title from "./text/Title";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Stack } from "@mui/material";

interface CardLayoutProps<T> {
    data: T[]; 
    title: string;
    CardComponent: React.ComponentType<{ item: T }>;
}

export function CardLayout<T>({ title, data, CardComponent }: CardLayoutProps<T>) {
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animate({ cardsRef });
    }, { dependencies: [data], scope: cardsRef });

    return (
        <Stack id={title} gap={6}>
            <Title label={title} />

            <Stack 
                ref={cardsRef} 
                gap={4}
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

function animate({ cardsRef }: { cardsRef: React.RefObject<HTMLDivElement | null> })
{
    if (!cardsRef.current) return;

    const cards = Array.from(cardsRef.current.children);
    cards.forEach((card) => {
        gsap.from(card, {
            y: 80,
            scale: 1,
            autoAlpha: 0,
            ease: "power2.out",
            scrollTrigger: {
                scrub: true,
                trigger: card,
                end: "top center",
                start: "top bottom",
            }
        });
    });
}