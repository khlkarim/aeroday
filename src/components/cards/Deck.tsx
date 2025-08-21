"use client"

import gsap from "gsap";
import Title from "../text/Title";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@mui/material";

interface DeckProps<T> {
    title: string;
    data: T[];
    CardComponent: React.ComponentType<{ item: T }>;
}

export function Deck<T>({ title, data, CardComponent }: DeckProps<T>) {
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if(!containerRef.current || !cardsRef.current || !titleRef.current) return;

        const onScrollIn = gsap.timeline();

        onScrollIn.from(
            titleRef.current,
            {
                x: -80, 
                autoAlpha: 0,
                scrollTrigger: {
                    scrub: 1,
                    end: "top 40%",
                    start: "top 90%",
                    trigger: containerRef.current,
                },
            }
        );

    }, { scope: containerRef });

    return (
        <Container 
            id={title}
            ref={containerRef} 
            sx={{ 
                gap: 6,
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
                
            }}
        >
            <Title label={title} />

            <Container 
                ref={cardsRef}
                sx={{
                    gap: 4,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                }}
            >
                {data.map((member, index) => {
                    return (
                        <div 
                            key={index}
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            <CardComponent item={member} />
                        </div>
                    );
                })}
            </Container>
        </Container>
    );
}
