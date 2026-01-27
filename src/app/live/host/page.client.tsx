"use client";

import { Chat } from "@/components/chat";
import { ReactionBar } from "@/components/reaction-bar";
import { StreamPlayer } from "@/components/stream-player";
import { TokenContext } from "@/components/token-context";
import { LiveKitRoom } from "@livekit/components-react";
import { Box, Stack } from "@mui/material";

export default function HostPage({
  authToken,
  roomToken,
  serverUrl,
}: {
  authToken: string;
  roomToken: string;
  serverUrl: string;
}) {
  return (
    <TokenContext.Provider value={authToken}>
      <LiveKitRoom serverUrl={serverUrl} token={roomToken}>
        <Stack direction="row" sx={{ width: "100%", height: "100vh" }}>
          <Stack direction="column" sx={{ flex: 1 }}>
            <Box sx={{ flex: 1, bgcolor: "grey.100" }}>
              <StreamPlayer isHost />
            </Box>

            <ReactionBar />
          </Stack>

          <Box
            sx={{
              minWidth: 280,
              bgcolor: "secondary.light",
              borderLeft: 1,
              borderColor: "divider",
              display: { xs: "none", sm: "block" },
            }}
          >
            <Chat />
          </Box>
        </Stack>
      </LiveKitRoom>
    </TokenContext.Provider>
  );
}
