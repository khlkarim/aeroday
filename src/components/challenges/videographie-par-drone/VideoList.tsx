"use client";

import VideoCard from "./VideoCard";
import React, { useState, useEffect } from "react";
import Title from "@/components/text/Title";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import {
  Grid,
  Stack,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";

interface Candidate {
  id: number;
  author: string;
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
}

const VideoList: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // ✅ Fetch candidates from RPC
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc("get_candidats");

      if (rpcError) {
        console.error("Failed to fetch candidats:", rpcError);
        setError("Error fetching candidats.");
        setCandidates([]);
      } else if (data) {
        if (data.success) {
          setCandidates(Array.isArray(data.data) ? data.data : []);
        } else {
          setError(data.message || "Candidats are not available.");
          setCandidates([]);
        }
      } else {
        setError("Unexpected response from server.");
        setCandidates([]);
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
      console.error("RPC call failed:", error);
      alert(`Vote failed: ${error.message}`);
      return;
    }

    if (data) {
      if (data.success) {
        alert(data.message || "Vote cast successfully!");
      } else {
        alert(data.message || "Vote failed.");
      }
    } else {
      alert("Unexpected response from server.");
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <Stack gap={8} alignItems="center">
        <Title label="Candidats" />
        <CircularProgress />
      </Stack>
    );
  }

  // ✅ Error or "not during" phase message
  if (error) {
    return (
      <Stack alignItems="center">
        <Title label="Candidats" />
        <Alert
          severity="error"
          sx={{ borderRadius: 2, mt: 4, textAlign: "center" }}
        >
          {error}
        </Alert>
      </Stack>
    );
  }

  // ✅ No candidates
  if (!candidates.length) {
    return (
      <Stack gap={8}>
        <Title label="Candidats" />
        <Typography>No candidates available.</Typography>
      </Stack>
    );
  }

  // ✅ Normal render
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={8}>
        <Title label="Candidats" />

        <Grid container spacing={4} justifyContent="center">
          {candidates.map((candidate, index) => (
            <Grid sx={{ size: { xs: 12, sm: 6, md: 4 } }} key={candidate.id}>
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
