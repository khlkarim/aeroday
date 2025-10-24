"use client";

import React from "react";
import { Card, CardContent, Typography, CircularProgress, useTheme, Box, Stack } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Title from "@/components/text/Title";
import { useVoteResults } from "@/hooks/useVoteResults";

const VoteResults: React.FC = () => {
  const theme = useTheme();
  const { results, loading, totalVotes } = useVoteResults();

  if (loading) {
    return (
        <Stack gap={8} alignItems={'center'}>
            <Title label="Results" />
            <CircularProgress />
        </Stack>
    );
  }

  return (
    <Box>
      <Title label="Results" />

      <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 8 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Total Votes: {totalVotes}
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={results}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="title" />
              <YAxis allowDecimals={false} />
              <Tooltip
                cursor={{ fill: theme.palette.action.hover }}
                formatter={(value: number) => {
                  const percentage = ((value / totalVotes) * 100).toFixed(1);
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
  );
};

export default VoteResults;
