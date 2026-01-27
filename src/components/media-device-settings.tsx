"use client";

import {
  useLocalParticipant,
  useMediaDeviceSelect,
  useRoomContext,
} from "@livekit/components-react";
import { ArrowDropDown, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Menu, MenuItem, Typography } from "@mui/material";
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
    <Box className="flex gap-5">
      {/* Microphone */}
      <Box display="flex">
        <ButtonGroup
          size="small"
          variant="contained"
          className="overflow-hidden"
        >
          <Button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`px-4 py-2 min-w-[60px] transition-all border-none ${micEnabled
              ? 'bg-primary-main/20 text-primary-main hover:bg-primary-main/30'
              : 'bg-red-600/20 text-red-500 hover:bg-red-600/30'
              }`}
          >
            {micEnabled ? <Mic /> : <MicOff />}
          </Button>

          <Button
            // disabled={!micEnabled}
            onClick={(e) => setMicAnchorEl(e.currentTarget)}
            className="bg-white/5 text-white/60 hover:bg-white/10"
          >
            <ArrowDropDown />
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
          className="overflow-hidden"
        >
          <Button
            onClick={() => setCamEnabled(!camEnabled)}
            className={`px-4 py-2 min-w-[60px] transition-all border-none ${camEnabled
              ? 'bg-primary-main/20 text-primary-main hover:bg-primary-main/30'
              : 'bg-red-600/20 text-red-500 hover:bg-red-600/30'
              }`}
          >
            {camEnabled ? <Videocam /> : <VideocamOff />}
          </Button>

          <Button
            disabled={!camEnabled}
            onClick={(e) => setCamAnchorEl(e.currentTarget)}
            className="px-1 border-none bg-white/5 text-white/60 hover:bg-white/10"
          >
            <ArrowDropDown />
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
