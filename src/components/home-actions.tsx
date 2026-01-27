"use client";

import { BroadcastDialog } from "@/components/broadcast-dialog";
import { IngressDialog } from "@/components/ingress-dialog";
import { JoinDialog } from "@/components/join-dialog";
import { Stack, Button, Typography } from "@mui/material";

export function HomeActions() {
  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Stack direction="row" spacing={1}>
        <BroadcastDialog>
          <Button variant="contained" size="large">
            Stream from browser
          </Button>
        </BroadcastDialog>

        <IngressDialog>
          <Button variant="contained" size="large">
            Stream from OBS
          </Button>
        </IngressDialog>
      </Stack>

      <Typography variant="body2">- OR -</Typography>

      <JoinDialog>
        <Button variant="outlined" size="large" fullWidth>
          Join existing stream
        </Button>
      </JoinDialog>
    </Stack>
  );
}
