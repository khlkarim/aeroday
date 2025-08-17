import React from "react";
import { Container, Typography } from "@mui/material";

interface DeckProps<T> {
    title: string;
    data: T[];
    CardComponent: React.ComponentType<{ item: T }>;
}

export function Deck<T>({ title, data, CardComponent }: DeckProps<T>) {
    return (
        <Container id={title} sx={{ m: 0, p:0 }}>
            <Typography variant="h2">
                {title}
            </Typography>

            <Container sx={{ 
                p: 4,
                gap: 4, 
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: "space-around",
            }}>
                {data.map((member, index) => {
                    return (
                        <CardComponent 
                            key={index} 
                            item={member} 
                        />
                    );
                })}
            </Container>
        </Container>
    );
}
