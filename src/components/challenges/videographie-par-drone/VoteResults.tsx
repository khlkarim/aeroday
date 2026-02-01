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
    alpha,
    Fade,
    Chip,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import Title from "@/components/text/Title";
import { useVoteResults } from "@/hooks/useVoteResults";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import HowToVoteRoundedIcon from "@mui/icons-material/HowToVoteRounded";

const WINNER_COLOR = "#D4A574";
const OTHERS_COLOR = "#8B2635";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; payload: { title: string } }>;
    totalVotes: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, totalVotes }) => {
    const theme = useTheme();

    if (active && payload && payload.length) {
        const value = payload[0].value;
        const percentage = totalVotes ? ((value / totalVotes) * 100).toFixed(1) : "0.0";
        const title = payload[0].payload.title;

        return (
            <Box
                sx={{
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: "blur(12px)",
                    borderRadius: 2,
                    p: 2,
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
                    minWidth: 140,
                }}
            >
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                    {value} votes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {percentage}% of total
                </Typography>
            </Box>
        );
    }
    return null;
};

const VoteResults: React.FC = () => {
    const theme = useTheme();
    const { results, loading, error } = useVoteResults();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const totalVotes = results.reduce((sum, item) => sum + item.votes_count, 0);

    if (loading) {
        return (
            <Stack gap={6} alignItems="center">
                <Title label="Results" />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        p: 6,
                        borderRadius: 4,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <CircularProgress size={48} thickness={4} />
                    {/* <Typography variant="body2" color="text.secondary">
                        Loading results...
                    </Typography> */}
                </Box>
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
                        borderRadius: 3,
                        mt: 4,
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    {error}
                </Alert>
            </Stack>
        );
    }

    if (!results.length) {
        return (
            <Stack gap={6} alignItems="center" px={2}>
                <Title label="Results" />
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
                    <BarChartRoundedIcon
                        sx={{
                            fontSize: 64,
                            color: alpha(theme.palette.primary.main, 0.3),
                        }}
                    />
                    <Typography variant="h6" color="text.secondary" fontWeight={500}>
                        No votes yet
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        Results will appear here once voting begins
                    </Typography>
                </Box>
            </Stack>
        );
    }

    const maxVotes = Math.max(...results.map((item) => item.votes_count));

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
            }}
        >
            <Title label="Results" />

            <Fade in timeout={600}>
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 900,
                        borderRadius: 5,
                        overflow: "hidden",
                        position: "relative",
                        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.03)}, ${theme.palette.background.paper})`,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.1)}, 0 0 0 1px ${alpha(theme.palette.divider, 0.05)}`,
                        transition: "all 0.4s ease",
                        "&:hover": {
                            boxShadow: `0 24px 70px ${alpha(theme.palette.common.black, 0.12)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.08)}`,
                        },
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, sm: 4 }, pt: { xs: 6, sm: 6 } }}>
                        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {/* Chart header */}
                            <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                                {/* <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                                    }}
                                >
                                    <BarChartRoundedIcon sx={{ color: theme.palette.primary.main }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        Vote Distribution
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Real-time voting results
                                    </Typography>
                                </Box> */}
                            </Stack>

                            {/* Decorative header chip */}
                            <Box>
                                <Chip
                                    icon={<HowToVoteRoundedIcon sx={{ fontSize: 18 }} />}
                                    label={`${totalVotes} Total Votes`}
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        color: "white",
                                        "& .MuiChip-icon": { color: "inherit" },
                                        // boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Box
                            sx={{
                                borderRadius: 3,
                                p: { xs: 1, sm: 2 },
                                // background: alpha(theme.palette.action.hover, 0.3),
                            }}
                        >
                            <ResponsiveContainer width="100%" height={isMobile ? 300 : 400} debounce={200}>
                                <BarChart data={results} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                                    {/* <defs>
                                        {GRADIENT_COLORS.map((color, index) => (
                                            <linearGradient
                                                key={index}
                                                id={`barGradient-${index}`}
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop offset="0%" stopColor={color} stopOpacity={1} />
                                                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                                            </linearGradient>
                                        ))}
                                    </defs> */}

                                    <XAxis
                                        dataKey="title"
                                        tick={{
                                            fontSize: isMobile ? 10 : 12,
                                            fill: theme.palette.text.secondary,
                                        }}
                                        axisLine={{ stroke: alpha(theme.palette.divider, 0.2) }}
                                        tickLine={{ stroke: alpha(theme.palette.divider, 0.2) }}
                                        interval={0}
                                        angle={isMobile ? -20 : 0}
                                        textAnchor={isMobile ? "end" : "middle"}
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        tick={{
                                            fontSize: 12,
                                            fill: theme.palette.text.secondary,
                                        }}
                                        axisLine={{ stroke: alpha(theme.palette.divider, 0.2) }}
                                        tickLine={{ stroke: alpha(theme.palette.divider, 0.2) }}
                                    />
                                    <Tooltip
                                        content={<CustomTooltip totalVotes={totalVotes} />}
                                        cursor={{
                                            fill: alpha(theme.palette.primary.main, 0.08),
                                            radius: 4,
                                        }}
                                    />
                                    <Bar
                                        dataKey="votes_count"
                                        radius={[10, 10, 0, 0]}
                                        animationDuration={800}
                                        animationEasing="ease-out"
                                    >
                                        <LabelList
                                            dataKey="votes_count"
                                            position="top"
                                            fill={theme.palette.text.primary}
                                            fontSize={isMobile ? 12 : 14}
                                            fontWeight={600}
                                        />
                                        {results.map((r, index) => (
                                            <Cell
                                                key={index}
                                                fill={r.votes_count === maxVotes ? WINNER_COLOR : OTHERS_COLOR}
                                                style={{
                                                    filter: `drop-shadow(0 4px 8px ${alpha(r.votes_count === maxVotes ? WINNER_COLOR : OTHERS_COLOR, 0.3)})`,
                                                }}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Fade>
        </Box>
    );
};

export default VoteResults;
