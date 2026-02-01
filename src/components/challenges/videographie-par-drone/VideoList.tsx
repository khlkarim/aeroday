"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
    Grid,
    Stack,
    Button,
    CircularProgress,
    Typography,
    Alert,
    Box,
    Fade,
    useTheme,
    alpha,
} from "@mui/material";
import HowToVoteRoundedIcon from "@mui/icons-material/HowToVoteRounded";
import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import Title from "@/components/text/Title";
import VideoCard from "./VideoCard";
import { useCandidates } from "@/hooks/useCandidates";

const VideoList: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const theme = useTheme();

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
            <Stack gap={6} alignItems="center">
                <Title label="Candidates" />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        // p: 6,
                        borderRadius: 4,
                        // background: alpha(theme.palette.background.paper, 0.6),
                        // backdropFilter: "blur(10px)",
                    }}
                >
                    <CircularProgress />
                </Box>
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
            <Stack gap={6} alignItems="center" sx={{ py: 8 }}>
                <Title label="Candidates" />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        p: 6,
                        borderRadius: 4,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: "blur(10px)",
                        border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`,
                    }}
                >
                    <MovieFilterRoundedIcon
                        sx={{
                            fontSize: 64,
                            color: alpha(theme.palette.text.secondary, 0.3),
                        }}
                    />
                    <Typography variant="h6" color="text.secondary" fontWeight={500}>
                        No candidates available
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        Check back later for submissions
                    </Typography>
                </Box>
            </Stack>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Box textAlign="center">
                    <Title label="Candidates" />
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    {candidates.map((candidate, index) => (
                        <Fade
                            key={candidate.id}
                            in
                            timeout={400}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <VideoCard
                                    index={index}
                                    candidate={candidate}
                                    selected={selectedIndex === index}
                                    onSelect={() => setSelectedIndex(index)}
                                />
                            </Grid>
                        </Fade>
                    ))}
                </Grid>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row-reverse" },
                        alignItems: "stretch",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {selectedIndex !== null && (
                        <Fade style={{ flex: 1 }} in timeout={300}>
                            <Typography
                                variant="body2"
                                sx={{
                                    px: 3,
                                    py: 2,
                                    borderRadius: 3,
                                    background: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 600,
                                }}
                            >
                                You selected: {candidates[selectedIndex].title}
                            </Typography>
                        </Fade>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={selectedIndex === null}
                        startIcon={<HowToVoteRoundedIcon />}
                        sx={{
                            flex: 2,
                            px: 6,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "1rem",
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            // boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                            },
                            "&:disabled": {
                                background: theme.palette.action.disabledBackground,
                                boxShadow: "none",
                            },
                        }}
                    >
                        Submit Vote
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

export default VideoList;
