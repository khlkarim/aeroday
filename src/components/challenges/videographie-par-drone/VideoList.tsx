"use client";

import VideoCard from "./VideoCard";
import React, { useState } from "react";
import Title from "@/components/text/Title";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { Grid, Stack, Button } from "@mui/material";
import { videoParDroneCandidates } from "@/content/video-par-drone-candidates";

const VideoList: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedIndex === null) return;

        if (!token) {
            alert("Missing voting token.");
            return;
        }

        const { error } = await supabase.rpc("cast_vote", {
            v_token: token,
            v_choice: videoParDroneCandidates[selectedIndex].title,
        });

        if (error) {
            console.error(error);
            alert("Failed to submit vote.");
        } else {
            alert("Vote submitted successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={6}>
                <Title label="Candidats" />

                <Grid container spacing={4} justifyContent="center">
                    {videoParDroneCandidates.map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <VideoCard
                                index={index}
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
