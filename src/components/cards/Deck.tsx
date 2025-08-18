"use client"

import React, { useRef } from "react";
import { Container, Typography } from "@mui/material";
import { useStaggeredList } from "@/hooks/animations/useStaggeredList";
import { useSlideInLeft } from "@/hooks/animations/useSlideInLeft";

interface DeckProps<T> {
    title: string;
    data: T[];
    CardComponent: React.ComponentType<{ item: T }>;
}

export function Deck<T>({ title, data, CardComponent }: DeckProps<T>) {
    const container = useRef<HTMLDivElement>(null);
    
    useSlideInLeft({ container });
    useStaggeredList({
        container,
        stagger: { grid: "auto", from: "start", axis: "y", amount: 0.2 }
    });

    return (
        <Container ref={container} id={title} sx={{ m: 0, p:0 }}>
            <div className="slide-in-left">
                <Typography variant="h2">
                    {title}
                </Typography>
            </div>

            <Container sx={{ 
                p: 4,
                gap: 4, 
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: "space-around",
            }}>
                {data.map((member, index) => {
                    return (
                        <div className="stagger" key={index}>
                            <CardComponent item={member} />
                        </div>
                    );
                })}
            </Container>
        </Container>
    );
}
