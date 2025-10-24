"use client";

import VideoCard from "./VideoCard";
import React, { useState, useEffect } from "react";
import Title from "@/components/text/Title";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { Grid, Stack, Button, CircularProgress, Typography, Box } from "@mui/material";

interface Candidate {
  id: number;
  author: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

const VideoList: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Fetch candidates from Supabase
  useEffect(() => {
    const fetchCandidates = async () => {
      const { data, error } = await supabase
        .from("candidats")
        .select("*");
      if (error) {
        console.error("Failed to fetch candidates:", error);
      } else if (data) {
        setCandidates(data);
      }
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedIndex === null) return;

    if (!token) {
      alert("Missing voting token.");
      return;
    }

    const candidateId = candidates[selectedIndex].id;

    const { data, error } = await supabase.rpc("cast_vote", {
      p_token_uuid: token,
      p_candidat_id: candidateId,
    });

    if (error) {
      console.error(error);
      alert("Failed to submit vote.");
    } else {
      alert(data); // RPC returns a message
    }
  };

  if (loading) {
    return (
        <Stack gap={8} alignItems={'center'}>
            <Title label="Candidats" />
            <CircularProgress />
        </Stack>
    );
  }

  if (!candidates.length) {
    return (
        <Stack gap={8}>
            <Title label="Candidats" />
            <Typography>No candidates available.</Typography>
        </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={8}>
        <Title label="Candidats" />

        <Grid container spacing={4} justifyContent="center">
          {candidates.map((_, index) => (
            <Grid key={_.id} sx={{ size: { xs: 12, sm: 6, md: 4 } }}>
              <VideoCard
                index={index}
                candidate={_}
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
