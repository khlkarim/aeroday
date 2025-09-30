import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { videoParDroneCandidates } from "@/content/video-par-drone-candidates";
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box, useTheme } from "@mui/material";

interface VideoCardProps {
    index: number;
    selected: boolean;
    onSelect: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ index, selected, onSelect }) => {
    const candidate = videoParDroneCandidates[index];
    const theme = useTheme();

    if (!candidate) {
        return (
            <Typography variant="body1" color="error">
                Invalid video index
            </Typography>
        );
    }

    return (
        <Card
            onClick={onSelect}
            sx={{
                maxWidth: 400,
                borderRadius: 4,
                overflow: "hidden",
                cursor: "pointer",
                transition: theme.transitions.create(
                    ["transform", "box-shadow", "border"],
                    {
                        duration: theme.transitions.duration.short,
                        easing: theme.transitions.easing.easeInOut,
                    }
                ),
                border: selected
                    ? `2px solid ${theme.palette.primary.main}`
                    : `2px solid transparent`,
                boxShadow: selected ? theme.shadows[8] : theme.shadows[4],
                transform: selected ? "scale(1.03)" : "scale(1)",
                "&:hover": {
                    boxShadow: theme.shadows[6],
                    transform: "scale(1.03)",
                },
            }}
        >
            <CardMedia
                component="img"
                height={200}
                image={candidate.thumbnail}
                alt={candidate.title}
            />
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {candidate.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {candidate.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                        {candidate.author}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    endIcon={<OpenInNewIcon />}
                    href={candidate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                >
                    Watch Video
                </Button>
            </CardActions>
        </Card>
    );
};

export default VideoCard;
