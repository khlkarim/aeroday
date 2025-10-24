"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useTheme,
  Box,
  Stack,
  Alert,
  useMediaQuery,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Title from "@/components/text/Title";
import { useVoteResults } from "@/hooks/useVoteResults";

const VoteResults: React.FC = () => {
  const theme = useTheme();
  const { results, loading, error } = useVoteResults();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const totalVotes = results.reduce((sum, item) => sum + item.votes_count, 0);

  if (loading) {
    return (
      <Stack gap={4} alignItems="center">
        <Title label="Results" />
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" px={2}>
        <Title label="Results" />
        <Alert
          severity="error"
          sx={{
            borderRadius: 2,
            mt: 4,
            textAlign: "center",
          }}
        >
          {error}
        </Alert>
      </Stack>
    );
  }

  if (!results.length) {
    return (
      <Stack gap={4} alignItems="center" px={2}>
        <Title label="Results" />
        <Typography textAlign="center">
          No votes have been cast yet.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <Title label="Results" />
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            mt: 6,
            px: { xs: 1, sm: 2 },
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              textAlign={isMobile ? "center" : "left"}
            >
              Total Votes: {totalVotes}
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={isMobile ? 300 : 400}
              debounce={200}
            >
              <BarChart
                data={results}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <XAxis
                  dataKey="title"
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={0}
                  angle={isMobile ? -20 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: theme.palette.action.hover }}
                  formatter={(value: number) => {
                    const percentage = totalVotes
                      ? ((value / totalVotes) * 100).toFixed(1)
                      : "0.0";
                    return [`${value} votes (${percentage}%)`, "Votes"];
                  }}
                />
                <Bar dataKey="votes_count" radius={[8, 8, 0, 0]}>
                  {results.map((_, index) => (
                    <Cell key={index} fill={theme.palette.primary.main} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default VoteResults;
