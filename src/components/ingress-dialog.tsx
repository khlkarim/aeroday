"use client";

import { CreateIngressResponse } from "@/lib/controller";
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
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export function IngressDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("rtmp");
  const [enableChat, setEnableChat] = useState(true);
  const [allowParticipation, setAllowParticipation] = useState(true);
  const [ingressResponse, setIngressResponse] =
    useState<CreateIngressResponse>();
  const [open, setOpen] = useState(false);

  const onCreateIngress = async () => {
    setLoading(true);

    const res = await fetch("/api/create_ingress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_name: roomName,
        ingress_type: type,
        metadata: {
          creator_identity: name,
          enable_chat: enableChat,
          allow_participation: allowParticipation,
        },
      }),
    });

    setIngressResponse(await res.json());
    setLoading(false);
  };

  const resetForm = () => {
    setRoomName("");
    setName("");
    setType("rtmp");
    setEnableChat(true);
    setAllowParticipation(true);
    setIngressResponse(undefined);
    setOpen(false);
  };

  return (
    <>
      <Box onClick={() => setOpen(true)}>{children}</Box>

      <Dialog open={open} onClose={resetForm} maxWidth="sm" fullWidth>
        <DialogContent>
          {ingressResponse ? (
            <>
              <DialogTitle>Start streaming now</DialogTitle>
              <Stack spacing={3} mt={2}>
                <Typography>
                  Copy these values into your OBS settings under{" "}
                  <code>Stream</code> → <code>Service</code> →{" "}
                  <code>{type === "whip" ? "WHIP" : "Custom"}</code>. When
                  you’re ready, press &quot;Start Streaming&quot; and watch the
                  bits flow!
                </Typography>

                <TextField
                  label="Server URL"
                  value={ingressResponse.ingress.url}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />

                <TextField
                  label="Stream key"
                  value={ingressResponse.ingress.streamKey}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      router.push(
                        `/watch?at=${ingressResponse.auth_token}&rt=${ingressResponse.connection_details.token}`
                      )
                    }
                  >
                    Join as viewer
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <DialogTitle>Setup ingress endpoint</DialogTitle>
              <Stack spacing={3} mt={2}>
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

                <FormControl component="fieldset">
                  <FormLabel component="legend">Ingress type</FormLabel>
                  <RadioGroup
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <FormControlLabel value="rtmp" control={<Radio />} label="RTMP" />
                    <FormControlLabel value="whip" control={<Radio />} label="WHIP" />
                  </RadioGroup>
                </FormControl>

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

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight="bold">Viewers can participate</Typography>
                      <AllowParticipationInfo />
                    </Stack>
                    <Switch
                      checked={allowParticipation}
                      onChange={(e) => setAllowParticipation(e.target.checked)}
                    />
                  </Box>
                </Stack>
              </Stack>

              <DialogActions sx={{ gap: 1, mt: 3 }}>
                <Button variant="outlined" color="inherit" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={!(roomName && name && type) || loading}
                  onClick={onCreateIngress}
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
