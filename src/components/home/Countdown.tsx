"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Stack, Typography, Box, useTheme, Alert } from '@mui/material';
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
    label?: string;
    duration: number;
    initialRemainingTime: number;
    colors: ColorFormat;
    className?: string; // optional className for styling
}

const TimeUnit: React.FC<TimeUnitProps> = ({
    value,
    label,
    duration,
    colors,
    initialRemainingTime,
    className
}) => {
    const theme = useTheme();

    // Use custom className for size if provided, otherwise old default sizing
    const size = className
        ? undefined // size can now be controlled by CSS via className
        : window.innerWidth < theme.breakpoints.values.xs
        ? 40
        : window.innerWidth < theme.breakpoints.values.sm
        ? 58
        : 90;

    const fontSize = className
        ? undefined
        : {
              xs: '0.7rem',
              sm: '0.8rem',
              md: '1.1rem',
          };

    return (
        <Box
            sx={{ textAlign: 'center', mx: { xs: 1, sm: 2 } }}
            className={className}
        >
            <CountdownCircleTimer
                size={size as number | undefined}
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
                            fontSize,
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
    const targetDate = useMemo(() => new Date(2026, 1, 1), []);
    const [timeParts, setTimeParts] = useState<TimeParts>(getTimeParts(targetDate.getTime()));

    useEffect(() => {
        const updateTimer = () => {
            setTimeParts(getTimeParts(targetDate.getTime()));
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 1, sm: 2 }}
            sx={{
                borderRadius: 3,
                border: "1px solid",
                p: { xs: 2, sm: 4 },
                gap: { xs: 2, sm: 0 },
                borderColor: "divider",
            }}
        >
            <TimeUnit
                label="Days"
                value={timeParts.days}
                duration={365 * 24 * 60 * 60}
                colors={theme.palette.primary.main as ColorHex}
                initialRemainingTime={timeParts.days * 24 * 3600 + timeParts.hours * 3600 + timeParts.minutes * 60 + timeParts.seconds}
            />
            <TimeUnit
                label="Hours"
                value={timeParts.hours}
                duration={24 * 60 * 60}
                colors={theme.palette.primary.main as ColorHex}
                initialRemainingTime={timeParts.hours * 3600 + timeParts.minutes * 60 + timeParts.seconds}
            />
            <TimeUnit
                label="Minutes"
                value={timeParts.minutes}
                duration={60 * 60}
                colors={theme.palette.primary.main as ColorHex}
                initialRemainingTime={timeParts.minutes * 60 + timeParts.seconds}
            />
            <TimeUnit
                label="Seconds"
                value={timeParts.seconds}
                duration={60}
                colors={theme.palette.primary.main as ColorHex}
                initialRemainingTime={timeParts.seconds}
            />
        </Stack>
    );
};

interface CountdownHMSProps {
    hours: number;
    minutes: number;
    seconds: number;
    endMessage: string;
}

const TimeUnitNew: React.FC<TimeUnitProps> = ({
    value,
    // label,
    duration,
    colors,
    initialRemainingTime,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{ textAlign: 'center', mx: { xs: 1, sm: 2 } }}
            className={'w-80 h-80'}
        >
            <CountdownCircleTimer
                size={320}
                isPlaying
                strokeWidth={5}
                colors={colors}
                duration={duration}
                initialRemainingTime={initialRemainingTime}
                onComplete={() => ({ shouldRepeat: true, delay: 0 })}
                trailColor={theme.palette.mode === 'light' ? '#e0e0e0' : '#000000'}
            >
                {() => (
                    <Typography
                        // variant="h1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '8rem',
                            // color: theme.palette.primary.dark
                        }}
                    >
                        {value.toString().padStart(2, '0')}
                    </Typography>
                )}
            </CountdownCircleTimer>
            {/* <Typography
                // variant="caption"
                sx={{
                    mt: 1,
                    display: 'block',
                    fontWeight: 500,
                    fontSize: '2rem',
                    color: 'text.secondary',
                }}
            >
                {label}
            </Typography> */}
        </Box>
    );
};

export const CountdownHMS: React.FC<CountdownHMSProps> = ({
    hours,
    minutes,
    seconds,
    endMessage,
}) => {
    const theme = useTheme();

    const initialTotalSeconds = useMemo(
        () => Math.max(0, hours * 3600 + minutes * 60 + seconds),
        [hours, minutes, seconds]
    );

    const [remaining, setRemaining] = useState(initialTotalSeconds);

    useEffect(() => {
        if (remaining <= 0) return;

        const interval = setInterval(() => {
            setRemaining((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [remaining]);

    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // background: "#E3F2FD",
                background: "linear-gradient(45deg, rgba(200, 200, 200, 1) 0%, rgba(250, 247, 240, 1) 30%, rgba(250, 247, 240, 1) 100%)"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1400px",
                    px: { xs: 2, md: 6 },
                    display:'flex',
                    justifyContent: 'center'
                }}
            >
                {remaining === 0 ? (
                    <Alert
                    severity="error"
                    sx={{
                        py: 4,
                        px: 6,
                        borderRadius: 4,
                        textAlign: "center",
                        fontWeight: 600,
                        width: 700,
                        fontSize: "5rem", // affects text
                        "& .MuiAlert-icon": {
                            fontSize: "8rem", // makes the icon match text size
                        },
                    }}
                >
                    {endMessage}
                </Alert>
                ) : (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 2, md: 6 }}
                        sx={{
                            p: { xs: 3, md: 6 },
                            borderRadius: 6,
                            border: "1px solid",
                            borderColor: "divider",
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(255,255,255,0.02)",
                        }}
                    >
                        <TimeUnitNew
                            value={h}
                            duration={24 * 60 * 60}
                            colors={theme.palette.primary.main as ColorHex}
                            initialRemainingTime={remaining}
                        />

                        <TimeUnitNew
                            value={m}
                            duration={60 * 60}
                            colors={theme.palette.primary.main as ColorHex}
                            initialRemainingTime={remaining % 3600}
                        />

                        <TimeUnitNew
                            value={s}
                            duration={60}
                            colors={theme.palette.primary.main as ColorHex}
                            initialRemainingTime={s}
                        />
                    </Stack>
                )}
            </Box>
        </Box>
    );
};
