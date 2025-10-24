"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

interface Candidate {
    candidat_id: number;
    author: string;
    title: string;
    description?: string;
    url?: string;
    thumbnail?: string;
    votes_count: number;
}

interface UseWinnerResult {
    winner: Candidate | null;
    loading: boolean;
    message: string | null;
}

export function useWinner(): UseWinnerResult {
    const [winner, setWinner] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

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

    return { winner, loading, message };
}
