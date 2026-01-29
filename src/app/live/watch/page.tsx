"use client";

import { Box, Container, Stack } from "@mui/material";
import { HomeActions } from "@/components/home-actions";

export default function WatchPage() {
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
