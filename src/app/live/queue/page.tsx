"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    Add,
    ArrowDownward,
    ArrowUpward,
    Delete,
    Edit,
} from "@mui/icons-material";

import { supabase } from "@/utils/supabase/client";

type QueueName = "aeromodelisme" | "airshow" | "presentation";

type TeamTurn = {
    id: number;
    team: string;
    turn: number;
};

type Flight = {
    turn: number;
    teams: TeamTurn[];
};

const ACCESS_CODE = process.env.NEXT_PUBLIC_QUEUE_MANAGEMENT_ACCESS_CODE!;

const QUEUES: { value: QueueName; label: string }[] = [
    { value: "aeromodelisme", label: "Aeromodeslime" },
    { value: "airshow", label: "Airshow" },
    { value: "presentation", label: "Presentation" },
];

export default function QueueManager() {
    const [authenticated, setAuthenticated] = useState(false);
    const [accessCode, setAccessCode] = useState("");

    const [selectedQueue, setSelectedQueue] =
        useState<QueueName>("aeromodelisme");

    const [items, setItems] = useState<TeamTurn[]>([]);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [targetTurn, setTargetTurn] = useState<number | null>(null);

    const flights = useMemo<Flight[]>(() => {
        const grouped = new Map<number, TeamTurn[]>();

        for (const item of items) {
            const teams = grouped.get(item.turn) ?? [];
            teams.push(item);
            grouped.set(item.turn, teams);
        }

        return Array.from(grouped.entries())
            .map(([turn, teams]) => ({ turn, teams }))
            .sort((a, b) => a.turn - b.turn);
    }, [items]);

    const fetchQueue = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from(selectedQueue)
            .select("id, team, turn")
            .order("turn")
            .order("id");

        if (error) {
            setError(error.message);
        } else {
            setItems(data ?? []);
        }

        setLoading(false);
    }, [selectedQueue]);

    // Fetch and subscribe to the currently selected table.
    useEffect(() => {
        fetchQueue();

        const channel = supabase
            .channel(`queue-manager:${selectedQueue}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: selectedQueue,
                },
                () => fetchQueue()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedQueue, fetchQueue]);

    const mutate = async (operation: () => Promise<void>) => {
        setBusy(true);
        setError(null);

        try {
            await operation();
            await fetchQueue();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred."
            );
        } finally {
            setBusy(false);
        }
    };

    const openAddTeam = (turn: number | null) => {
        setTeamName("");
        setEditingId(null);
        setTargetTurn(turn);
        setDialogOpen(true);
    };

    const openEditTeam = (team: TeamTurn) => {
        setTeamName(team.team);
        setEditingId(team.id);
        setTargetTurn(team.turn);
        setDialogOpen(true);
    };

    const saveTeam = async () => {
        const name = teamName.trim();
        if (!name) return;

        await mutate(async () => {
            if (editingId !== null) {
                const { error } = await supabase
                    .from(selectedQueue)
                    .update({ team: name })
                    .eq("id", editingId);

                if (error) throw error;
                return;
            }

            let turn = targetTurn;

            if (turn === null) {
                turn =
                    flights.reduce(
                        (max, flight) => Math.max(max, flight.turn),
                        0
                    ) + 1;
            }

            const { error } = await supabase
                .from(selectedQueue)
                .insert({ team: name, turn });

            if (error) throw error;
        });

        setDialogOpen(false);
    };

    const removeTeam = async (id: number) => {
        if (!window.confirm("Remove this team?")) return;

        await mutate(async () => {
            const { error } = await supabase
                .from(selectedQueue)
                .delete()
                .eq("id", id);

            if (error) throw error;
        });
    };

    const removeFlight = async (turn: number) => {
        if (!window.confirm("Remove this entire flight and all its teams?")) {
            return;
        }

        await mutate(async () => {
            const { error } = await supabase
                .from(selectedQueue)
                .delete()
                .eq("turn", turn);

            if (error) throw error;
        });
    };

    // Circular flight reordering.
    const moveFlight = async (index: number, direction: -1 | 1) => {
        if (flights.length < 2) return;

        await mutate(async () => {
            const reordered = [...flights];
            const [flight] = reordered.splice(index, 1);

            const targetIndex =
                (index + direction + flights.length) % flights.length;

            reordered.splice(targetIndex, 0, flight);

            const positions = flights.map((item) => item.turn);
            const temporaryBase =
                Math.max(...positions) + flights.length + 1;

            const temporaryTurns = new Map(
                flights.map((item, i) => [
                    item.turn,
                    temporaryBase + i,
                ])
            );

            // First move every flight to a temporary turn.
            const temporaryUpdates = await Promise.all(
                flights.map((item) =>
                    supabase
                        .from(selectedQueue)
                        .update({ turn: temporaryTurns.get(item.turn)! })
                        .eq("turn", item.turn)
                )
            );

            const temporaryError = temporaryUpdates.find(
                (result) => result.error
            )?.error;

            if (temporaryError) throw temporaryError;

            // Then assign the final positions.
            const finalUpdates = await Promise.all(
                reordered.map((item, i) =>
                    supabase
                        .from(selectedQueue)
                        .update({ turn: positions[i] })
                        .eq("turn", temporaryTurns.get(item.turn)!)
                )
            );

            const finalError = finalUpdates.find(
                (result) => result.error
            )?.error;

            if (finalError) throw finalError;
        });
    };

    const login = () => {
        if (accessCode === ACCESS_CODE) {
            setAuthenticated(true);
            setAccessCode("");
        } else {
            setError("Invalid access code.");
        }
    };

    if (!authenticated) {
        return (
            <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h5" fontWeight={600}>
                        Queue Manager
                    </Typography>

                    <TextField
                        label="Access code"
                        type="password"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") login();
                        }}
                        fullWidth
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button variant="contained" onClick={login}>
                        Login
                    </Button>
                </Stack>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
            <Stack spacing={3}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h4" fontWeight={700}>
                        Queue Manager
                    </Typography>

                    <Button
                        color="inherit"
                        onClick={() => setAuthenticated(false)}
                    >
                        Logout
                    </Button>
                </Stack>

                <FormControl fullWidth>
                    <InputLabel>Queue</InputLabel>
                    <Select
                        value={selectedQueue}
                        label="Queue"
                        onChange={(e) =>
                            setSelectedQueue(e.target.value as QueueName)
                        }
                        disabled={busy}
                    >
                        {QUEUES.map((queue) => (
                            <MenuItem
                                key={queue.value}
                                value={queue.value}
                            >
                                {queue.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {error && (
                    <Alert
                        severity="error"
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Alert>
                )}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6">
                        Flights ({flights.length})
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => openAddTeam(null)}
                        disabled={busy}
                    >
                        Add flight
                    </Button>
                </Stack>

                {loading ? (
                    <Box display="flex" justifyContent="center" p={5}>
                        <CircularProgress />
                    </Box>
                ) : flights.length === 0 ? (
                    <Alert severity="info">
                        This queue is empty. Add a flight to get started.
                    </Alert>
                ) : (
                    <Stack spacing={2}>
                        {flights.map((flight, index) => (
                            <Card key={flight.turn} variant="outlined">
                                <CardHeader
                                    title={`Flight ${index + 1}`}
                                    subheader={`${flight.teams.length} team(s)`}
                                    action={
                                        <Stack direction="row" spacing={0.5}>
                                            <Tooltip title="Move up">
                                                <span>
                                                    <IconButton
                                                        onClick={() =>
                                                            moveFlight(index, -1)
                                                        }
                                                        disabled={busy}
                                                        size="small"
                                                    >
                                                        <ArrowUpward />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>

                                            <Tooltip title="Move down">
                                                <span>
                                                    <IconButton
                                                        onClick={() =>
                                                            moveFlight(index, 1)
                                                        }
                                                        disabled={busy}
                                                        size="small"
                                                    >
                                                        <ArrowDownward />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>

                                            <Tooltip title="Delete flight">
                                                <span>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            removeFlight(flight.turn)
                                                        }
                                                        disabled={busy}
                                                        size="small"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </Stack>
                                    }
                                />

                                <Divider />

                                <CardContent>
                                    <Stack spacing={1}>
                                        {flight.teams.map((team) => (
                                            <Stack
                                                key={team.id}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Typography>
                                                    {team.team}
                                                </Typography>

                                                <Stack direction="row">
                                                    <Tooltip title="Edit team">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                openEditTeam(team)
                                                            }
                                                            disabled={busy}
                                                        >
                                                            <Edit fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Remove team">
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                removeTeam(team.id)
                                                            }
                                                            disabled={busy}
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </Stack>
                                        ))}

                                        <Button
                                            startIcon={<Add />}
                                            onClick={() =>
                                                openAddTeam(flight.turn)
                                            }
                                            disabled={busy}
                                            sx={{
                                                alignSelf: "flex-start",
                                                mt: 1,
                                            }}
                                        >
                                            Add team
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}

                {busy && (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress size={24} />
                    </Box>
                )}
            </Stack>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>
                    {editingId !== null
                        ? "Edit team"
                        : targetTurn === null
                            ? "Add flight"
                            : "Add team"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") saveTeam();
                        }}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={saveTeam}
                        disabled={!teamName.trim() || busy}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
