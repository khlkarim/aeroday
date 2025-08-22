"use client";

import { Box } from "@mui/material";
import { event } from "@/content/event";

export default function Sponsors() {
    const sponsors = event.sponsors;

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 2, sm: 4 },
                justifyContent: "space-around",
            }}
        >
        {sponsors.map((sponsor) => (
            <Box
                key={sponsor.name}
                sx={{
                    backgroundColor: 'action.hover',
                }}
            >
                <a href={sponsor.website} target='_blank'>
                    {sponsor.name}
                </a>
            </Box>
        ))}
        </Box>
    );
}
