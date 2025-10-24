// /hooks/useVoteResults.ts
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

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
  const [results, setResults] = useState<VoteResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.rpc("get_vote_results");

      if (error) {
        console.error("Failed to fetch vote results:", error);
        setError("Failed to fetch vote results.");
        setResults([]);
      } else if (data) {
        console.log(data);
        if (data.success) {
          setResults(data.data || []);
        } else {
          setError(data.message || "Vote results are not available.");
          setResults([]);
        }
      } else {
        setError("Unexpected response from server.");
        setResults([]);
      }

      setLoading(false);
    };

    fetchResults();
  }, []);

  return { results, loading, error };
};
