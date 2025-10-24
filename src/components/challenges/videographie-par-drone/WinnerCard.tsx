"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
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
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import Title from "@/components/text/Title";

interface Candidate {
  id: number;
  author: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  votes_count: number;
}

const WinnerCard: React.FC = () => {
  const [winner, setWinner] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinner = async () => {
      const { data, error } = await supabase.rpc("get_vote_winner");
      console.log(data);

      if (error) {
        console.error("Failed to fetch winner:", error);
      } else if (data) {
        // If RPC returns a single object, use it directly
        // If it returns an array (sometimes Supabase wraps it), pick the first element
        const candidate = Array.isArray(data) ? data[0] : data;
        setWinner(candidate);
      }

      setLoading(false);
    };

    fetchWinner();
  }, []);

  if (loading) {
    return (
      <Stack gap={8} alignItems={'center'}>
            <Title label="Winner" />
            <CircularProgress />
        </Stack>
    );
  }

  if (!winner) {
    return (
      <Stack gap={8}>
            <Title label="Winner" />
            <Typography>No winner yet.</Typography>
        </Stack>
    );
  }

  return (
    <Box>
      <Title label="Winner" />

      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          borderRadius: 4,
          boxShadow: 4,
          mt: 8,
        }}
      >
        <CardMedia
          component="img"
          height={250}
          image={winner.thumbnail}
          alt={winner.title}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {winner.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {winner.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {winner.author}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Total Votes: {winner.votes_count}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            endIcon={<OpenInNewIcon />}
            href={winner.url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            Watch Video
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default WinnerCard;
