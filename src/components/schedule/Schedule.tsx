"use client"

import Title from '../text/Title' 
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { EventContentArg } from '@fullcalendar/core'
import { fevrier1, fevrier2, janvier26 } from '@/content/schedule'
import { Box, Stack, Typography, useTheme, useMediaQuery, Card, CardContent, Chip, Divider } from '@mui/material'

export function Schedule() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const weekendData = [
        {
            title: "Premier Weekend: 26-27 Janvier",
            dates: [
                { date: "2026-01-26", events: janvier26, label: "Samedi 26", slotMinTime: "08:00", slotMaxTime: "24:00" },
                { date: "2026-01-27", events: janvier26, label: "Dimanche 27", slotMinTime: "08:00", slotMaxTime: "10:00" }
            ]
        },
        {
            title: "Deuxième Weekend: 01-02 Février",
            dates: [
                { date: "2026-02-01", events: fevrier1, label: "Samedi 01", slotMinTime: "13:00", slotMaxTime: "18:00" },
                { date: "2026-02-02", events: fevrier2, label: "Dimanche 02", slotMinTime: "08:00", slotMaxTime: "18:00" }
            ]
        }
    ]

    return (
        <Stack gap={4}>
            <Title label='Schedule' />
            
            <Stack gap={6}>
                {weekendData.map((weekend, weekendIndex) => (
                    <Card 
                        key={weekendIndex}
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <CardContent>
                            <Stack gap={4}>
                                <Box sx={{ textAlign: 'center', pt: 4}}>
                                    <Stack direction="row" alignItems="center" justifyContent="center" gap={1} mb={1}>
                                        <CalendarMonth />
                                        <Typography variant={"h5"}>
                                            {weekend.title}
                                        </Typography>
                                    </Stack>

                                    <Typography>
                                        {weekendIndex == 0? <>Challenge Aéromodélisme</> : <>Airshow - Formations solidworks surfaciques<br></br>Challenge Aéromodélisme Junior - Expositions aéronautiques et aérospaciales</>}
                                    </Typography>
                                </Box>

                                <Divider />

                                <Stack
                                    gap={isMobile ? 4 : 3}
                                    justifyContent="center"
                                    direction={isMobile ? 'column' : 'row'}
                                    alignItems={isMobile ? 'center' : 'flex-start'}
                                >
                                    {weekend.dates.map((day, dayIndex) => (
                                        <Box 
                                            key={dayIndex}
                                            sx={{ 
                                                width: isMobile ? '100%' : '48%',
                                                maxWidth: isMobile ? '600px' : '500px'
                                            }}
                                        >
                                            <Box sx={{ mb: 2, textAlign: 'center' }}>
                                                <Chip
                                                    label={day.label}
                                                    variant="outlined"
                                                    sx={{
                                                        px: 2,
                                                        py: 0.5,
                                                        border: 'none',
                                                        color: 'white',
                                                        fontSize: '1rem',
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.primary.main,
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.primary.dark,
                                                        }
                                                    }}
                                                />
                                            </Box>

                                            <Box 
                                                sx={{
                                                    '& .fc': {
                                                        fontFamily: theme.typography.fontFamily,
                                                    },
                                                    '& .fc-timegrid-slot': {
                                                        height: '40px !important',
                                                        borderColor: theme.palette.divider,
                                                    },
                                                    '& .fc-timegrid-slot-label': {
                                                        fontSize: '0.875rem',
                                                        color: theme.palette.text.secondary,
                                                        fontWeight: 500,
                                                    },
                                                    '& .fc-event': {
                                                        borderRadius: '8px !important',
                                                        border: 'none !important',
                                                        padding: '4px 8px !important',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1) !important',
                                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}) !important`,
                                                    },
                                                    '& .fc-event-title': {
                                                        fontSize: '0.875rem !important',
                                                        fontWeight: '500 !important',
                                                    },
                                                    '& .fc-timegrid-axis': {
                                                        width: '60px !important',
                                                    },
                                                    '& .fc-col-header': {
                                                        display: 'none !important', // Hide day header since we have custom chips
                                                    },
                                                    '& .fc-scrollgrid': {
                                                        border: `1px solid ${theme.palette.divider} !important`,
                                                        borderRadius: '12px !important',
                                                        overflow: 'hidden !important',
                                                    },
                                                    '& .fc-scrollgrid-section-header': {
                                                        display: 'none !important',
                                                    }
                                                }}
                                            >
                                                <FullCalendar
                                                    height="auto"
                                                    expandRows={true}
                                                    events={day.events}
                                                    slotDuration="00:30"
                                                    slotMinTime={day.slotMinTime}
                                                    headerToolbar={false}
                                                    initialDate={day.date}
                                                    initialView="timeGridDay"
                                                    slotLabelInterval="01:00"
                                                    plugins={[timeGridPlugin]}
                                                    eventContent={renderEventContent}
                                                    dayHeaderFormat={{ weekday: 'long', day: 'numeric' }}
                                                    slotMaxTime={day.slotMaxTime}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Stack>
    )
}

function renderEventContent(eventInfo: EventContentArg) {
    const Icon = getIcon(eventInfo.event.extendedProps.icon);

    return (
        <Box
            sx={{
                p: 0.5,
                borderRadius: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '32px'
            }}
        >
            <Stack direction="row" alignItems="center" gap={0.5} mb={0.5}>
                <Icon sx={{ fontSize: 18, opacity: 0.8 }} />
                <Typography 
                    variant="caption" 
                    sx={{ 
                        lineHeight: 1,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                    }}
                >
                    {eventInfo.timeText}
                </Typography>
            </Stack>
            <Typography variant='subtitle2' fontWeight={'bold'}>
                {eventInfo.event.title}
            </Typography>
            <Typography variant="body2">
                {eventInfo.event.extendedProps.description}
            </Typography>
        </Box>
    )
}

import {
    Star,
    FlightTakeoff,
    Restaurant,
    EmojiEvents,
    Work,
    FreeBreakfast,
    PresentToAll,
    CheckCircle,
    DinnerDining,
    TheaterComedy,
    MusicNote,
    ExitToApp,
    CalendarMonth,
} from "@mui/icons-material";

type IconName =
    | "check-in"
    | "plane"
    | "lunch"
    | "challenge"
    | "dinner"
    | "work"
    | "breakfast"
    | "presentation"
    | "theater"
    | "music"
    | "exit";

const iconMap: Record<IconName, typeof Star> = {
    "check-in": CheckCircle,
    plane: FlightTakeoff,
    lunch: Restaurant,
    challenge: EmojiEvents,
    dinner: DinnerDining,
    work: Work,
    breakfast: FreeBreakfast,
    presentation: PresentToAll,
    theater: TheaterComedy,
    music: MusicNote,
    exit: ExitToApp,
};

export function getIcon(label?: string) {
    return iconMap[label as IconName] || Star;
}