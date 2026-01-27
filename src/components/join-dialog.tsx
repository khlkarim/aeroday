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

      <Dialog
        open={open}
        onClose={resetForm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "rounded-2xl shadow-2xl"
        }}
      >
        <DialogTitle>
          Join Existing Stream
        </DialogTitle>

        <DialogContent className="px-8 py-4">
          <Stack spacing={4} mt={1}>
            <TextField
              label="Room name"
              placeholder="abcd-1234"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-gray-50/50"
              autoFocus
            />
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
            disabled={!roomName || loading}
            onClick={() => {
              setLoading(true);
              router.push(`/watch/${roomName}`);
            }}
            size="large"
            className={`px-10 rounded-lg shadow-md transition-all ${!roomName || loading
              ? 'bg-gray-300'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
              }`}
          >
            {loading ? (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Spinner />
                <span>Joining...</span>
              </Stack>
            ) : (
              "Join Stream"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
