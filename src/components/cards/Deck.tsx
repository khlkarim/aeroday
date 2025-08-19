"use client"
import React, { useRef } from "react";
import { Container, Typography } from "@mui/material";
import { useAnimation } from "@/hooks/animations/useAnimation";

interface DeckProps<T> {
    title: string;
    data: T[];
    CardComponent: React.ComponentType<{ item: T }>;
}

export function Deck<T>({ title, data, CardComponent }: DeckProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useAnimation(titleRef, {
        preset: 'slideInLeft',
        distance: 80,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            markers: true,
            scrub: true,
            start: "top 100%",
            end: "top 10%"
        },
        trigger: containerRef
    });

    return (
        <Container 
            ref={containerRef} 
            id={title} 
            sx={{ m: 0, p: 0 }}
        >
            <div ref={titleRef} className="deck-title">
                <Typography variant="h3">
                    {title}
                </Typography>
            </div>
            <Container 
                ref={cardsContainerRef}
                className="deck-cards"
                sx={{
                    p: 4,
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
                            className="deck-card"
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
