"use client";

import Image from 'next/image';
import { event } from "@/content/event";
import { Box } from "@mui/material";

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
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: 'action.hover',
                }}
            >
                <a href={sponsor.website} target='_blank'>
                    <Image
                        fill
                        alt={sponsor.name}
                        src={sponsor.logo}
                        style={{ objectFit: 'cover' }}
                    />
                </a>
            </Box>
        ))}
        </Box>
    );
}
