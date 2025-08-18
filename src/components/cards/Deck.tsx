"use client"
import React, { useRef } from "react";
import { Container, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface DeckProps<T> {
    title: string;
    data: T[];
    CardComponent: React.ComponentType<{ item: T }>;
}

export function Deck<T>({ title, data, CardComponent }: DeckProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const cardsContainer = cardsContainerRef.current;
        const titleElement = titleRef.current;

        if (!container || !cardsContainer || !titleElement) return;

        // Animate title with its own ScrollTrigger
        gsap.set(titleElement, { x: -100, opacity: 0 });
        gsap.to(titleElement, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: titleElement,
                start: "top 90%",
                end: "top 60%",
                scrub: true
            }
        });

        // Animate each card with its own ScrollTrigger
        const cards = cardsContainer.querySelectorAll('.deck-card');
        cards.forEach((card: Element) => {
            gsap.set(card, { y: 60, opacity: 0, scale: 0.8 });
            gsap.to(card, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: true
                }
            });
        });

        // Add hover animations for cards
        const cleanupFunctions: (() => void)[] = [];
        cards.forEach((card: Element) => {
            const handleMouseEnter = () => {
                gsap.to(card, {
                    y: -8,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };
            const handleMouseLeave = () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
            cleanupFunctions.push(() => {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        });

        return () => {
            cleanupFunctions.forEach(cleanup => cleanup());
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, { dependencies: [data], scope: containerRef });

    return (
        <Container 
            ref={containerRef} 
            id={title} 
            sx={{ m: 0, p: 0 }}
        >
            <div ref={titleRef} className="deck-title">
                <Typography variant="h2">
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
