"use client";

import { Stack, Link } from "@mui/material";
import { event } from "@/content/event";

export default function Sponsors() {
    const sponsors = event.sponsors;

    return (
        <Stack
            gap={6}
            flexWrap={'wrap'}
            flexDirection={'row'}
            justifyContent={'space-around'}
        >
        {sponsors.map((sponsor, index) => (
            <Link
                key={index}
                variant="h5"
                target="_blank"
                underline='none'
                href={sponsor.website}
                color="text.secondary"
            >
                {sponsor.name}
            </Link>
        ))}
        </Stack>
    );
}
