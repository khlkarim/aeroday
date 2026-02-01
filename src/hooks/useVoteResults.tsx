"use client";

import { supabase } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface VoteResult {
  candidat_id: number;
  author: string;
  title: string;
  votes_count: number;
  description?: string;
  url?: string;
  thumbnail?: string;
}

export const useVoteResults = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vote-results"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_vote_results");

      if (error) {
        throw new Error("Failed to fetch vote results.");
      }

      if (!data?.success) {
        throw new Error(data?.message || "Vote results not available.");
      }

      return data.data || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const channel = supabase.channel("realtime:vote-results");

    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "vote_config",
      },
      () => {
        queryClient.invalidateQueries({ queryKey: ["vote-results"] });
      }
    );

    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    results: data ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
};
