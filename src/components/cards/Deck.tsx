"use client"

import gsap from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container, Typography } from "@mui/material";

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
            sx={{ m: 0, pt: 10, pb: 10 }}
        >
            <Typography ref={titleRef} className="animated" variant="h3">
                {title}
            </Typography>

            <Container 
                ref={cardsRef}
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
