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

      <Dialog
        open={open}
        onClose={resetForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Start a stream
        </DialogTitle>

        <DialogContent className="px-8 py-2">
          <Stack spacing={4} mt={3}>
            <div className="flex flex-col gap-6">
              <TextField
                label="Room name"
                placeholder="abcd-1234"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                fullWidth
                variant="outlined"
                className="bg-gray-50/50"
              />

              <TextField
                label="Your name"
                placeholder="Roger Dunn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="outlined"
                className="bg-gray-50/50"
              />
            </div>

            <Box className="bg-blue-50/30 p-6 rounded-xl border border-blue-100 flex flex-col gap-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={enableChat}
                    onChange={(e) => setEnableChat(e.target.checked)}
                    color="primary"
                  />
                }
                label={<Typography className="font-semibold text-gray-700">Enable chat</Typography>}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={allowParticipation}
                    onChange={(e) => setAllowParticipation(e.target.checked)}
                    color="primary"
                  />
                }
                label={<Typography className="font-semibold text-gray-700">Viewers can participate</Typography>}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions className="px-8 pb-8 pt-4 gap-3">
          <Button
            variant="text"
            color="inherit"
            onClick={resetForm}
            className="px-6 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!(roomName && name) || loading}
            onClick={onGoLive}
            size="large"
            className={`px-10 rounded-lg shadow-md transition-all ${!(roomName && name) || loading
              ? 'bg-gray-300'
              : 'hover:shadow-lg'
              }`}
          >
            {loading ? (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Spinner />
                <span>Creating...</span>
              </Stack>
            ) : (
              "Go Live"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
