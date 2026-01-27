"use client";

import { HomeActions } from "@/components/home-actions";
import { Box, Container, Stack } from "@mui/material";
import HostPageImpl from "./page.client";
import { useSearchParams } from "next/navigation";

export default function HostPage() {
  const searchParams = useSearchParams();

  const at = searchParams.get("at");
  const rt = searchParams.get("rt");

  console.log(at, rt);

  if (!at || !rt) {
    return (
      <main>
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" gap={12} p={{ xs: 10, sm: 24 }}>
          <Container maxWidth="sm">
            <Stack spacing={5} alignItems="center">
              <HomeActions />
            </Stack>
          </Container>
        </Box>
      </main>
    );
  }

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!.replace("wss://", "https://").replace("ws://", "http://");

  return <HostPageImpl authToken={at} roomToken={rt} serverUrl={serverUrl} />;
}
