"use client"

import gsap from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Stack } from "@mui/material";
import Title from "@/components/text/Title";

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

function animate() {
    gsap.utils.toArray<HTMLElement>('.animated').forEach((el) => {
        gsap.from(el, {
            y: 80,
            autoAlpha: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "top center",
                scrub: true,
            },
        });
    });
}
