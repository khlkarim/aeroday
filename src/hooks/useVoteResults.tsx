"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export type VoteResult = {
  id: number;
  title: string;
  author: string;
  votes_count: number;
};

export function useVoteResults() {
  const [results, setResults] = useState<VoteResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      const { data, error } = await supabase.rpc("get_vote_results");
      if (error) {
        console.error("Error fetching votes:", error);
      } else if (data) {
        setResults(data as VoteResult[]);
        const total = (data as VoteResult[]).reduce(
          (sum, r) => sum + r.votes_count,
          0
        );
        setTotalVotes(total);
      }
      setLoading(false);
    };

    fetchResults();

    const channel = supabase
      .channel("votes_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        fetchResults
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { results, loading, totalVotes };
}
