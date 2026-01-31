"use client";

import { useState, useEffect } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StreamPlayer } from "@/components/stream-player";
import { TokenContext } from "@/components/token-context";
import { JoinStreamResponse } from "@/lib/controller";
import { useTableSync } from "@/hooks/useTableSync";
import { supabase } from "@/utils/supabase/client";

interface TvChannel {
    id: number;
    channel: string;
}

export default function SupabaseWatchPage() {
    const [authToken, setAuthToken] = useState("");
    const [roomToken, setRoomToken] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentChannel, setCurrentChannel] = useState<string | null>(null);

    const {
        data: tvData,
        isPending,
        isError,
        error,
    } = useTableSync<TvChannel>({
        queryKey: ["tv-channel"],
        fetcher: async () => {
            const { data, error } = await supabase
                .from("tv")
                .select("*")
                .limit(1);

            if (error) {
                console.error(error);
                return [];
            }
            return data;
        },
        subscribe: (onChange) => {
            const channel = supabase.channel("db-events:public:tv");

            channel.on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "tv",
                },
                onChange
            );

            channel.subscribe();
            return () => supabase.removeChannel(channel);
        },
    });

    console.log(tvData);
    const channelName = tvData?.[0]?.channel;

    // Join the stream when channel changes
    useEffect(() => {
        const joinStream = async () => {
            if (!channelName || channelName === currentChannel) return;

            setLoading(true);
            setCurrentChannel(channelName);

            try {
                const res = await fetch("/api/join_stream", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        room_name: channelName,
                        identity: `viewer-${Date.now()}`,
                    }),
                });

                if (!res.ok) {
                    throw new Error("Failed to join stream");
                }

                const {
                    auth_token,
                    connection_details: { token, ws_url },
                } = (await res.json()) as JoinStreamResponse;

                setAuthToken(auth_token);
                setRoomToken(token);
                setServerUrl(ws_url);
            } catch (err) {
                console.error("Error joining stream:", err);
            } finally {
                setLoading(false);
            }
        };

        joinStream();
    }, [channelName, currentChannel]);

    if (isPending) {
        return (
            <Box
                minHeight="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={2}
            >
                <CircularProgress />
                <Typography variant="body1" color="text.secondary">
                    Loading channel information...
                </Typography>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box
                minHeight="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography color="error">
                    Error loading channel: {String(error)}
                </Typography>
            </Box>
        );
    }

    if (!channelName) {
        return (
            <Box
                minHeight="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h6" color="text.secondary">
                    No channel configured
                </Typography>
            </Box>
        );
    }

    if (loading || !authToken || !roomToken || !serverUrl) {
        return (
            <Box
                minHeight="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={2}
            >
                <CircularProgress />
                <Typography variant="body1" color="text.secondary">
                    Connecting to {channelName}...
                </Typography>
            </Box>
        );
    }

    return (
        <TokenContext.Provider value={authToken}>
            <LiveKitRoom serverUrl={serverUrl} token={roomToken}>
                <Box display="flex" width="100%" height="100vh">
                    <StreamPlayer />
                </Box>
            </LiveKitRoom>
        </TokenContext.Provider>
    );
}
