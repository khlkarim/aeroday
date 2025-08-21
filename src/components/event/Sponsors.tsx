"use client";

import { event } from "@/content/event";
import { Box, Typography } from "@mui/material";

export default function Sponsors() {
    const sponsors = event.sponsors;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3
            }}
        >
            <Typography variant="h6">
                Brought to you by
            </Typography>

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
                    component="img"
                    key={sponsor.name}
                    src={sponsor.logo}
                    alt={sponsor.name}
                    sx={{
                        borderRadius: 100,
                    }}
                />
            ))}
            </Box>
        </Box>
    );
}
