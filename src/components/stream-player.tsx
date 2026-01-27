"use client";

import { ParticipantMetadata, RoomMetadata } from "@/lib/controller";
import {
  AudioTrack,
  StartAudio,
  VideoTrack,
  useDataChannel,
  useLocalParticipant,
  useMediaDeviceSelect,
  useParticipants,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import {
  ContentCopy,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import Confetti from "js-confetti";
import {
  ConnectionState,
  LocalVideoTrack,
  Track,
  createLocalTracks,
} from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { MediaDeviceSettings } from "./media-device-settings";
import { PresenceDialog } from "./presence-dialog";
import { useAuthToken } from "./token-context";
import { useCopyToClipboard } from "@/lib/clipboard";

function ConfettiCanvas() {
  const [confetti, setConfetti] = useState<Confetti>();
  const [decoder] = useState(() => new TextDecoder());
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useDataChannel("reactions", (data) => {
    const options: { emojis?: string[]; confettiNumber?: number } = {};
    const emoji = decoder.decode(data.payload);

    if (emoji !== "🎉") {
      options.emojis = [emoji];
      options.confettiNumber = 12;
    }

    confetti?.addConfetti(options);
  });

  useEffect(() => {
    setConfetti(new Confetti({ canvas: canvasEl.current ?? undefined }));
  }, []);

  return <canvas ref={canvasEl} className="absolute h-full w-full" />;
}

export function StreamPlayer({ isHost = false }) {
  const [_, copy] = useCopyToClipboard();
  const [isPresenceOpen, setIsPresenceOpen] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<LocalVideoTrack>();
  const localVideoEl = useRef<HTMLVideoElement>(null);

  const { metadata, name: roomName, state: roomState } = useRoomContext();
  const roomMetadata = (metadata && JSON.parse(metadata)) as RoomMetadata;

  const { localParticipant } = useLocalParticipant();
  const localMetadata = (localParticipant.metadata &&
    JSON.parse(localParticipant.metadata)) as ParticipantMetadata;

  const canHost =
    isHost || (localMetadata?.invited_to_stage && localMetadata?.hand_raised);

  const participants = useParticipants();

  const showNotification = isHost
    ? participants.some((p) => {
      const m = (p.metadata &&
        JSON.parse(p.metadata)) as ParticipantMetadata;
      return m?.hand_raised && !m?.invited_to_stage;
    })
    : localMetadata?.invited_to_stage && !localMetadata?.hand_raised;

  useEffect(() => {
    if (!canHost) return;

    const createTracks = async () => {
      const tracks = await createLocalTracks({ audio: true, video: true });
      const camTrack = tracks.find((t) => t.kind === Track.Kind.Video);
      if (camTrack && localVideoEl.current) {
        camTrack.attach(localVideoEl.current);
      }
      setLocalVideoTrack(camTrack as LocalVideoTrack);
    };

    void createTracks();
  }, [canHost]);

  const { activeDeviceId } = useMediaDeviceSelect({ kind: "videoinput" });

  useEffect(() => {
    if (localVideoTrack) {
      void localVideoTrack.setDeviceId(activeDeviceId);
    }
  }, [localVideoTrack, activeDeviceId]);

  const remoteVideoTracks = useTracks([Track.Source.Camera]).filter(
    (t) => t.participant.identity !== localParticipant.identity
  );

  const totalVideoTracks = (canHost ? 1 : 0) + remoteVideoTracks.length;

  const remoteAudioTracks = useTracks([Track.Source.Microphone]).filter(
    (t) => t.participant.identity !== localParticipant.identity
  );

  const authToken = useAuthToken();

  const onLeaveStage = async () => {
    await fetch("/api/remove_from_stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ identity: localParticipant.identity }),
    });
  };

  return (
    <Box position="relative" height="100%" width="100%" bgcolor="black">
      <Box
        display="grid"
        gridTemplateColumns={
          totalVideoTracks === 1
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))"
        }
        gap={2}
        height="100%"
        width="100%"
        position="absolute"
      >
        {canHost && (
          <Box position="relative">
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Avatar sx={{ width: 96, height: 96 }}>
                {localParticipant.identity[0] ?? "?"}
              </Avatar>
            </Box>

            <video
              ref={localVideoEl}
              className="absolute w-full h-full object-contain -scale-x-100"
            />

            <Chip
              variant="outlined"
              size="small"
              label={`${localParticipant.identity} (you)`}
              sx={{ position: "absolute", bottom: 8, right: 8 }}
            />
          </Box>
        )}

        {remoteVideoTracks.map((t) => (
          <Box key={t.participant.identity} position="relative" bgcolor="black">
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Avatar sx={{ width: 96, height: 96 }}>
                {t.participant.identity[0] ?? "?"}
              </Avatar>
            </Box>

            <VideoTrack
              trackRef={t}
              className="absolute w-full h-full bg-transparent object-contain"
            />

            <Chip
              variant="outlined"
              size="small"
              label={t.participant.identity}
              sx={{ position: "absolute", bottom: 8, right: 8 }}
            />
          </Box>
        ))}
      </Box>

      {remoteAudioTracks.map((t) => (
        <AudioTrack key={t.participant.identity} trackRef={t} />
      ))}

      <ConfettiCanvas />

      <StartAudio
        label="Click to allow audio playback"
        className="absolute top-0 h-full w-full bg-gray-2-translucent text-white"
      />

      <Box position="absolute" top={0} width="100%" p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box display="flex" gap={2} alignItems="center">
            <Button
              size="small"
              variant="contained"
              disabled={!roomName}
              onClick={() =>
                copy(`${process.env.NEXT_PUBLIC_SITE_URL}/watch/${roomName}`)
              }
              startIcon={<ContentCopy />}
            >
              {roomState === ConnectionState.Connected
                ? roomName
                : "Loading..."}
            </Button>

            {roomName && canHost && (
              <Box display="flex" gap={2}>
                <MediaDeviceSettings />
                {roomMetadata?.creator_identity !==
                  localParticipant.identity && (
                    <Button size="small" onClick={onLeaveStage}>
                      Leave stage
                    </Button>
                  )}
              </Box>
            )}
          </Box>

          <Box display="flex" gap={2} alignItems="center">
            {roomState === ConnectionState.Connected && (
              <Box display="flex" gap={1} alignItems="center">
                <Box
                  width={8}
                  height={8}
                  borderRadius="50%"
                  bgcolor="error.main"
                  className="animate-pulse"
                />
                <Typography variant="caption" textTransform="uppercase">
                  Live
                </Typography>
              </Box>
            )}

            <PresenceDialog isHost={isHost} open={isPresenceOpen} onOpenChange={setIsPresenceOpen}>
              <Box position="relative">
                {showNotification && (
                  <Box
                    position="absolute"
                    top={-4}
                    right={-4}
                    width={12}
                    height={12}
                    borderRadius="50%"
                    bgcolor="primary.main"
                    zIndex={1}
                    sx={{
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      '@keyframes pulse': {
                        '0%, 100%': {
                          opacity: 1,
                        },
                        '50%': {
                          opacity: .5,
                        },
                      },
                    }}
                  />
                )}

                <Button
                  size="small"
                  variant="contained"
                  disabled={roomState !== ConnectionState.Connected}
                  onClick={() => setIsPresenceOpen(true)}
                  startIcon={
                    roomState === ConnectionState.Connected ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )
                  }
                >
                  {roomState === ConnectionState.Connected
                    ? participants.length
                    : ""}
                </Button>
              </Box>
            </PresenceDialog>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
