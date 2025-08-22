"use client";

import { Stack, Link } from "@mui/material";
import { event } from "@/content/event";

export default function Sponsors() {
    const sponsors = event.sponsors;

    return (
        <Stack
            flexWrap={'wrap'}
            flexDirection={'row'}
            justifyContent={'space-around'}
        >
        {sponsors.map((sponsor, index) => (
            <Link
                key={index}
                target="_blank"
                href={sponsor.website}
                underline='none'
                variant="h5"
                color="text.secondary"
            >
                {sponsor.name}
            </Link>
        ))}
        </Stack>
    );
}
