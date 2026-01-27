"use client";

import { BroadcastDialog } from "@/components/broadcast-dialog";
import { IngressDialog } from "@/components/ingress-dialog";
import { JoinDialog } from "@/components/join-dialog";
import { Stack, Button, Typography } from "@mui/material";

export function HomeActions() {
  return (
    <Stack
      direction="column"
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
      className="max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
        <BroadcastDialog>
          <Button
            variant="contained"
            size="large"
            fullWidth
            className="h-24 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col gap-1 items-center justify-center normal-case"
          >
            Stream from Browser
          </Button>
        </BroadcastDialog>

        <JoinDialog>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            className="h-24 text-lg font-semibold rounded-xl border-2 border-gray-200 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all normal-case"
          >
            Join existing stream
          </Button>
        </JoinDialog>
      </div>
    </Stack>
  );
}
