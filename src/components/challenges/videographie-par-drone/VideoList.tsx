"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Stack, Button, CircularProgress, Typography, Alert } from "@mui/material";
import Title from "@/components/text/Title";
import VideoCard from "./VideoCard";
import { useCandidates } from "@/hooks/useCandidates";

const VideoList: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const {
        candidates,
        loading,
        error,
        selectedIndex,
        setSelectedIndex,
        submitVote,
    } = useCandidates();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitVote(token);
    };

    if (loading) {
        return (
            <Stack gap={8} alignItems="center">
                <Title label="Candidates" />
                <CircularProgress />
            </Stack>
        );
    }

    if (error) {
        return (
            <Stack alignItems="center">
                <Title label="Candidates" />
                <Alert severity="error" sx={{ borderRadius: 2, mt: 4, textAlign: "center" }}>
                    {error}
                </Alert>
            </Stack>
        );
    }

    if (!candidates.length) {
        return (
            <Stack gap={8}>
                <Title label="Candidates" />
                <Typography>No candidates available.</Typography>
            </Stack>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={8}>
                <Title label="Candidates" />
                <Grid container spacing={4} justifyContent="center">
                    {candidates.map((candidate, index) => (
                        <Grid key={candidate.id} sx={{ size: { xs: 12, sm: 6, md: 4 } }}>
                            <VideoCard
                                index={index}
                                candidate={candidate}
                                selected={selectedIndex === index}
                                onSelect={() => setSelectedIndex(index)}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={selectedIndex === null}
                >
                    Submit Vote
                </Button>
            </Stack>
        </form>
    );
};

export default VideoList;
