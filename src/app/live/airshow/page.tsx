"use client";

import {
    Stack,
    Card,
    CardContent,
    Typography,
    Chip,
    Divider,
} from "@mui/material";
import { useMemo } from "react";
import { useTableSync } from "@/hooks/useTableSync";
import { supabase } from "@/utils/supabase/client";

interface TeamTurn {
    id: number;
    team: string;
    turn: number;
}

const LiveAeromodelismePage = () => {
    const {
        data: teamTurns,
        isPending,
        isError,
        error,
    } = useTableSync<TeamTurn>({
        queryKey: ["team-turns"],
        fetcher: async () => {
            const { data, error } = await supabase
                .from("aeromodelisme")
                .select("*");

            if (error) {
                console.error(error);
                return [];
            }
            return data;
        },
        subscribe: (onChange) => {
            const channel = supabase.channel(
                "db-events:public:aeromodelisme"
            );

            channel.on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "aeromodelisme",
                },
                onChange
            );

            channel.subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        },
    });

    /**
     * ✅ Single derived source of truth
     */
    const {
        nextTeam,
        onDeckTeam,
        remainingTeams,
    } = useMemo(() => {
        const sorted = [...(teamTurns ?? [])].sort(
            (a, b) => a.turn - b.turn
        );

        return {
            nextTeam: sorted[0] ?? null,
            onDeckTeam: sorted[1] ?? null,
            remainingTeams: sorted.slice(2),
        };
    }, [teamTurns]);

    if (isPending) {
        return (
            <Typography variant="h5" textAlign="center">
                Loading team data…
            </Typography>
        );
    }

    if (isError) {
        return (
            <Typography color="error" textAlign="center">
                {String(error)}
            </Typography>
        );
    }

    return (
        <Stack spacing={4} sx={{ p: 4 }}>
            {/* Title */}
            <Stack spacing={1} textAlign="center">
                <Typography variant="h3" fontWeight={700}>
                    Aeromodelisme Team Queue
                </Typography>
                <Typography variant="h4" color="text.secondary">
                    Live competition order
                </Typography>
            </Stack>

            <Divider />

            {/* NEXT TEAM */}
            {nextTeam && (
                <Card
                    elevation={6}
                    sx={{
                        borderRadius: 3,
                        border: "2px solid",
                        borderColor: "success.main",
                    }}
                >
                    <CardContent>
                        <Stack spacing={1}>
                            <Chip
                                label="NEXT"
                                color="success"
                                sx={{ fontWeight: 700, width: "fit-content" }}
                            />
                            <Typography variant="h4" fontWeight={700}>
                                {nextTeam.team}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {/* ON DECK TEAM */}
            {onDeckTeam && (
                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 3,
                        border: "2px dashed",
                        borderColor: "warning.main",
                    }}
                >
                    <CardContent>
                        <Stack spacing={1}>
                            <Chip
                                label="ON DECK"
                                color="warning"
                                sx={{ fontWeight: 700, width: "fit-content" }}
                            />
                            <Typography variant="h5" fontWeight={600}>
                                {onDeckTeam.team}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Divider />

            {/* REMAINING QUEUE */}
            <Stack spacing={2}>
                {remainingTeams.map((tp) => (
                    <Card
                        key={tp.id}
                        elevation={2}
                        sx={{ borderRadius: 3 }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Typography variant="h6" fontWeight={600}>
                                    {tp.team}
                                </Typography>

                                <Chip
                                    label={`Turn ${tp.turn}`}
                                    color="primary"
                                    sx={{ fontWeight: 600 }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
};

export default LiveAeromodelismePage;
