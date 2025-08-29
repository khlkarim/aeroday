import * as React from "react";
import { days } from "@/content/schedule";
import Title from "@/components/text/Title";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineConnector,
    TimelineContent, TimelineDot, TimelineOppositeContent
} from "@mui/lab";

export interface DayProps 
{ 
    index: number; 
}

export function Day({ index }: DayProps) {
    const day = days[index];

    return (
        <Card 
            elevation={3} 
            sx={{ 
                mb: 2, 
                borderRadius: 3 
            }}
        > 
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 4 }}>
                    <Title label={day.label} />
                </Box>

                <Timeline
                    position="alternate"
                    sx={{
                        "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 },
                    }}
                >
                    {day.schedule.map((period, i) => {
                        const IconComponent = getIcon(period.icon);

                        return (
                            <TimelineItem key={i}>
                                <TimelineOppositeContent>
                                    <Typography variant="body2" fontWeight={500}>
                                        {period.startTime} – {period.endTime}
                                    </Typography>
                                </TimelineOppositeContent>

                                <TimelineSeparator>
                                    <TimelineDot color="primary">
                                        <IconComponent />
                                    </TimelineDot>
                                    {i !== day.schedule.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>

                                <TimelineContent>
                                    <Typography variant="subtitle1" fontWeight={700}>
                                        {period.label}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>
            </CardContent>
        </Card>
    );
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
} from "@mui/icons-material";

type IconName =
  | "check-in"
  | "plane"
  | "lunch"
  | "challenge"
  | "dinner"
  | "work"
  | "breakfast"
  | "presentation";

const iconMap: Record<IconName, typeof Star> = {
  "check-in": CheckCircle,
  plane: FlightTakeoff,
  lunch: Restaurant,
  challenge: EmojiEvents,
  dinner: DinnerDining,
  work: Work,
  breakfast: FreeBreakfast,
  presentation: PresentToAll,
};

export function getIcon(label?: string) {
  return iconMap[label as IconName] || Star;
}