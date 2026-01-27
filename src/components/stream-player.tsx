"use client";

import { ParticipantMetadata, RoomMetadata } from "@/lib/controller";
import {
  AudioTrack,
  StartAudio,
  VideoTrack,
  useDataChannel,
  useLocalParticipant,
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
  Track,
} from "livekit-client";
import { useEffect, useState, useRef } from "react";
import { MediaDeviceSettings } from "./media-device-settings";
import { PresenceDialog } from "./presence-dialog";
import { useAuthToken } from "./token-context";
import { useCopyToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

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
  const [, copy] = useCopyToClipboard();
  const [isPresenceOpen, setIsPresenceOpen] = useState(false);

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

  const tracks = useTracks([Track.Source.Camera]);

  const totalVideoTracks = tracks.length;

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
    <Box position="relative" height="100%" width="100%" bgcolor="transparent" className="overflow-hidden group">
      <Box
        display="grid"
        gridTemplateColumns={
          totalVideoTracks === 1
            ? "1fr"
            : "repeat(auto-fit, minmax(400px, 1fr))"
        }
        gap={0}
        height="100%"
        width="100%"
        position="absolute"
        className="p-0"
      >
        {tracks.map((t) => (
          <Box key={t.participant.identity} position="relative" className="overflow-hidden bg-transparent transition-all duration-500">
            <Box
              position="absolute"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              className="z-0 bg-gradient-to-b from-slate-900 to-black"
            >
              <Avatar
                className="w-24 h-24 bg-gradient-to-br from-secondary-main/20 to-primary-main/20 border-2 border-white/5 text-white/40 text-4xl font-black mb-4"
                sx={{ width: 96, height: 96, bgcolor: 'transparent' }}
              >
                {t.participant.identity[0]?.toUpperCase() ?? "?"}
              </Avatar>
              <Typography variant="caption" className="text-white/30 font-bold uppercase tracking-widest mt-2">
                {t.participant.identity === localParticipant.identity ? "Off Air" : "Connecting..."}
              </Typography>
            </Box>

            <VideoTrack
              trackRef={t}
              className={cn(
                "absolute w-full h-full bg-transparent object-cover z-10",
                t.participant.identity === localParticipant.identity && "-scale-x-100"
              )}
            />

            <Box className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
              {t.participant.identity === localParticipant.identity && (
                <Chip
                  label="YOU"
                  size="small"
                  className="bg-primary-main/90 text-white font-black text-[10px] tracking-tighter"
                />
              )}
              <Typography variant="caption" className="text-white font-bold drop-shadow-md">
                {t.participant.identity}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>


      {remoteAudioTracks.map((t) => (
        <AudioTrack key={t.participant.identity} trackRef={t} />
      ))}

      <ConfettiCanvas />

      <StartAudio
        label="Tap to unlock audio"
        className="absolute inset-0 bg-black/90 backdrop-blur-3xl text-white font-black text-3xl tracking-tighter uppercase cursor-pointer flex items-center justify-center transition-all hover:bg-black/80 z-[100] border-4 border-white/5"
      />

      <Box position="absolute" top={0} width="100%" className="p-6 z-50 transition-opacity duration-300 group-hover:opacity-100 opacity-0 lg:opacity-100">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2} alignItems="center">
            <Button
              size="large"
              variant="contained"
              disabled={!roomName}
              onClick={() =>
                copy(`${process.env.NEXT_PUBLIC_SITE_URL}/watch/${roomName}`)
              }
              startIcon={<ContentCopy />}
              className="bg-white/15 border border-white/20 backdrop-blur-xl hover:bg-white/25 text-white font-bold rounded-2xl px-5 py-2.5 normal-case tracking-tight shadow-2xl transition-all active:scale-95"
            >
              {roomState === ConnectionState.Connected
                ? roomName
                : "Connecting..."}
            </Button>

            {roomName && canHost && (
              <Box display="flex" gap={2} className="p-1.5">
                <MediaDeviceSettings />
                {roomMetadata?.creator_identity !==
                  localParticipant.identity && (
                    <Button
                      size="small"
                      onClick={onLeaveStage}
                      className="text-red-400 hover:bg-red-500/10 font-bold px-4 rounded-xl"
                    >
                      Leave Stage
                    </Button>
                  )}
              </Box>
            )}
          </Box>

          <Box display="flex" gap={2} alignItems="center">
            {roomState === ConnectionState.Connected && (
              <Box bgcolor={'#8B2635'} className="flex items-center gap-2.5 px-4 py-2 rounded-full">
                <Box
                  width={8}
                  height={8}
                  borderRadius="50%"
                  bgcolor="white"
                  className="animate-pulse shadow-[0_0_12px_rgba(255,255,255,1)]"
                />
                <Typography variant="caption" color="white" className="font-black tracking-[0.2em] uppercase text-[11px] leading-none">
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
                    width={14}
                    height={14}
                    borderRadius="50%"
                    bgcolor="primary.main"
                    zIndex={1}
                    className="border-2 border-black"
                    sx={{
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      '@keyframes pulse': {
                        '0%, 100%': {
                          opacity: 1,
                          transform: 'scale(1)',
                        },
                        '50%': {
                          opacity: .5,
                          transform: 'scale(1.2)',
                        },
                      },
                    }}
                  />
                )}

                <Button
                  size="large"
                  variant="contained"
                  disabled={roomState !== ConnectionState.Connected}
                  onClick={() => setIsPresenceOpen(true)}
                  className="bg-white/15 border border-white/20 backdrop-blur-xl hover:bg-white/25 text-white font-bold rounded-2xl min-w-0 p-3 shadow-2xl transition-all active:scale-95"
                >
                  {roomState === ConnectionState.Connected ? (
                    <Box className="flex items-center gap-2">
                      <Visibility />
                      <span className="text-sm">{participants.length}</span>
                    </Box>
                  ) : (
                    <VisibilityOff />
                  )}
                </Button>
              </Box>
            </PresenceDialog>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
