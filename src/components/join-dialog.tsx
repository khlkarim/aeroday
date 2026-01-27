"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./spinner";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

export function JoinDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setRoomName("");
    setOpen(false);
  };

  return (
    <>
      <Box onClick={() => setOpen(true)}>{children}</Box>

      <Dialog open={open} onClose={resetForm} maxWidth="sm" fullWidth>
        <DialogTitle>Join existing stream</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Room name"
              placeholder="abcd-1234"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ gap: 1, px: 3, py: 2 }}>
          <Button variant="outlined" color="inherit" onClick={resetForm}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!roomName || loading}
            onClick={() => {
              setLoading(true);
              router.push(`/watch/${roomName}`);
            }}
          >
            {loading ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Spinner />
                <Typography>Joining...</Typography>
              </Stack>
            ) : (
              "Join"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
