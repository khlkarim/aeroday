"use client";

import {
  useLocalParticipant,
  useMediaDeviceSelect,
  useRoomContext,
} from "@livekit/components-react";
import { ArrowDropDown, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Menu, MenuItem } from "@mui/material";
import { ConnectionState } from "livekit-client";
import { useEffect, useState } from "react";

export function MediaDeviceSettings() {
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  const { state: roomState } = useRoomContext();
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    if (roomState === ConnectionState.Connected) {
      void localParticipant.setMicrophoneEnabled(micEnabled);
      void localParticipant.setCameraEnabled(camEnabled);
    }
  }, [micEnabled, camEnabled, localParticipant, roomState]);

  const {
    devices: microphoneDevices,
    activeDeviceId: activeMicrophoneDeviceId,
    setActiveMediaDevice: setActiveMicrophoneDevice,
  } = useMediaDeviceSelect({ kind: "audioinput" });

  const {
    devices: cameraDevices,
    activeDeviceId: activeCameraDeviceId,
    setActiveMediaDevice: setActiveCameraDevice,
  } = useMediaDeviceSelect({ kind: "videoinput" });

  const [micAnchorEl, setMicAnchorEl] = useState<null | HTMLElement>(null);
  const [camAnchorEl, setCamAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box className="flex gap-2">
      {/* Microphone */}
      <Box display="flex">
        <ButtonGroup
          size="small"
          variant="contained"
          className="overflow-hidden rounded-full shadow-none"
        >
          <Button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`px-3 py-1.5 min-w-[40px] transition-all border-none ${micEnabled
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
              }`}
          >
            {micEnabled ? <Mic className="text-sm" /> : <MicOff className="text-sm" />}
          </Button>

          <Button
            // disabled={!micEnabled}
            onClick={(e) => setMicAnchorEl(e.currentTarget)}
            className="bg-white/5 text-white/60 hover:bg-white/10 px-1 min-w-[24px] border-l border-white/5"
          >
            <ArrowDropDown className="text-sm" />
          </Button>
        </ButtonGroup>

        <Menu
          anchorEl={micAnchorEl}
          open={Boolean(micAnchorEl)}
          onClose={() => setMicAnchorEl(null)}
          PaperProps={{
            className: "mt-2 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl"
          }}
        >
          {microphoneDevices.map((d) => (
            <MenuItem
              key={d.deviceId}
              onClick={() => {
                setActiveMicrophoneDevice(d.deviceId);
                setMicAnchorEl(null);
              }}
              selected={d.deviceId === activeMicrophoneDeviceId}
              className="mx-1 my-0.5 rounded-lg text-sm hover:bg-white/10"
            >
              {d.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Camera */}
      <Box display="flex">
        <ButtonGroup
          size="small"
          variant="contained"
          className="overflow-hidden rounded-full shadow-none"
        >
          <Button
            onClick={() => setCamEnabled(!camEnabled)}
            className={`px-3 py-1.5 min-w-[40px] transition-all border-none ${camEnabled
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
              }`}
          >
            {camEnabled ? <Videocam className="text-sm" /> : <VideocamOff className="text-sm" />}
          </Button>

          <Button
            disabled={!camEnabled}
            onClick={(e) => setCamAnchorEl(e.currentTarget)}
            className="px-1 border-l border-white/5 bg-white/5 text-white/60 hover:bg-white/10 min-w-[24px]"
          >
            <ArrowDropDown className="text-sm" />
          </Button>
        </ButtonGroup>

        <Menu
          anchorEl={camAnchorEl}
          open={Boolean(camAnchorEl)}
          onClose={() => setCamAnchorEl(null)}
          PaperProps={{
            className: "mt-2 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl"
          }}
        >
          {cameraDevices.map((d) => (
            <MenuItem
              key={d.deviceId}
              onClick={() => {
                setActiveCameraDevice(d.deviceId);
                setCamAnchorEl(null);
              }}
              selected={d.deviceId === activeCameraDeviceId}
              className="mx-1 my-0.5 rounded-lg text-sm hover:bg-white/10"
            >
              {d.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
