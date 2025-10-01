"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { Card, CardContent, Typography, CircularProgress, useTheme, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Title from "@/components/text/Title";

type VoteResult = {
    choice: string;
    vote_count: number;
};

const VoteResultsChart: React.FC = () => {
    const theme = useTheme();
    const [results, setResults] = useState<VoteResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            const { data, error } = await supabase.rpc("get_vote_counts");
            if (error) {
                console.error("Error fetching votes:", error);
            } else if (data) {
                setResults(data);
                const total = data.reduce((sum: number, r: VoteResult) => sum + r.vote_count, 0);
                setTotalVotes(total);
            }
            setLoading(false);
        };

        fetchResults();

        const channel = supabase
            .channel("votes_changes")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "votes" }, fetchResults)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (loading) {
        return (
            <Card sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
            </Card>
        );
    }

    return (
        <Box>
            <Title label="Results"/>

            <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 8 }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Votes: {totalVotes}
                    </Typography>

                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={results} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                            <XAxis dataKey="choice" />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                cursor={{ fill: theme.palette.action.hover }}
                                formatter={(value: number) => {
                                    const percentage = ((value / totalVotes) * 100).toFixed(1);
                                    return [`${value} votes (${percentage}%)`, "Votes"];
                                }}
                            />
                            <Bar dataKey="vote_count" radius={[8, 8, 0, 0]}>
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

export default VoteResultsChart;
