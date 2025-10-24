"use client";

import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  useTheme,
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
        maxWidth: 350,
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transition: theme.transitions.create(["transform", "box-shadow", "border"], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }),
        border: selected ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
        boxShadow: selected ? theme.shadows[8] : theme.shadows[4],
        transform: selected ? "scale(1.03)" : "scale(1)",
        "&:hover": {
          boxShadow: theme.shadows[6],
          transform: "scale(1.03)",
        },
      }}
    >
      {candidate.thumbnail && (
        <CardMedia
          component="img"
          height={200}
          image={candidate.thumbnail}
          alt={candidate.title}
        />
      )}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {candidate.title}
        </Typography>
        {candidate.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {candidate.description}
          </Typography>
        )}
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {candidate.author}
          </Typography>
        </Box>
      </CardContent>
      {candidate.url && (
        <CardActions>
          <Button
            size="small"
            endIcon={<OpenInNewIcon />}
            href={candidate.url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            onClick={(e) => e.stopPropagation()} // prevent card click when button is clicked
          >
            Watch Video
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default VideoCard;
