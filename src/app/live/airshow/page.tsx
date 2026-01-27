"use client";

import {
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
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

const LiveAirshowPage = () => {
  const {
    data: teamTurns,
    isPending,
    isError,
    error,
  } = useTableSync<TeamTurn>({
    queryKey: ["team-turns"],
    fetcher: async () => {
      const { data, error } = await supabase
        .from("airshow")
        .select("*");

      if (error) {
        console.error(error);
        return [];
      }
      return data;
    },
    subscribe: (onChange) => {
      const channel = supabase.channel(
        "db-events:public:airshow"
      );

      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "airshow",
        },
        onChange
      );

      channel.subscribe();
      return () => supabase.removeChannel(channel);
    },
  });

  /**
   * Single derived source of truth
   */
  const { nextTeam, onDeckTeam, remainingTeams } = useMemo(() => {
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
        Loading live queue…
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

  if (!teamTurns?.length) {
    return (
      <Typography textAlign="center" color="text.secondary">
        Waiting for teams to join…
      </Typography>
    );
  }

  return (
    <Stack spacing={5} sx={{ p: { xs: 2, sm: 4 } }}>
      {/* Header */}
      <Stack spacing={1} textAlign="center">
        <Typography variant="h3" fontWeight={800}>
          Airshow Live Queue
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Live • Updates automatically
        </Typography>
      </Stack>

      {/* NOW FLYING */}
      {nextTeam && (
        <Card
          elevation={10}
          sx={{
            borderRadius: 4,
            bgcolor: "#8B2635",
            color: "success.contrastText",
            position: { xs: "sticky" },
            top: { xs: 16 },
            zIndex: 10,
          }}
        >
          <CardContent>
            <Stack spacing={1}>
              <Chip
                label="NOW FLYING"
                color="success"
                sx={{ fontWeight: 800, width: "fit-content" }}
              />
              <Typography variant="h3" fontWeight={900}>
                {nextTeam.team}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* ON DECK */}
      {onDeckTeam && (
        <Card
          elevation={4}
          sx={{
            borderRadius: 3,
            bgcolor: "#2D7D75",
          }}
        >
          <CardContent>
            <Stack spacing={0.5}>
              <Chip
                label="ON DECK"
                color="warning"
                sx={{ fontWeight: 700, width: "fit-content" }}
              />
              <Typography variant="h5" fontWeight={700} color="white">
                {onDeckTeam.team}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Divider />

      {/* UPCOMING QUEUE */}
      <Stack spacing={2}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.secondary"
        >
          Upcoming Teams
        </Typography>

        {remainingTeams.map((tp) => (
          <Box
            key={tp.id}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={600}>
              {tp.team}
            </Typography>

            <Chip
              label={`#${tp.turn}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default LiveAirshowPage;
