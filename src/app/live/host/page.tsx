import { HomeActions } from "@/components/home-actions";
import Image from "next/image";
import { Box, Container, Typography, Link as MuiLink, Divider, Stack } from "@mui/material";
import HostPageImpl from "./page.client";

interface PageProps {
  searchParams?: Record<string, string | string[]>;
}

export default async function HostPage({ searchParams }: PageProps) {
  // Await searchParams if necessary (some Next.js setups require this)
  const params = await searchParams; // <-- fix

  const at = Array.isArray(params?.at) ? params.at[0] : params?.at;
  const rt = Array.isArray(params?.rt) ? params.rt[0] : params?.rt;

  console.log(at, rt);

  if (!at || !rt) {
    return (
      <main>
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" gap={12} p={{ xs: 10, sm: 24 }}>
          <Container maxWidth="sm">
            <Stack spacing={5} alignItems="center">
              <Image src="/wordmark.svg" alt="LiveKit" width={240} height={120} className="invert dark:invert-0 mt-8 mb-2" />
              <Typography align="center" component="p">
                Welcome to the LiveKit livestream demo app. You can join or start your own stream. Hosted on{" "}
                <MuiLink href="https://livekit.io/cloud" target="_blank" rel="noopener noreferrer">LiveKit Cloud</MuiLink>.
              </Typography>
              <HomeActions />
              <Divider sx={{ my: 2 }} />
              <Typography align="center" component="p" variant="body2">
                Feel free to clone this full-stack NextJS app{" "}
                <MuiLink href="https://github.com/livekit-examples/livestream" target="_blank" rel="noopener noreferrer">here</MuiLink>.
              </Typography>
            </Stack>
          </Container>
        </Box>
      </main>
    );
  }

  const serverUrl = process.env.LIVEKIT_WS_URL!.replace("wss://", "https://").replace("ws://", "http://");

  return <HostPageImpl authToken={at} roomToken={rt} serverUrl={serverUrl} />;
}
