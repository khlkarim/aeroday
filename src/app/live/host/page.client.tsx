"use client";

import { StreamPlayer } from "@/components/stream-player";
import { TokenContext } from "@/components/token-context";
import { LiveKitRoom } from "@livekit/components-react";
import { Stack } from "@mui/material";

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
          <StreamPlayer isHost />
        </Stack>
      </LiveKitRoom>
    </TokenContext.Provider>
  );
}
