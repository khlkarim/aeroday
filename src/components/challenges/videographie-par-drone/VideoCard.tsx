"use client";

import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    useTheme,
    alpha,
    Avatar,
} from "@mui/material";

interface Candidate {
    id: number;
    author: string;
    title: string;
    description?: string;
    url?: string;
    thumbnail?: string;
}

interface VideoCardProps {
    index: number;
    candidate: Candidate;
    selected: boolean;
    onSelect: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ candidate, selected, onSelect }) => {
    const theme = useTheme();

    return (
        <Card
            onClick={onSelect}
            sx={{
                width: "100%",
                // maxWidth: 380,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                background: selected
                    ? `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.background.paper, 0.95)})`
                    : theme.palette.background.paper,
                backdropFilter: "blur(10px)",
                transition: theme.transitions.create(
                    ["transform", "box-shadow", "border", "background"],
                    {
                        duration: theme.transitions.duration.standard,
                        easing: theme.transitions.easing.easeInOut,
                    }
                ),
                border: selected
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: selected
                    ? `0 20px 40px ${alpha(theme.palette.primary.main, 0.25)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`
                    : `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
                transform: selected ? "scale(1.02) translateY(-4px)" : "scale(1)",
                "&:hover": {
                    boxShadow: `0 16px 48px ${alpha(theme.palette.common.black, 0.15)}`,
                    transform: "scale(1.02) translateY(-4px)",
                    "& .video-overlay": {
                        opacity: 1,
                    },
                    "& .play-icon": {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 1,
                    },
                },
            }}
        >
            {/* Selection indicator badge */}
            {selected && (
                <Chip
                    icon={<CheckCircleRoundedIcon sx={{ fontSize: 16 }} />}
                    label="Selected"
                    size="small"
                    color="primary"
                    sx={{
                        position: "absolute",
                        top: 12,
                        color: "white",
                        right: 12,
                        zIndex: 10,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        backdropFilter: "blur(8px)",
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                        "& .MuiChip-icon": {
                            color: "inherit",
                        },
                    }}
                />
            )}

            {/* Candidate number badge */}
            {/* <Box
                sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 10,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
                    backdropFilter: "blur(8px)",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                }}
            >
                <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    #{index + 1}
                </Typography>
            </Box> */}

            {/* Thumbnail with overlay */}
            {candidate.thumbnail && (
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                        component="img"
                        height={200}
                        image={candidate.thumbnail}
                        alt={candidate.title}
                        sx={{
                            transition: "transform 0.4s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    />
                    {/* Gradient overlay */}
                    <Box
                        className="video-overlay"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.6)} 0%, transparent 50%)`,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                    {/* Play button overlay */}
                    {/* <Box
                        className="play-icon"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%) scale(0.8)",
                            opacity: 0,
                            transition: "all 0.3s ease",
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.primary.dark, 0.9)})`,
                            backdropFilter: "blur(8px)",
                            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}
                    >
                        <PlayArrowRoundedIcon sx={{ fontSize: 32, color: "white" }} />
                    </Box> */}
                </Box>
            )}

            <CardContent sx={{ p: 2.5, display: "flex", gap: 2 }}>
                {/* <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        lineHeight: 1.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {candidate.title}
                </Typography>
                {candidate.description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            lineHeight: 1.6,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {candidate.description}
                    </Typography> */}
                {/* )} */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flex={1}
                    sx={{
                        p: 1,
                        borderRadius: 2,
                        // background: alpha(theme.palette.action.hover, 0.5),
                    }}
                >
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            // background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500} color="text.secondary">
                        {candidate.author}
                    </Typography>
                </Box>
                <Button
                    size="small"
                    endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                    href={candidate.url}
                    // target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    // flex={1}
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        "&:hover": {
                            borderColor: theme.palette.primary.main,
                            background: alpha(theme.palette.primary.main, 0.08),
                        },
                    }}
                >
                    Watch Video
                </Button>
            </CardContent>

            {/* {candidate.url && (
                <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                    <Button
                        size="small"
                        endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                        href={candidate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        fullWidth
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            py: 1,
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                            "&:hover": {
                                borderColor: theme.palette.primary.main,
                                background: alpha(theme.palette.primary.main, 0.08),
                            },
                        }}
                    >
                        Watch Video
                    </Button>
                </CardActions>
            )} */}
        </Card>
    );
};

export default VideoCard;
