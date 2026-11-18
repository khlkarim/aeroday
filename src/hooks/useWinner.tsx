"use client";

import { useEffect } from "react";
import { VoteResult } from "./useVoteResults";
import { supabase } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const WINNER_QUERY_KEY = ["winner"];

export function useWinner() {
    const queryClient = useQueryClient();

    const query = useQuery<VoteResult | null>({
        queryKey: WINNER_QUERY_KEY,
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_vote_winner");

            if (error) throw error;
            if (data.success === false) throw new Error(data.message);

            return data.data;
        },
        staleTime: 0,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        const channel = supabase
            .channel("realtime:vote_config")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "vote_config",
                },
                () => {
                    queryClient.invalidateQueries({
                        queryKey: WINNER_QUERY_KEY,
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient]);

    return query;
}
