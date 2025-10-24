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
  Alert,
  Divider,
  Avatar,
  useTheme,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import Title from "@/components/text/Title";

interface Candidate {
  candidat_id: number;
  author: string;
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  votes_count: number;
}

const WinnerCard: React.FC = () => {
  const [winner, setWinner] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchWinner = async () => {
      const { data, error } = await supabase.rpc("get_vote_winner");

      if (error) {
        console.error("Failed to fetch winner:", error);
        setMessage("Failed to fetch winner.");
      } else if (data) {
        if (data.success) {
          if (data.data) {
            setWinner(data.data);
          } else {
            setMessage("No winner data available.");
          }
        } else {
          setMessage(data.message || "Winner not available.");
        }
      }

      setLoading(false);
    };

    fetchWinner();
  }, []);

  if (loading) {
    return (
      <Stack gap={8} alignItems={"center"}>
        <Title label="Winner" />
        <CircularProgress />
      </Stack>
    );
  }

  if (message) {
    return (
      <Stack alignItems={'center'}>
        <Title label="Winner" />
        <Alert
          severity="error"
          sx={{ borderRadius: 2, mt: 4, textAlign: "center" }}
        >
          {message}
        </Alert>
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
   <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
        <Title label="Winner" />

      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
          },
        }}
      >
        {winner.thumbnail && (
          <CardMedia
            component="img"
            height="280"
            image={winner.thumbnail}
            alt={winner.title}
            sx={{
              objectFit: "cover",
            }}
          />
        )}

        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="text.primary"
          >
            {winner.title}
          </Typography>

          {winner.description && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              {winner.description}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 28, height: 28 }}>
              <PersonIcon fontSize="small" />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {winner.author}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, fontWeight: 500 }}
          >
            🗳️ Total Votes:{" "}
            <Typography
              component="span"
              color={theme.palette.primary.main}
              fontWeight="bold"
            >
              {winner.votes_count}
            </Typography>
          </Typography>
        </CardContent>

        {winner.url && (
          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
              variant="contained"
              endIcon={<OpenInNewIcon />}
              href={winner.url}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              sx={{
                borderRadius: 3,
                textTransform: "none",
                py: 1.2,
              }}
            >
              Watch Video
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default WinnerCard;
