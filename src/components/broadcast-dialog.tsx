"use client";

import { CreateStreamResponse } from "@/lib/controller";
import { AllowParticipationInfo } from "./allow-participation-info";
import { Spinner } from "./spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";

export function BroadcastDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const [enableChat, setEnableChat] = useState(true);
  const [allowParticipation, setAllowParticipation] = useState(true);
  const [open, setOpen] = useState(false);

  const onGoLive = async () => {
    setLoading(true);
    const res = await fetch("/api/create_stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_name: roomName,
        metadata: {
          creator_identity: name,
          enable_chat: enableChat,
          allow_participation: allowParticipation,
        },
      }),
    });
    const {
      auth_token,
      connection_details: { token },
    } = (await res.json()) as CreateStreamResponse;
    router.push(`/live/host?&at=${auth_token}&rt=${token}`);
  };

  const resetForm = () => {
    setRoomName("");
    setName("");
    setEnableChat(true);
    setAllowParticipation(true);
    setOpen(false);
  };

  return (
    <>
      <Box onClick={() => setOpen(true)}>{children}</Box>

      <Dialog open={open} onClose={resetForm} maxWidth="sm" fullWidth>
        <DialogTitle>Create new stream</DialogTitle>

        <DialogContent>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Room name"
              placeholder="abcd-1234"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Your name"
              placeholder="Roger Dunn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enableChat}
                    onChange={(e) => setEnableChat(e.target.checked)}
                  />
                }
                label={<Typography fontWeight="bold">Enable chat</Typography>}
              />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight="bold">Viewers can participate</Typography>
                  <AllowParticipationInfo />
                </Stack>
                <Switch
                  checked={allowParticipation}
                  onChange={(e) => setAllowParticipation(e.target.checked)}
                />
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ gap: 1, px: 3, py: 2 }}>
          <Button variant="outlined" color="inherit" onClick={resetForm}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!(roomName && name) || loading}
            onClick={onGoLive}
          >
            {loading ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Spinner />
                <Typography>Creating...</Typography>
              </Stack>
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
