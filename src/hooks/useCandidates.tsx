"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Candidate {
    id: number;
    author: string;
    title: string;
    description?: string;
    url?: string;
    thumbnail?: string;
}

interface UseCandidatesResult {
    candidates: Candidate[];
    loading: boolean;
    error: string | null;
    selectedIndex: number | null;
    setSelectedIndex: (index: number | null) => void;
    submitVote: (token: string | null) => Promise<void>;
}

export function useCandidates(): UseCandidatesResult {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["candidates"],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_candidats");

            if (error) {
                throw new Error("Error fetching candidats.");
            }

            if (!data?.success) {
                throw new Error(data?.message || "Candidats not available.");
            }

            return Array.isArray(data.data) ? data.data : [];
        },
        staleTime: 0,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        const channel = supabase.channel("realtime:candidates");

        channel.on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "vote_config",
            },
            () => {
                queryClient.invalidateQueries({ queryKey: ["candidates"] });
            }
        );

        channel.subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient]);

    const submitVote = async (token: string | null) => {
        if (selectedIndex === null) {
            alert("Please select a candidate first.");
            return;
        }

        if (!token) {
            alert("Missing voting token.");
            return;
        }

        const candidateId = data![selectedIndex].id;

        const { data: rpcData, error } = await supabase.rpc("cast_vote", {
            p_token_uuid: token,
            p_candidat_id: candidateId,
        });

        if (error) {
            alert(`Vote failed: ${error.message}`);
            return;
        }

        if (rpcData?.success) {
            alert(rpcData.message || "Vote cast successfully!");
            queryClient.invalidateQueries(); // results, winner, etc.
        } else {
            alert(rpcData?.message || "Vote failed.");
        }
    };

    return {
        candidates: data ?? [],
        loading: isLoading,
        error: error ? (error as Error).message : null,
        selectedIndex,
        setSelectedIndex,
        submitVote,
    };
}
