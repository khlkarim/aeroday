"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

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
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase.rpc("get_candidats");

            if (error) {
                console.error("Failed to fetch candidats:", error);
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

    const submitVote = async (token: string | null) => {
        if (selectedIndex === null) {
            alert("Please select a candidate first.");
            return;
        }

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

  return {
    candidates,
    loading,
    error,
    selectedIndex,
    setSelectedIndex,
    submitVote,
  };
}
