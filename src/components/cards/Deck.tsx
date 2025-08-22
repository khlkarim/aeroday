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
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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

    }, { dependencies: [data], scope: cardsRef });

    return (
        <Container 
            id={title}
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
                            className="animated"
                            style={{ cursor: 'pointer' }}
                        >
                            <CardComponent item={member} />
                        </div>
                    );
                })}
            </Container>
        </Container>
    );
}
