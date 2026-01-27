"use client";

import {
  useLocalParticipant,
  useMediaDeviceSelect,
  useRoomContext,
} from "@livekit/components-react";
import { ArrowDropDown } from "@mui/icons-material";
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
    <>
      {/* Microphone */}
      <Box display="flex" gap={1}>
        <ButtonGroup size="small" variant="contained">
          <Button
            onClick={() => setMicEnabled(!micEnabled)}
            variant={micEnabled ? "contained" : "outlined"}
            sx={{ minWidth: 80 }}
          >
            Mic {micEnabled ? "On" : "Off"}
          </Button>

          <Button
            disabled={!micEnabled}
            onClick={(e) => setMicAnchorEl(e.currentTarget)}
            sx={{ px: 0 }}
          >
            <ArrowDropDown />
          </Button>
        </ButtonGroup>

        <Menu
          anchorEl={micAnchorEl}
          open={Boolean(micAnchorEl)}
          onClose={() => setMicAnchorEl(null)}
        >
          {microphoneDevices.map((d) => (
            <MenuItem
              key={d.deviceId}
              onClick={() => {
                setActiveMicrophoneDevice(d.deviceId);
                setMicAnchorEl(null);
              }}
              selected={d.deviceId === activeMicrophoneDeviceId}
            >
              {d.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Camera */}
      <ButtonGroup size="small" variant="contained">
        <Button
          onClick={() => setCamEnabled(!camEnabled)}
          variant={camEnabled ? "contained" : "outlined"}
          sx={{ minWidth: 80 }}
        >
          Cam {camEnabled ? "On" : "Off"}
        </Button>

        <Button
          disabled={!camEnabled}
          onClick={(e) => setCamAnchorEl(e.currentTarget)}
          sx={{ px: 0 }}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>

      <Menu
        anchorEl={camAnchorEl}
        open={Boolean(camAnchorEl)}
        onClose={() => setCamAnchorEl(null)}
      >
        {cameraDevices.map((d) => (
          <MenuItem
            key={d.deviceId}
            onClick={() => {
              setActiveCameraDevice(d.deviceId);
              setCamAnchorEl(null);
            }}
            selected={d.deviceId === activeCameraDeviceId}
          >
            {d.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
