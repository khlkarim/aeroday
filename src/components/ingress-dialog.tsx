"use client";

import { CreateIngressResponse } from "@/lib/controller";
import { AllowParticipationInfo } from "./allow-participation-info";
import { Spinner } from "./spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
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

      <Dialog
        open={open}
        onClose={resetForm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "rounded-2xl shadow-2xl"
        }}
      >
        <DialogContent className="p-0">
          {ingressResponse ? (
            <Box className="p-8">
              <Typography variant="h5" fontWeight="800" className="text-gray-900 border-b-4 border-green-500 w-fit pb-1 mb-6">
                Start Streaming Now
              </Typography>

              <Stack spacing={4}>
                <Typography className="text-gray-600 leading-relaxed bg-green-50 p-4 rounded-lg border border-green-100">
                  Copy these values into your OBS settings under{" "}
                  <code className="bg-white px-1.5 py-0.5 rounded border font-mono text-sm">Stream</code> → <code className="bg-white px-1.5 py-0.5 rounded border font-mono text-sm">Service</code> →{" "}
                  <code className="bg-blue-600 text-white px-1.5 py-0.5 rounded font-mono text-sm">{type === "whip" ? "WHIP" : "Custom"}</code>.
                </Typography>

                <Box className="flex flex-col gap-4">
                  <TextField
                    label="Server URL"
                    value={ingressResponse.ingress.url}
                    InputProps={{
                      readOnly: true,
                      className: "font-mono text-sm bg-gray-50"
                    }}
                    fullWidth
                  />

                  <TextField
                    label="Stream key"
                    type="password"
                    value={ingressResponse.ingress.streamKey}
                    InputProps={{
                      readOnly: true,
                      className: "font-mono text-sm bg-gray-50"
                    }}
                    fullWidth
                  />
                </Box>

                <Box display="flex" justifyContent="flex-end" className="pt-4">
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRightIcon />}
                    onClick={() =>
                      router.push(
                        `/watch?at=${ingressResponse.auth_token}&rt=${ingressResponse.connection_details.token}`
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 rounded-lg px-8 shadow-lg transition-all"
                  >
                    Join as viewer
                  </Button>
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box className="p-8">
              <Typography variant="h5" fontWeight="800" className="text-gray-900 border-b-4 border-blue-500 w-fit pb-1 mb-6">
                Setup Ingress Endpoint
              </Typography>

              <Stack spacing={4}>
                <div className="flex flex-col gap-6">
                  <TextField
                    label="Room name"
                    placeholder="abcd-1234"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    fullWidth
                    className="bg-gray-50/50"
                  />

                  <TextField
                    label="Your name"
                    placeholder="Roger Dunn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    className="bg-gray-50/50"
                  />
                </div>

                <FormControl component="fieldset" className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <FormLabel component="legend" className="font-bold text-gray-700 mb-2">Ingress Type</FormLabel>
                  <RadioGroup
                    row
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="gap-4"
                  >
                    <FormControlLabel
                      value="rtmp"
                      control={<Radio color="primary" />}
                      label={<span className="font-semibold">RTMP</span>}
                    />
                    <FormControlLabel
                      value="whip"
                      control={<Radio color="primary" />}
                      label={<span className="font-semibold">WHIP</span>}
                    />
                  </RadioGroup>
                </FormControl>

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

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography className="font-semibold text-gray-700">Viewers can participate</Typography>
                      <AllowParticipationInfo />
                    </Stack>
                    <Switch
                      checked={allowParticipation}
                      onChange={(e) => setAllowParticipation(e.target.checked)}
                      color="primary"
                    />
                  </Box>
                </Box>

                <DialogActions className="p-0 gap-3 pt-4">
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
                    disabled={!(roomName && name && type) || loading}
                    onClick={onCreateIngress}
                    size="large"
                    className={`px-10 rounded-lg shadow-md transition-all ${!(roomName && name && type) || loading
                        ? 'bg-gray-300'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'
                      }`}
                  >
                    {loading ? (
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Spinner />
                        <span>Creating...</span>
                      </Stack>
                    ) : (
                      "Create Endpoint"
                    )}
                  </Button>
                </DialogActions>
              </Stack>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
