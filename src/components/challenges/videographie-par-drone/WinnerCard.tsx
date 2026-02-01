"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    Box,
    CircularProgress,
    Stack,
    Alert,
    Avatar,
    useTheme,
    alpha,
    Fade,
    Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HowToVoteRoundedIcon from "@mui/icons-material/HowToVoteRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import Title from "@/components/text/Title";
import { useWinner } from "@/hooks/useWinner";

const WinnerCard: React.FC = () => {
    const theme = useTheme();
    const { data, isPending, isError, error } = useWinner();

    const winner = data;
    console.log(winner);

    if (isPending) {
        return (
            <Stack gap={6} alignItems="center">
                <Title label="Winner" />
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
                    <CircularProgress
                    // size={48}
                    // thickness={4}
                    // sx={{ color: theme.palette.warning.main }}
                    />
                </Box>
            </Stack>
        );
    }

    if (isError) {
        return (
            <Stack alignItems="center">
                <Title label="Winner" />
                <Alert
                    severity="error"
                    sx={{ borderRadius: 2, mt: 4, textAlign: "center" }}
                >
                    {error?.message}
                </Alert>
            </Stack>
        );
    }

    if (!winner) {
        return (
            <Stack gap={6} alignItems="center">
                <Title label="Winner" />
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
                    <EmojiEventsRoundedIcon
                        sx={{
                            fontSize: 64,
                            color: alpha(theme.palette.warning.main, 0.3),
                        }}
                    />
                    <Typography variant="h6" color="text.secondary" fontWeight={500}>
                        No winner yet
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        The winner will be announced soon
                    </Typography>
                </Box>
            </Stack>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
            }}
        >
            <Title label="Winner" />

            <Fade in timeout={600}>
                <Card
                    sx={{
                        borderRadius: 5,
                        overflow: "hidden",
                        position: "relative",
                        background: `linear-gradient(145deg, ${alpha(theme.palette.warning.main, 0.05)}, ${theme.palette.background.paper})`,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                        boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}, 0 0 0 1px ${alpha(theme.palette.warning.main, 0.1)}`,
                        transition: "all 0.4s ease",
                        "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: `0 32px 80px ${alpha(theme.palette.common.black, 0.2)}, 0 0 40px ${alpha(theme.palette.warning.main, 0.15)}`,
                        },
                    }}
                >
                    <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
                        <Chip
                            icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: 18 }} />}
                            label="1st Place"
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                color: "white",
                                "& .MuiChip-icon": { color: "inherit" },
                            }}
                        />
                    </Box>

                    {winner.thumbnail && (
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                            <CardMedia
                                component="img"
                                height="320"
                                image={winner.thumbnail}
                                alt={winner.title}
                                sx={{
                                    objectFit: "cover",
                                    transition: "transform 0.5s ease",
                                    "&:hover": { transform: "scale(1.03)" },
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.7)} 0%, transparent 40%, transparent 80%, ${alpha(theme.palette.warning.main, 0.1)} 100%)`,
                                    pointerEvents: "none",
                                }}
                            />
                        </Box>
                    )}

                    <CardContent sx={{ p: 4 }}>
                        {/* <Typography
                            variant="h4"
                            fontWeight={800}
                            gutterBottom
                            sx={{
                                lineHeight: 1.2,
                                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.text.secondary})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {winner.title}
                        </Typography> */}

                        {/* {winner.description && (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 3, lineHeight: 1.7 }}
                            >
                                {winner.description}
                            </Typography>
                        )} */}

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 1,
                                borderRadius: 3,
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Avatar sx={{ width: 36, height: 36 }}>
                                    <PersonIcon sx={{ fontSize: 20 }} />
                                </Avatar>
                                <Typography variant="body2" fontWeight={600}>
                                    {winner.author}
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Avatar
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.text.secondary})`,
                                    }}
                                >
                                    <HowToVoteRoundedIcon sx={{ fontSize: 20 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.disabled">
                                        Total Votes
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="black">
                                        {winner.votes_count}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </CardContent>

                    {winner.url && (
                        <CardActions sx={{ p: 4, pt: 0 }}>
                            <Button
                                variant="contained"
                                endIcon={<OpenInNewIcon />}
                                href={winner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                                size="large"
                                sx={{
                                    color: "white",
                                    borderRadius: 3,
                                    textTransform: "none",
                                    py: 1.5,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    "&:hover": { transform: "translateY(-2px)" },
                                }}
                            >
                                Watch Winning Video
                            </Button>
                        </CardActions>
                    )}
                </Card>
            </Fade>
        </Box>
    );
};

export default WinnerCard;
