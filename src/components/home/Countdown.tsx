"use client"

import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box, useTheme } from '@mui/material';
import { ColorFormat, ColorHex, CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimeParts {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const getTimeParts = (endTime: number): TimeParts => {
    const totalSeconds = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
};

interface TimeUnitProps {
    value: number;
    label: string;
    duration: number;
    initialRemainingTime: number;
    colors: ColorFormat;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, duration, colors, initialRemainingTime }) => {
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center', mx: { xs: 1, sm: 2 } }}>
            <CountdownCircleTimer
                size={useTheme().breakpoints.values.sm > window.innerWidth ? 58 : 90}
                isPlaying
                strokeWidth={2}
                colors={colors}
                duration={duration}
                initialRemainingTime={initialRemainingTime}
                onComplete={() => ({ shouldRepeat: true, delay: 0 })}
                trailColor={theme.palette.mode === 'light' ? '#e0e0e0' : '#000000'}
            >
                {() => (
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '1.1rem' },
                        }}
                    >
                        {value.toString().padStart(2, '0')}
                    </Typography>
                )}
            </CountdownCircleTimer>
            <Typography
                variant="caption"
                sx={{
                    mt: 1,
                    display: 'block',
                    fontWeight: 500,
                    color: 'text.secondary',
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

export const Countdown: React.FC = () => {
    const theme = useTheme();
    const [timeParts, setTimeParts] = useState<TimeParts>(getTimeParts(new Date(2026, 1, 2).getTime()));

    useEffect(() => {
        const updateTimer = () => {
            const targetDate = new Date(2026, 1, 2);
            setTimeParts(getTimeParts(targetDate.getTime()));
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 1, sm: 2 }}
            sx={{
                borderRadius: 3,
                p: { xs: 2, sm: 4 },
                gap: { xs: 2, sm: 0 },
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                background:
                    theme.palette.mode === "light"
                        ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            }}
        >
            <TimeUnit
                label="Days"
                value={timeParts.days}
                duration={365 * 24 * 60 * 60}
                colors={theme.palette.secondary.main as ColorHex}
                initialRemainingTime={timeParts.days * 24 * 3600 + timeParts.hours * 3600 + timeParts.minutes * 60 + timeParts.seconds}
            />
            <TimeUnit
                label="Hours"
                value={timeParts.hours}
                duration={24 * 60 * 60}
                colors={theme.palette.secondary.main as ColorHex}
                initialRemainingTime={timeParts.hours * 3600 + timeParts.minutes * 60 + timeParts.seconds}
            />
            <TimeUnit
                label="Minutes"
                value={timeParts.minutes}
                duration={60 * 60}
                colors={theme.palette.secondary.main as ColorHex}
                initialRemainingTime={timeParts.minutes * 60 + timeParts.seconds}
            />
            <TimeUnit
                label="Seconds"
                value={timeParts.seconds}
                duration={60}
                colors={theme.palette.secondary.main as ColorHex}
                initialRemainingTime={timeParts.seconds}
            />
        </Stack>
    );
};