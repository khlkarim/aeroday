"use client";

import gsap from "gsap";
import React from "react";
import { event } from "../../content/event";
import { Paragraph } from "../text/Paragraph";
import { Highlight } from "../text/Highlight";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button, Box, Typography, Chip, useTheme } from "@mui/material";

gsap.registerPlugin(ScrollToPlugin);

const Hero: React.FC = () => {
    const theme = useTheme();

    const handleScroll = (target: string) => {
        gsap.to(window, {
            duration: 1,
            ease: "power2.inOut",
            scrollTo: {
                y: target, 
                offsetY: 80,
            },
        });
    };

    return (
        <Box className="flex flex-col items-start justify-center gap-6">
            <Chip
                color="success"
                variant="outlined"
                label={"📅 " + event.subtitle}
                sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    fontSize: "1rem",
                }}
            />

            <Box>
                <Typography variant="h2">
                    {event.name + " "}
                    <Highlight>{event.date.year}</Highlight>
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary }}
                >
                    {event.edition}
                </Typography>
            </Box>

            <Paragraph>{event.description.primary}</Paragraph>

            <Box className="flex gap-4">
                <Button variant="contained" onClick={() => handleScroll("#Axes")}>
                    Axes
                </Button>
                <Button variant="outlined" onClick={() => handleScroll("#Challenges")}>
                    Challenges
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;
