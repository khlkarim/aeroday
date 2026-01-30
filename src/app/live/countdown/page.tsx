"use client";

import { useSearchParams } from "next/navigation";
import { CountdownHMS } from "@/components/home/Countdown";
import { Box, useTheme } from "@mui/material";

const parseNumber = (value: string | null, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
};

export default function CountdownPage() {
    const searchParams = useSearchParams();
    const theme = useTheme();

    const hours = parseNumber(searchParams.get("hours"));
    const minutes = parseNumber(searchParams.get("minutes"));
    const seconds = parseNumber(searchParams.get("seconds"));

    return (
        <div className="min-h-screen w-full relative" style={{ backgroundColor: theme.palette.background.default }}>
              {/* Dashed Grid */}
              <Box
                className="absolute inset-0 z-0"
                sx={{
                  opacity: theme.palette.mode === 'dark' ? 0.3 : 0.8,
                  backgroundImage: `
                linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
                linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)
              `,
                  backgroundSize: "22px 12px",
                  maskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
                  WebkitMaskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              />
        <CountdownHMS
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            endMessage="Time is up!"
        /></div>
    );
}
