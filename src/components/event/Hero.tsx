"use client"

import React from "react";
import { event } from "../../content/event";
import { Button, Box, Typography, Chip, useTheme } from "@mui/material";
import { Paragraph } from "../text/Paragraph";
import { Highlight } from "../text/Highlight";

const Hero: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            className="flex flex-col items-start justify-center gap-6"
        >
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

            <Typography variant="h2">
                {event.name + " "}
                <Highlight>
                    {event.date.year}   
                </Highlight>
            </Typography>
            
            <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.text.secondary }}
            >
                {event.edition}
            </Typography>

            <Paragraph>
                {event.description.primary}
            </Paragraph>

            <Box className="flex gap-4">
                <Button variant="contained">Axes</Button>
                <Button variant="outlined">Challenges</Button>
            </Box>
        </Box>
    );
};

export default Hero;
