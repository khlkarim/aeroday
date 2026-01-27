"use client";

import { useState } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import { ArrowForward, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Spinner } from "@/components/spinner";
import { StreamPlayer } from "@/components/stream-player";
import { TokenContext } from "@/components/token-context";
import { JoinStreamResponse } from "@/lib/controller";
import { cn } from "@/lib/utils";

export default function WatchPage({
  roomName,
  serverUrl,
}: {
  roomName: string;
  serverUrl: string;
}) {
  const [name, setName] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [roomToken, setRoomToken] = useState("");
  const [loading, setLoading] = useState(false);

  const onJoin = async () => {
    setLoading(true);

    const res = await fetch("/api/join_stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_name: roomName,
        identity: name,
      }),
    });

    const {
      auth_token,
      connection_details: { token },
    } = (await res.json()) as JoinStreamResponse;
    setAuthToken(auth_token);
    setRoomToken(token);
    setLoading(false);
  };

  if (!authToken || !roomToken) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card sx={{ width: 400, borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Entering {decodeURI(roomName)}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Choose how you want to be seen in the room.
            </Typography>

            <Typography variant="subtitle2" fontWeight="bold" mb={1}>
              Your name
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                {name ? name[0].toUpperCase() : <Person />}
              </Avatar>

              <TextField
                fullWidth
                placeholder="Roger Dunn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                variant="contained"
                disabled={!name || loading}
                onClick={onJoin}
                size="large"
                fullWidth
                endIcon={
                  !loading ? (
                    <ArrowForward
                      className={cn(name && "animate-wiggle")}
                    />
                  ) : undefined
                }
              >
                {loading ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Spinner />
                    <Typography variant="button" ml={1}>Joining...</Typography>
                  </Box>
                ) : (
                  "Join as viewer"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
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
